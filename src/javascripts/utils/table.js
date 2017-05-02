defaults.table = {
  selector: "",
  showRowNumber: false,
  rowActions: [],
  responseHandler: function() {}
};

function getDataTable() {
  return $(defaults.table.selector);
}

try {
  defaults.table.responseHandler = $.fn.bootstrapTable.defaults.responseHandler;
}
catch() {}

utils.table = {
  init: function( opts ) {
    opts.columns = utils.table.columns(opts.columns, opts.showRowNumber);

    getDataTable().bootstrapTable(opts);
  },
  columns: function( cols, showRowNumber ) {
    let temp = cols.concat([]);

    if ( $.type(showRowNumber) !== "boolean" ) {
      showRowNumber = defaults.table.showRowNumber;
    }

    if ( showRowNumber === true ) {
      temp.unshift({
        field: "serialNumber",
        title: "序号",
        align: "center",
        formatter: function( val, row, idx ) {
          return ++idx;
        }
      });
    }

    return temp.map(function( col ) {
      let viewDetailOpts = col.viewDetail;
      let dateTimeFormatter = col.dateTimeFormatter;

      if ( $.isPlainObject(viewDetailOpts) ) {
        col.formatter = function( val ) {
          return `<a href="javascript:void(0);" class="js-openDetailDialog">${val || "-"}</a>`;
        };

        col.events = $.extend({}, col.events, {
          "click .js-openDetailDialog": function( e, val, row ) {
            $.getJSON(viewDetailOpts.url, viewDetailOpts.params(val, row), function( res ) {
              utils.ajax.result(res, function( result ) {
                let $m = $(".js-viewDetail");

                if ( $.isFunction(viewDetailOpts.handler) ) {
                  viewDetailOpts.handler.apply(null, [val, row, result, $m]);
                }
                else {
                  utils.field.fill($m, result);
                }

                $m.modal("show");
              });
            });
          }
        });
      }
      else if ( dateTimeFormatter ) {
        col.formatter = function( val ) {
          if ( dateTimeFormatter === true ) {
            dateTimeFormatter = "YYYY-MM-DD HH:mm:ss";
          }

          return $.type(dateTimeFormatter) === "string" && moment ? moment(val).format(dateTimeFormatter) :
            $.isFunction(dateTimeFormatter) ? dateTimeFormatter.call(this, val) : val;
        };
      }

      col.titleTooltip = col.title;

      return col;
    });
  },
  /**
   * @param     $table
   * @param     resetTop    是否重置到首页
   */
  refresh: function( $table = getDataTable(), resetTop ) {
    if ( typeof $table === "boolean" ) {
      resetTop = $table;
      $table = getDataTable();
    }

    if ( resetTop === true ) {
      $table.data("bootstrap.table").options.pageNumber = 1;
    }

    $table.bootstrapTable("refresh");
  }
};
