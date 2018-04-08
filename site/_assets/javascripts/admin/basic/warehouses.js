(function() {
  function resolveActionText( category, action, field, resolver ) {
    return function( row ) {
      return action + category + "「" + ($.isFunction(resolver) ? resolver(row[field]) : row[field]) + "」";
    }
  }
  
  function initDataTable() {
    muu.table.init({
      pageSize: 10,
      toolbar: {
        create: true,
        search: {
          field: {
            text: "名称",
            name: "name",
            placeholder: "请输入仓库名称"
          }
        },
        batch: [{
          action: "delete",
          isDelete: true,
          text: "批量删除",
          handler: function( ) {
            alert($(this).text());
          }
        }]
      },
      sidePagination: "client",
      url: function( data ) {
        return "https://api.github.com/users/" + (data.name || "maihaoche") + "/repos";
      },
      lazy: true,
      columns: [{
        title: "名称",
        field: "name",
        width: 200,
        formatter: function( val, row ) {
          return "<a href=\"" + row.html_url + "\" target=\"_blank\">" + val + "</a>";
        }
      }, {
        title: "语言",
        field: "language",
        width: 120
      }, {
        title: "简介",
        field: "description"
      }],
      operation: {
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
        }]
      }
    });
  }

  function initNewDataDialog() {
    var $m = $(".js-addNewData");
    var $f = $("form", $m);

    $f.on("H5F:submit", function( evt, inst, submitEvt ) {
      submitEvt.preventDefault();

      return false;
    });

    $m.on("hidden.bs.modal", function() {
      $f.trigger("reset");
    });
  }

  $(document).ready(function() {
    initDataTable();
    initNewDataDialog();
  });
})();
