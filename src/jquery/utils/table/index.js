import { setDefaults, getDefaults } from '../storage/helper';

import TABLE_DEFAULTS from './defaults';

setDefaults('table', TABLE_DEFAULTS);

import './toolbar';
import './header';

import {
  isBoolean, isString, isFunction, isArray, isPlainObject, isNumeric,
  arrayify, each, map, filter, hasOwnProp, mixin, clone,
  generateRandomId, initBootstrapTooltip } from '../common/helper';
import { action as generateAction } from '../generator';
import { resolveTriggerOptionsSimply, resolveTriggerOptions } from '../generator/helper';
import { get as ajaxGet } from '../http';
import { fill as refillFields } from '../field';
import { search as urlSearch } from '../url';
import { jsonifyQueryString } from '../url/helper';
import { getDefaultTable, refreshTable, isOperationColumnSticky, toggleTableStickyStatus } from './helper';


/**
 * 构造操作列
 *
 * {
 *   width: "auto",
 *   actions: [],
 *   ajax: {}
 * }
 *
 * @param {*} opts
 */
function constructOperationColumn( col, opts ) {
  const actions = opts.actions;
  const events = {};

  let formatter;

  if ( opts.width ) {
    col.width = opts.width;
  }

  if ( isFunction(opts.formatter) ) {
    formatter = opts.formatter;
  }
  else if ( isFunction(actions) ) {
    formatter = function( val, row, idx ) {
      return generateAction(actions.apply(this, [row, idx]));
    }
  }
  else if ( isArray(actions) && actions.length > 0 ) {
    const btns = [];

    each(actions, btn => {
      btn = resolveTriggerOptionsSimply(btn);

      if ( isPlainObject(btn) ) {
        btn = resolveTriggerOptions(btn);

        if ( isString(btn.action) && isFunction(btn.handler) ) {
          const handler = btn.handler;

          events[`click .js-${btn.action}`] = function( evt, val, row, idx ) {
            const returnValue = handler.apply(this, [evt, row, idx]);

            evt.stopPropagation();

            return returnValue;
          }

          delete btn.handler;
        }

        btns.push(btn);
      }
    });

    formatter = function( val, row, idx ) {
      const ctx = this;

      return generateAction(map(btns, btn => {
        btn = clone(btn);

        if ( isFunction(btn.text) ) {
          btn.text = btn.text.apply(ctx, [row, idx]);
        }

        return btn;
      }));
    }
  }

  col.__muuAjaxOpts = opts.ajax;
  col.formatter = formatter;
  col.events = mixin(true, {}, opts.events, events);

  return col;
}

/**
 * 获取处理后的列配置项
 *
 * @param {*} tableOpts 表格配置项
 */
function resolveOperationColumn( tableOpts ) {
  const cols = tableOpts.columns;
  const opts = tableOpts.operation;
  const defaultOpts = clone(getDefaults('table.operationColumn'));
  const newCols = [];

  let hasCheckboxOpt = false;
  let col;

  if ( isArray(cols) ) {
    each(cols, function( c ) {
      if ( hasOwnProp('checkbox', c) ) {
        hasCheckboxOpt = true;
      }

      if ( c.field === defaultOpts.field ) {
        tableOpts.__operationDefinedByColumns = true;
        
        col = c;
      }
      else {
        newCols.push(c);
      }
    });
  }

  // 没明确指定需要带有复选框且有批量操作配置项时添加复选框列
  if ( !hasCheckboxOpt && isPlainObject(tableOpts.toolbar) && hasOwnProp('batch', tableOpts.toolbar) ) {
    newCols.unshift({checkbox: true});
  }

  if ( col ) {
    if ( !col.title ) {
      col.title = defaultOpts.text;
    }
  }
  else if ( isPlainObject(opts) ) {
    col = constructOperationColumn({title: defaultOpts.text, field: defaultOpts.field}, opts);
  }

  return newCols.concat(col ? mixin(true, {events: defaultOpts.events}, col) : []);
}

function resolveTableClass( slim ) {
  let classes = getDefaults('table.classes');

  if ( slim === true ) {
    classes = classes.split(' ').concat('Table--slim').join(' ');
  }

  return classes;
}

/**
 * 处理数据表格列配置项中的自定义属性
 *
 * {
 *   viewDetail: {
 *     url: '',
 *     params: function( val, row ) {},
 *     handler: function( val, row, result, $modal ) {}
 *   }
 * }
 *
 * {
 *   dateTimeFormatter: '' / true / function( val ) {}
 * }
 */
function resolveColumnOptions( cols, showRowNumber ) {
  let temp = isArray(cols) ? cols.concat([]) : [];

  if ( !isBoolean(showRowNumber) ) {
    showRowNumber = getDefaults('table.showRowNumber');
  }

  if ( showRowNumber === true ) {
    temp.unshift({
      field: 'serialNumber',
      title: '序号',
      align: 'center',
      formatter: ( val, row, idx ) => ++idx
    });
  }

  return map(temp, col => {
    const { viewDetail: viewDetailOpts, formatter: rawFormatter } = col;

    let dateTimeFormatter = col.dateTimeFormatter;

    // 打开查看详情对话框
    if ( isPlainObject(viewDetailOpts) ) {
      col.formatter = function( val ) {
        if ( isFunction(rawFormatter) ) {
          val = rawFormatter.apply(this, arrayify(arguments));
        }

        return `<a href="javascript:void(0);" class="js-openDetailDialog">${val || '-'}</a>`;
      };

      col.events = mixin({}, col.events, {
        'click .js-openDetailDialog': ( evt, val, row ) => {
          ajaxGet(viewDetailOpts.url, viewDetailOpts.params(val, row), result => {
            const $m = $('.js-viewDetail');

            if ( isFunction(viewDetailOpts.handler) ) {
              viewDetailOpts.handler.apply(null, [val, row, result, $m]);
            }
            else {
              refillFields($m, result);
            }

            $m.modal('show');
          });

          evt.stopPropagation();
        }
      });
    }
    // 日期时间格式转换
    else if ( dateTimeFormatter ) {
      col.formatter = function( val ) {
        if ( dateTimeFormatter === true ) {
          dateTimeFormatter = 'YYYY-MM-DD HH:mm:ss';
        }

        return isString(dateTimeFormatter) && moment ? moment(val).format(dateTimeFormatter) :
          isFunction(dateTimeFormatter) ? dateTimeFormatter.call(this, val) : val;
      };
    }

    return col;
  });
}

/**
 * 获取处理后的表格配置项
 *
 * @param {*} opts 未处理的配置项
 */
function resolveTableOptions( opts ) {
  let { url, ajaxOptions } = opts;

  ajaxOptions = mixin(true, {}, $.fn.bootstrapTable.defaults.ajaxOptions, ajaxOptions);
  opts.columns = resolveColumnOptions(resolveOperationColumn(opts), opts.showRowNumber);

  if ( !url ) {
    url = ajaxOptions.url;

    delete ajaxOptions.url;
  }

  if ( isFunction(url) ) {
    let beforeSend = ajaxOptions.beforeSend;
    let urlMaker = url;

    // 仅起到占位符作用
    // 实际请求的 URL 是下面 `ajaxOptions.beforeSend` 里拼装的
    url = 'AJAX_URL_PLACEHOLDER';

    ajaxOptions.beforeSend = ( jqXHR, ajaxSettings ) => {
      ajaxSettings.url = urlMaker(jsonifyQueryString(ajaxSettings.data || urlSearch(ajaxSettings.url)));

      if ( isFunction(beforeSend) ) {
        return beforeSend.apply(null, [jqXHR, ajaxSettings]);
      }
    };
  }

  opts.slim = hasOwnProp('slim', opts) ? opts.slim === true : getDefaults('table.slim');
  opts.classes = resolveTableClass(opts.slim);

  if ( isPlainObject( opts.operation ) && !hasOwnProp('sticky', opts.operation) ) {
    opts.operation.sticky = opts.slim ? true : getDefaults('table.operationColumn.sticky');
  }

  // 「瘦身」的数据表格
  if ( opts.slim ) {
    // 没指定 `sticky` 配置项则默认开启
    if ( !hasOwnProp('sticky', opts) ) {
      opts.sticky = true;
    }

    // 支持列宽度控制
    opts.columns = map(opts.columns, col => {
      if ( hasOwnProp('width', col) ) {
        const { width: colWidth, formatter: rawFormatter } = col;

        col.formatter = function( val ) {
          let width = 'auto';
          let content = val;

          if ( isNumeric(colWidth) ) {
            width = `${colWidth}px`;
          }
          else if ( isString(colWidth) && /^\d+(\.\d+)?(px|em|rem|%)$/.test(colWidth) ) {
            width = colWidth;
          }

          if ( isFunction(rawFormatter) ) {
            content = rawFormatter.apply(this, arrayify(arguments));
          }

          if ( content == null ) {
            content = hasOwnProp('undefinedText', opts) ? opts.undefinedText : $.fn.bootstrapTable.defaults.undefinedText;
          }

          return `<div style="width: ${width}; white-space: normal; word-break: break-all;">${content}</div>`;
        }
      }

      return col;
    });
  }
  else if ( opts.operation ) {
    opts.operation.sticky = false;
  }

  return mixin(true, opts, {url, ajaxOptions});
}

/**
 * 重设数据列表容器大小
 * 
 * @param {*} evt 事件对象实例
 */
function resizeTableContainer( evt ) {
  const { stickyOpts, tableInst } = evt.data;
  const headerHeight = $('.Page-header').outerHeight();

  toggleTableStickyStatus(
    tableInst,
    evt.data.$container.offset().top - headerHeight <= stickyOpts.top,
    document.documentElement.clientHeight - headerHeight - stickyOpts.top - tableInst.$toolbar.outerHeight() - tableInst.$pagination.outerHeight()
  );
}

function scrollFakeTableHeader( evt ) {
  const { tableInst } = evt.data;
  const $tableBody = $(this);
  const scrollLeft = $tableBody.scrollLeft();
  const selector = '.Table-container--alternative';

  $('> table', tableInst.$tableHeader).css('margin-left', `-${scrollLeft}px`);

  if ( isOperationColumnSticky(tableInst.options) && tableInst.$tableContainer.hasClass('is-sticky') ) {
    $(selector, tableInst.$tableBody).css('margin-right', tableInst.$tableContainer.hasClass('is-sticky') ? `-${scrollLeft}px` : 0);
  }

  const $alternatives = $(selector, tableInst.$tableContainer);
  
  if ( $tableBody.width() + scrollLeft === tableInst.$el.width() ) {
    $alternatives.hide();
  }
  else {
    $alternatives.show();
  }
}

/**
 * 初始化固定的数据列表
 * 
 * @param {*} $table 数据列表
 * @param {*} stickyOpts 配置项
 */
function initStickyTable( $table, stickyOpts ) {
  const tableInst = $table.data('bootstrap.table');
  const $container = tableInst.$container;

  if ( $container.closest('.modal').length > 0 ) {
    return;
  }

  const tableId = $container.attr('id');

  $(window).on(`resize.${tableId}`, {$container, tableInst, stickyOpts}, resizeTableContainer);
  $('.Page-content').on(`scroll.${tableId}`, {$container, tableInst, stickyOpts}, resizeTableContainer);
}

function constructStickyColumn( evt ) {
  const $table = $(this);

  const tableInst = $table.data('bootstrap.table');

  if ( !tableInst ) {
    return;
  }

  const columnField = getDefaults('table.operationColumn.field');

  const $tableHeader = tableInst.$tableHeader;
  const $tableBody = tableInst.$tableBody;
  const $column = $(`[data-field='${columnField}']`, $table);

  const columnIndex = $('thead th', $table).index($column);
  const cls = 'Table-container--alternative'

  if ( tableInst.options.sticky && $(`.${cls}`, $tableHeader).length === 0 ) {
    $tableHeader
      .append(`<div class="${cls}"><table><thead><tr></tr></thead></table></div>`)
      .find(`.${cls} tr`)
      .append($(`[data-field='${columnField}']`, $tableHeader).clone());
  }

  if ( $(`.${cls}`, $tableBody).length === 0 ) {
    const classes = filter(tableInst.options.classes.split(' '), ( c ) => {
      return c !== 'table-hover';
    });

    $tableBody.append(`<div class="${cls}"><table class="${classes.join(" ")}"><thead><tr></tr></thead><tbody></tbody></table></div>`);
  }

  const $tableAlternative = $(`.${cls} table`, $tableBody);
  const $tbodyRowsCopy = tableInst.$body.children().clone(true, true);

  $tbodyRowsCopy.each(function( idx ) {
    const $row = $(this);
    const $cell = $(`tr:eq(${idx}) td:eq(${columnIndex})`, tableInst.$body);
    const $cellCopy = $(`td:eq(${columnIndex})`, $row);

    $cellCopy.width($cell.outerWidth());
    $cellCopy.height($cell.outerHeight());

    $(`td:lt(${columnIndex})`, $row).remove();
  });

  $('thead tr', $tableAlternative).empty().append($column.clone(true, true));
  $('tbody', $tableAlternative).empty().append($tbodyRowsCopy);

  $tableAlternative.data('bootstrap.table', tableInst);
}

/**
 * 初始化数据表格
 *
 * opts 的结构为：
 * {
 *   url: '',
 *   columns: [],
 *   operation: {},
 *   lazy: false,
 *   ajaxOptions: {},
 *   showRowNumber: false,
 *   toolbar: {
 *     create: {},  // 新增数据
 *     search: {},  // 筛选条件
 *     batch: {}    // 批量处理
 *   }
 *   ... // 更多参照 http://bootstrap-table.wenzhixin.net.cn/documentation/#table-options
 * }
 */
export function init( $table, opts ) {
  if ( isPlainObject($table) ) {
    opts = $table;
    $table = null;
  }

  if ( !$table ) {
    $table = getDefaultTable();
  }

  opts = resolveTableOptions(opts);

  if ( isOperationColumnSticky(opts) ) {
    $table.on('post-body.bs.table', constructStickyColumn);
  }

  $table.on({
    'post-body.bs.table': () => initBootstrapTooltip($('[title]', $table)),
    'reset-view.bs.table \
      refresh-options.bs.table \
      refresh.bs.table': () => $('[title]', $table).tooltip('destroy')
  });

  const { lazy, url, sticky } = opts;

  if ( lazy === true ) {
    delete opts.lazy;
    delete opts.url;
  }

  $table.bootstrapTable(opts);

  const tableId = generateRandomId('table');
  const tableInst = $table.data('bootstrap.table');

  tableInst.$container.attr('id', tableId);

  if ( lazy === true ) {
    tableInst.options.url = url;
  }

  if ( opts.slim ) {
    tableInst.$tableBody.on(`scroll.${tableId}`, {tableInst}, scrollFakeTableHeader);
  }

  if ( sticky ) {
    const defaultStickyOpts = { top: 15 };

    let stickyOpts;

    if ( sticky === true ) {
      stickyOpts = defaultStickyOpts;
    }
    else if ( isPlainObject(sticky) ) {
      stickyOpts = mixin(true, defaultStickyOpts, sticky);
    }

    if ( isPlainObject(stickyOpts) ) {
      initStickyTable($table, stickyOpts);
    }
  }
}

export {
  resolveColumnOptions as columns,
  refreshTable as refresh
}
