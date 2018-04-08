import { toArray } from "../common/helper";
import { isOperationColumnSticky, toggleTableStickyStatus } from "./helper";
import { defaults } from "../common/settings";

const initBootstrapTableHeader = $.fn.bootstrapTable.Constructor.prototype.initHeader;

/**
 * 重置数据列表表头和操作列的固定状态
 * 
 * @param {*} tableInst 数据列表实例
 */
function resetTableStickyStatus( tableInst ) {
  toggleTableStickyStatus(tableInst, false);

  if ( isOperationColumnSticky(tableInst.options) ) {
    const $tableBody = tableInst.$tableBody;
    const $alternatives = $(".Table-container--alternative", tableInst.$tableContainer);

    if ( $tableBody.width() + $tableBody.scrollLeft() === tableInst.$el.width() ) {
      $alternatives.hide();
    }
    else {
      $alternatives.show();
    }
  }
}

/**
 * 重写 Bootstrap Table 的初始化表头实现
 */
$.fn.bootstrapTable.Constructor.prototype.initHeader = function() {
  const tableInst = this;

  initBootstrapTableHeader.apply(tableInst, toArray(arguments));

  const tableOpts = tableInst.options;
  const $table = tableInst.$el;
  const $tableHeader = tableInst.$tableHeader;
  const $header = $("table", $tableHeader);

  if ( tableOpts.sticky === true ) {
    $header.addClass(tableOpts.classes).append(tableInst.$header.clone(true, true));
    
    $table.on("post-body.bs.table", function() {
      resetTableStickyStatus(tableInst);

      $header.width($table.width());

      $("th", tableInst.$header).each(function() {
        const $el = $(this);
        const $th = $(`[data-field="${$el.attr("data-field")}"]`, $header);

        $th.width($el.width());
        $th.height($el.height());
      });

      $(".Table-container--alternative th", $tableHeader).width($(`[data-field='${defaults.table.operationColumn.field}']`, $tableHeader).width());
    });
  }
}
