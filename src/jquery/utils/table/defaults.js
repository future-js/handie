import {
  isString, isArray, isFunction, isPlainObject, isRestful,
  last, hasOwnProp } from '../common/helper';
import { getDefaults } from '../storage/helper';
import { post as ajaxPost, delete as ajaxDelete } from '../http';
import { fill } from '../form';
import { alert as alertMessage } from '../misc';
import { refreshTable } from '../table/helper';

/**
 * 获取与指定数据列表绑定的对话框
 *
 * @param {*} $table 数据列表
 */
function resolveBoundDialog( $table ) {
  let $m = $($table.data('bootstrap.table').options.__$dialog);

  if ( $m.length === 0 && $table.is(getDefaults('table.selector')) ) {
    $m = $(getDefaults('dialog.selector'));
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

export default {
  selector: '.js-showDataTable',
  showRowNumber: false,
  classes: 'table table-condensed table-hover',
  slim: false,
  rowActions: [],
  keys: {
    sort: 'sortBy',
    order: 'orderBy'
  },
  toolbarActions: {
    basic: {
      fixedWidth: false,
      isCoexisted: true
    },
    create: {
      text: '新增',
      tooltip: '添加新的条目',
      icon: 'plus'
    },
    batch: {
      text: '批量操作',
      tooltip: '对选中条目进行批量操作',
      action: 'batchTable'
    },
    search: {
      label: false,
      width: 'auto',
      filter: {
        selector: '.js-filterTableData',
        mode: 'dropdown',
        button: {
          text: '筛选',
          tooltip: '查看更多筛选条件',
          action: 'showMoreFilters',
          icon: 'filter',
          fixedWidth: true,
          isCoexisted: false
        },
        dialog: {
          title: '筛选数据',
          size: 'lg'
        }
      }
    }
  },
  operationColumn: {
    sticky: false,
    field: 'operation',
    text: '操作',
    events: {
      'click .js-edit': function( evt, val, row, idx ) {
        const $btn = $(this);
        const $m = resolveBoundDialog($btn.closest('table'));
  
        if ( $btn.is('a[href]') || $m.length !== 1 ) {
          evt.stopPropagation();
  
          return;
        }
  
        fill($('form', $m), row);
  
        $m.modal('show');
  
        evt.stopPropagation();
      },
      "click .js-delete": function( evt, val, row, idx ) {
        const $btn = $(this);
        const $t = $btn.closest('table');
  
        let ajaxOpts = last($t.data('bootstrap.table').columns).__muuAjaxOpts || {};
  
        if ( hasOwnProp('delete', ajaxOpts) ) {
          ajaxOpts = ajaxOpts.delete;
        }
  
        if ( !hasOwnProp('url', ajaxOpts) ) {
          evt.stopPropagation();
  
          return;
        }
  
        const callback = () => refreshTable($t);
  
        const req = getDefaults('ajax.RESTful') === true ? ajaxDelete : ajaxPost;
        const args = [row, idx];

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
  
        if ( isString(url) && confirm(`确定要${$btn.attr('title') || $btn.attr('data-original-title') || '进行此操作'}？`) ) {
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
  responseHandler( res ) {
    const resolved = resolveListResponse(res);
  
    if ( isRestful(res) ) {
      if ( isString(res) ) {
        alertMessage(res);
      }
    }
    else if ( !res.success ) {
      alertMessage(res.message);
    }
  
    return this.sidePagination === 'server' ? resolved : resolved.rows;
  }
}
