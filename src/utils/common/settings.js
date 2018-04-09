import { isString, isFunction, isArray, isPlainObject, isRestful, arrayLast, hasOwnProp } from "./helper";
import { post as ajaxPost, delete as ajaxDelete } from "../ajax";
import { fill } from "../form";
import { alert as alertMessage } from "../misc";
import { DEFAULT_TABLE_SELECTOR } from "../table/constants";
import { resolveCreateOptions, getDefaultTable, refreshTable } from "../table/helper";

/**
 * 获取与指定数据列表绑定的对话框
 *
 * @param {*} $table 数据列表
 */
function resolveBoundDialog( $table ) {
  const tableOpts = $table.data("bootstrap.table").options;
  const createOpts = resolveCreateOptions(tableOpts.__toolbar || {});

  let $m = $(tableOpts.__$dialog);

  if ( $m.length === 0 && $table.is(getDefaultTable()) ) {
    $m = $(defaults.dialog.selector);
  }

  return $m;
}

function resolveListResponse( res ) {
  let rows = [];
  let total = 0;

  if ( isArray(res) ) {
    rows = res;
    total = res.length;
  }
  else if ( isPlainObject(res) ) {
    // {result: [], totalCount: 0}
    if ( isArray(res.result) ) {
      rows = res.result;
      total = res.totalCount;
    }
    // {data: [], totalCount: 0}
    else if ( isArray(res.data) ) {
      rows = res.data;
      total = res.totalCount
    }
    // {data: {result: [], totalCount: 0}}
    else if ( isPlainObject(res.data) && isArray(res.data.result) ) {
      rows = res.data.result;
      total = res.data.totalCount;
    }
  }

  return {rows, total};
}

export const defaults = {
  ajax: {
    RESTful: true,
    waitingText: "数据保存中，请耐心等待...",
    serverErrorText: "服务器开小差啦～",
    /**
     * 请求发生错误时的处理
     */
    errorHandler: function( evt, req, settings, err ) {
      const code = req.status;
  
      if ( code >= 500 ) {
        alertMessage(defaults.ajax.serverErrorText);
      }
      else if ( code >= 400 ) {
        const resJson = req.responseJSON;
  
        let resText;
  
        // 支持 {"message": ""} 形式的错误信息
        if ( isPlainObject(resJson) && hasOwnProp("message", resJson) ) {
          resText = resJson.message;
        }
        else {
          resText = req.responseText;
        }
  
        alertMessage(resText);
      }
    },
    /**
     * 对请求返回数据的处理
     */
    responseHandler: function( res, callback, settings ) {
      const hasCallback = isFunction(callback);
      const alertOpts = {type: settings.alertType, formatter: settings.alertFormatter};
  
      // RESTful 请求的情况
      if ( isRestful(res) ) {
        if ( isString(res) && res !== "" ) {
          alertMessage(res, alertOpts);
        }
        else {
          if ( hasCallback ) {
            callback.call(null, res);
          }
        }
      }
      // 返回结构为 {success: true, message: ""} 的情况
      else {
        if ( res.success ) {
          if ( hasCallback ) {
            callback.call(null, res.data);
          }
        }
        else {
          alertMessage(res.message, alertOpts);
        }
      }
    }
  },
  table: {
    selector: DEFAULT_TABLE_SELECTOR,
    showRowNumber: false,
    classes: "table table-condensed table-hover",
    slim: false,
    rowActions: [],
    keys: {
      sort: "sortBy",
      order: "orderBy"
    },
    toolbarActions: {
      basic: {
        fixedWidth: false,
        isCoexisted: true
      },
      create: {
        text: "新增",
        tooltip: "添加新的条目",
        icon: "plus"
      },
      batch: {
        text: "批量操作",
        tooltip: "对选中条目进行批量操作",
        action: "batchTable"
      },
      search: {
        label: false,
        width: "auto",
        filter: {
          selector: ".js-filterTableData",
          mode: "dropdown",
          button: {
            text: "筛选",
            tooltip: "查看更多筛选条件",
            action: "showMoreFilters",
            icon: "filter",
            fixedWidth: true,
            isCoexisted: false
          },
          dialog: {
            title: "筛选数据",
            size: "lg"
          }
        }
      }
    },
    operationColumn: {
      sticky: false,
      field: "operation",
      text: "操作",
      events: {
        "click .js-edit": function( evt, val, row, idx ) {
          const $btn = $(this);
          const $m = resolveBoundDialog($btn.closest("table"));
    
          if ( $btn.is("a[href]") || $m.length !== 1 ) {
            evt.stopPropagation();
    
            return;
          }
    
          fill($("form", $m), row);
    
          $m.modal("show");
    
          evt.stopPropagation();
        },
        "click .js-delete": function( evt, val, row, idx ) {
          const $btn = $(this);
          const $t = $btn.closest("table");
    
          let ajaxOpts = arrayLast($t.data("bootstrap.table").columns).__handieAjaxOpts || {};
    
          if ( hasOwnProp("delete", ajaxOpts) ) {
            ajaxOpts = ajaxOpts.delete;
          }
    
          if ( !hasOwnProp("url", ajaxOpts) ) {
            evt.stopPropagation();
    
            return;
          }
    
          const callback = function() {
            refreshTable($t);
          }
    
          let req = defaults.ajax.RESTful === true ? ajaxDelete : ajaxPost;
          let args = [row, idx];
          let { url, params, extra } = ajaxOpts;
    
          if ( isFunction(url) ) {
            url = url.apply(this, args);
          }
    
          if ( isFunction(params) ) {
            params = params.apply(this, args);
          }
    
          if ( isFunction(extra) ) {
            extra = extra.apply(this, args);
          }
    
          if ( isString(url) && confirm(`确定要${$btn.attr("title")}？`) ) {
            if ( params ) {
              req(url, params, callback, extra);
            }
            else {
              req(url, callback, extra);
            }
          }
    
          evt.stopPropagation();
        }
      }
    },
    responseHandler: ( res ) => {
      const resolved = resolveListResponse(res);
    
      if ( isRestful(res) ) {
        if ( isString(res) ) {
          alertMessage(res);
        }
      }
      else if ( !res.success ) {
        alertMessage(res.message);
      }
    
      return this.sidePagination === "server" ? resolved : resolved.rows;
    }
  },
  form: {
    filter: function( data, $field, arr ) {
      return true;
    },
    serializer: function( arr ) {
      return arr;
    }
  },
  dialog: {
    backdrop: true,     // 可选值请看 https://getbootstrap.com/docs/3.3/javascript/#modals-options
    closeOnEsc: true,
    selector: ".js-addNewData",
    button: ".js-saveNewData"
  },
  notification: {
    layer: {
      align: "center",
      alignClasses: {
        left: "u-textLeft",
        center: "u-textCenter",
        right: "u-textRight"
      },
      size: "normal",
      icons: {
        info: "fa-info-circle",
        success: "fa-check-circle",
        warning: "fa-warning",
        danger: "fa-warning"
      }
    }
  },
  generator: {
    imageColumnCount: 3,
    actions: {}
  },
  uploader: {
    selector: ".js-uploadImage",
    limit: 0,
    draggable: true,
    extension: {
      image: "jpeg,jpg,png,gif"
    }
  },
  watermark: {
    preventTamper: false,
    text: "卖好车，车好卖！",
    font: "300 16px Sans-serif",
    rotate: 345 * Math.PI / 180,
    translateX: -10,
    translateY: 50,
    width: 200,
    height: 100,
    shadow: {
      offsetX: 2,
      offsetY: 2,
      blur: 2
    },
    style: {
      width: "100%",
      height: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      "z-index": 1000,
      "pointer-events": "none"
    },
    container: function() {
      return $(".js-watermark:not(.modal .js-watermark)").get(0);
    },
    mainOnly: false,
    autoInit: true
  }
};
