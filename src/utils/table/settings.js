import { isString, isArray, isFunction, isPlainObject, isRestful, hasOwnProp, arrayLast } from "../common/helper";
import { alert as alertMessage } from "../misc";
import { post as ajaxPost, delete as ajaxDelete } from "../ajax";
import { fill } from "../form";
import { DEFAULT_TABLE_SELECTOR } from "./constants";
import { resolveCreateOptions, getDefaultTable, refreshTable } from "./helper";

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

export const selector = DEFAULT_TABLE_SELECTOR;

export const showRowNumber = false;

export const classes = "table table-condensed table-hover";

export const slim = false;

export const rowActions = [];

export const keys = {
  sort: "sortBy",
  order: "orderBy"
};

export const toolbarActions = {
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
};

export const operationColumn = {
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

      let ajaxOpts = arrayLast($t.data("bootstrap.table").columns).__muuAjaxOpts || {};

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
};

export function responseHandler( res ) {
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
