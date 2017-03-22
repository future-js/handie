/**
 * 初始化第三方插件的默认参数
 */
function initDefaults() {
  [
    {
      dependency: SUPPORTS.BS_MODAL,
      initializer: function() {
        // Bootstrap 对话框
        $.extend($.fn.modal.Constructor.DEFAULTS, {
          backdrop: "static",
          keyboard: false
        });
      }
    },
    {
      dependency: SUPPORTS.BS_TABLE,
      initializer: function() {
        // Bootstrap 数据表格表配置
        $.extend($.fn.bootstrapTable.defaults, {
          classes: "table table-condensed table-hover",
          iconsPrefix: "fa",
          sidePagination: "server",
          pagination: true,
          pageSize: 20,
          // showPaginationSwitch: false,
          pageList: [],
          queryParams: function( params ) {
            params = {};

            $(".Area--query form")
              .serializeArray()
              .concat({
                name: "pageSize",
                value: this.pageSize
              }, {
                name: "pageNo",
                value: this.pageNumber
              })
              .forEach(function( p ) {
                params[p.name] = p.value;
              });

            return params;
          },
          responseHandler: function( res ) {
            if ( !res.success ) {
              alert(res.message);
            }

            return res.success && res.data ? {
              total: res.data.totalCount || 0,
              rows: (Array.isArray(res.data) ? res.data : res.data.result) || []
            } : {
              total: 0,
              rows: []
            };
          }
        });

        // Bootstrap 数据表格列配置
        $.extend($.fn.bootstrapTable.columnDefaults, {valign: "middle"});
      }
    },
    {
      dependency: SUPPORTS.SELECT2,
      initializer: function() {
        // Select2 下拉列表
        $.each({
          containerCssClass: "handie-Select2-container",
          dropdownCssClass: "handie-Select2-dropdown",
          minimumResultsForSearch: "Infinity"
        }, function( k, v ) {
          $.fn.select2.defaults.set(k, v);
        });
      }
    },
    {
      dependency: SUPPORTS.H5FX,
      initializer: function() {
        // 添加校验规则
        H5F.rules({
          MOBILE: {
            rule: /^(0|86|17951)?(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "NOT_A_MOBILE"
          }
        });

        // 定制错误提示
        H5F.errors({
          UNKNOWN_INPUT_TYPE: "{{LABEL}}为未知输入框类型",
          COULD_NOT_BE_EMPTY: "{{LABEL}}不能为空",
          LENGTH_SMALLER_THAN_MINIMUM: "{{LABEL}}应为{{MINLENGTH}}～{{MAXLENGTH}}个字符",
          LENGTH_BIGGER_THAN_MAXIMUM: "{{LABEL}}应为{{MINLENGTH}}～{{MAXLENGTH}}个字符",
          INVALID_VALUE: "无效字符",
          NOT_AN_ABSOLUTE_URL: "{{LABEL}}不是一个 URL 地址",
          NOT_AN_EMAIL: "{{LABEL}}不是一个邮箱",
          NOT_A_NUMBER: "{{LABEL}}不是一个数字",
          UNDERFLOW: "{{LABEL}}不能小于{{MIN}}",
          OVERFLOW: "{{LABEL}}不能大于{{MAX}}",
          DIFFERENT_VALUE: "{{LABEL}}所输入的字符要与{{ASSOCIATE_LABEL}}保持一致",
          AT_LEAST_CHOOSE_ONE: "请从{{LABEL}}中选择一项",
          SHOOLD_BE_CHOSEN: "请选中{{UNIT_LABEL}}",
          SHOOLD_CHOOSE_AN_OPTION: "必须选择{{LABEL}}",
          NOT_A_MOBILE: "{{LABEL}}不符合手机号码格式"
        });
      }
    },
    {
      dependency: SUPPORTS.MOMENTJS,
      initializer: function() {
        // moment 日期时间格式转换
        moment.locale("zh-CN");
      }
    }
  ].forEach(function( lib ) {
    if ( lib.dependency ) {
      lib.initializer();
    }
  });
}

function initDialogs() {
  if ( !SUPPORTS.MODAL ) {
    return;
  }

  $(document).on("shown.bs.modal", ".modal", function() {
    let $m = $(this);
    let $dlg = $(".modal-dialog", $m);
    let $cnt = $(".modal-content", $m);

    utils.dialog.levelUp($m);

    if ( $dlg.height() > $m.height() ) {
      $m.addClass("is-scrollable");
      $cnt.css("height", $m.height() - parseFloat($dlg.css("margin-top"), 10) - parseFloat($dlg.css("margin-bottom"), 10) - parseFloat($cnt.css("border-top-width"), 10) - parseFloat($cnt.css("border-bottom-width"), 10));
    }
  });

  $(document).on("hidden.bs.modal", ".modal", function() {
    let $m = $(this);

    utils.dialog.levelDown($m);

    if ( $m.hasClass("is-scrollable") ) {
      $m.removeClass("is-scrollable");
      $(".modal-content", $m).css("height", "auto");
    }
  });
}

function initSelects() {
  if ( !SUPPORTS.SELECT2 ) {
    return;
  }

  // 美化下拉列表控件
  $("select").select2();

  // 对话框中的 Select2 下拉列表在打开时加上所在对话框的层级
  // 以避免有多级重叠对话框时顶级的对话框中的下拉列表不显示
  $(".modal select").on("select2:open", function() {
    $(this).data("select2").$dropdown.css("z-index", $(this).closest(".modal").css("z-index"));
  });
}

$(document).ajaxError(function( evt, req, settings, err ) {
  let code = req.status;

  if ( code >= 500 ) {
    alert("服务器开小差啦～");
  }
  else if ( code >= 400 ) {
    alert(req.responseText);
  }
});

$(document).ready(function() {
  initDefaults();
  initDialogs();
  initSelects();

  // 阻止滑动引起的数字增减
  $("input[type='number']").on("mousewheel", function( e ) {
    e.preventDefault();
  });
});
