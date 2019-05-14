import { isBoolean } from '../common/helper';
import { getDefaults } from '../storage/helper';

/**
 * 获取默认的数据表格
 */
export function getDefaultTable() {
  return $(getDefaults('table.selector'));
}

/**
 * 判断操作列是否可固定
 * 
 * @param {*} tableOpts 表格配置项
 */
export function isOperationColumnSticky( tableOpts ) {
  return tableOpts.__operationDefinedByColumns === true || tableOpts.operation && tableOpts.operation.sticky === true;
}

/**
 * 切换数据列表表头和操作列的固定状态
 * 
 * @param {*} tableInst 数据列表实例
 * @param {*} enabled 是否启用
 * @param {*} tableBodyHeight 数据列表可见区域高度
 */
export function toggleTableStickyStatus( tableInst, enabled, tableBodyHeight ) {
  const { $tableContainer, $tableHeader, $tableBody } = tableInst;
  const isColSticky = isOperationColumnSticky(tableInst.options);

  if ( enabled !== false ) {
    $tableBody.css('height', tableBodyHeight);
    $tableContainer.addClass('is-sticky');
    $tableHeader.show();

    if ( isColSticky ) {
      $tableBody
        .css('position', 'relative')
        .find('.Table-container--alternative')
        .css('margin-right', `-${$tableBody.scrollLeft()}px`);
    }
  }
  else {
    $tableBody.css('height', 'auto');
    $tableContainer.removeClass('is-sticky');
    $('> table', $tableHeader.hide()).css('margin-left', 0);

    if ( isColSticky ) {
      $tableBody
        .css('position', 'static')
        .find('.Table-container--alternative')
        .css('margin-right', 0);
    }
  }
}

/**
 * 刷新数据列表
 * 
 * @param {*} $table 
 * @param {*} resetTop 是否重置到首页
 */
export function refreshTable( $table = getDefaultTable(), resetTop ) {
  if ( isBoolean($table) ) {
    resetTop = $table;
    $table = getDefaultTable();
  }

  let opts;

  if ( resetTop === true ) {
    opts = {pageNumber: 1};
  }

  $table.bootstrapTable('refresh', opts);
}
