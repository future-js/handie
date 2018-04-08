(function() {
  /**
   * 获取数据表格查询参数
   *
   * @param $form
   * @returns {Function}
   */
  function resolveTableQueryParams( $form ) {
    return function() {
      return $.extend(true, {}, {
        systemId: window.SYSTEM_ID,
        pageSize: this.pageSize,
        pageNo: this.pageNumber
      }, ($form && $form.length ? muu.form.jsonify($form) : {}))
    };
  }

  /**
   * 获取处理后的数据列表操作按钮提示文本
   *
   * @param category
   * @param action
   * @param field
   * @param resolver
   * @returns {Function}
   */
  function resolveActionText( category, action, field, resolver ) {
    return function( row ) {
      return action + category + "「" + ($.isFunction(resolver) ? resolver(row[field]) : row[field]) + "」";
    }
  }

  /**
   * 获取处理后的应用数据列表的列文本
   *
   * @param val
   * @returns {string}
   */
  function resolveAppCodeText( val ) {
    return val ? "<code>" + val + "</code>" : "-";
  }

  function initAppDataTable() {
    muu.table.init($(".js-showApps"), {
      toolbar: {
        create: true,
        batch: {
          isPrimary: true,
          actions: [[{
            action: "sendeee",
            text: "发车",
            handler: function( ) {
              alert($(this).text());
            }
          }, {
            action: "sendee11e",
            text: "发车111",
            handler: function( ) {
              alert($(this).text());
            }
          }], [{
            action: "delete",
            isDelete: true,
            text: "批量删除",
            handler: function( ) {
              alert($(this).text());
            }
          }, {
            action: "send",
            text: "发运",
            handler: function( ) {
              alert($(this).text());
            }
          }]]
        },
        search: {
          field: [{
            text: "名称",
            name: "name",
            placeholder: "请输入应用名称"
          }, {
            text: "系统",
            name: "system",
            placeholder: "请输入系统名称"
          }]
        },
        actions: [{
          action: "test",
          text: "测试",
          attributes: {
            a: "b",
            "data-b": "ccc"
          },
          actions: [{
            action: "testssss",
            text: "测试s",
            handler: function( ) {
              alert($(this).text());
            }
          }]
        }, {
          action: "test11",
          text: "测试11",
          icon: "cloud",
          handler: function( ) {
            alert($(this).text());
          }
        }]
      },
      pageSize: 15,
      queryParams: resolveTableQueryParams(),
      columns: [{
        title: "名称",
        field: "name"
      }, {
        title: "域名",
        field: "domain",
        formatter: resolveAppCodeText
      }, {
        title: "所属系统",
        field: "appId",
        formatter: resolveAppCodeText
      }],
      operation: {
        width: 100,
        actions: [{
          action: "edit",
          text: resolveActionText("应用", "编辑", "name")
        }, {
          isDelete: true,
          text: resolveActionText("应用", "删除", "name")
        }, {
          action: "lla",
          text: "goog",
          actions: [{
            action: "ssss",
            text: "asds"
          }, {
            action: "s11sss",
            text: "as22ds"
          }]
        }],
        ajax: {
          delete: {
            url: "/apps.json",
            params: function( row ) {
              return {id: row.appId};
            }
          }
        }
      }
    });
  }

  /**
   * 获取处理后的菜单项名字
   *
   * @param itemName
   * @returns {T}
   */
  function resolveMenuItemName( itemName ) {
    return itemName.split("-").pop();
  }

  function initMenuDataTable() {
    var $t = $(".js-showMenuItems");
    var $m = $(".js-addMenuItem");
    var $f = $(".js-searchMenu");

    muu.table.init($t, {
      pagination: true,
      sidePagination: "client",
      pageSize: 15,
      columns: [{
        title: "菜单",
        field: "name",
        width: 150
      }, {
        title: "链接",
        field: "url",
        formatter: function( val ) {
          return val || "-";
        }
      }, {
        title: "图标",
        field: "icon",
        width: 80,
        formatter: function( val ) {
          return "<div class=\"u-textCenter\">" + (val ? ("<i class=\"fa fa-" + val + "\"></i>") : "-") + "</div>";
        }
      }],
      operation: {
        width: 100,
        actions: [{
          action: "edit",
          text: resolveActionText("菜单项", "编辑", "name", resolveMenuItemName),
          handler: function( evt, row ) {
            row.iconCSS = row.icon;
            row.name = resolveMenuItemName(row.name);

            muu.form.fill($("form", $m), row);

            $m.modal("show");
          }
        }, {
          isDelete: true,
          text: resolveActionText("菜单项", "删除", "name", resolveMenuItemName),
          handler: function( evt, row ) {
            if ( confirm("确定要删除菜单项「" + row.name + "」？") ) {
              muu.ajax.delete("/views.json", {id: row.id}, function() {
                // 没有链接的菜单项可以加子菜单
                // 因此在删除无链接的菜单项时需要刷新父菜单下拉列表
                if ( !row.url ) {
                  // initMenuItemList();
                }

                muu.table.refresh($t);
                muu.table.refresh($(".js-showPermissions"));
              });
            }
          }
        }]
      }
    });
  }

  function initPermissionDataTable() {
    var $t = $(".js-showPermissions");
    var $m = $(".js-addPermission");
    var $f = $(".js-searchPermission");

    muu.table.init($t, {
      pageSize: 15,
      queryParams: resolveTableQueryParams($f),
      columns: [{
        title: "权限名称",
        field: "name"
      }, {
        title: "访问路径",
        field: "url"
      }, {
        title: "请求方法",
        field: "method"
      }, {
        title: "权限代码",
        field: "code"
      }],
      operation: {
        actions: [{
          isDelete: true,
          text: resolveActionText("权限", "删除", "name")
        }],
        ajax: {
          delete: {
            url: "/permissions.json",
            params: function( row ) {
              return {id: row.id};
            }
          }
        }
      }
    });
  }

  $(document).ready(function() {
    initAppDataTable();
    initMenuDataTable();
    initPermissionDataTable();
  });
})();
