import {
  each,
  keys,
  mixin,
  supportBootstrapModal,
  supportBootstrapTable,
  supportBootstrapDateTime,
  supportSelect2,
  supportH5fx,
  supportMomentJs
} from '../common/helper';
import { getDefaults } from '../storage/helper';

import { jsonify } from "../form";
import { levelUp, levelDown } from "../dialog";
import { setImageItemUrl } from "../uploader/helper";
import { moveImageItemsForward } from "../generator/helper";
import { initNotificationCounter } from "../notification/helper";

/**
 * 初始化第三方插件的默认参数
 */
function initDefaults() {
  each([
    {
      dependency: supportBootstrapModal,
      initializer: () => {
        // Bootstrap 对话框
        mixin($.fn.modal.Constructor.DEFAULTS, {
          backdrop: getDefaults('dialog.backdrop'),
          keyboard: getDefaults('dialog.closeOnEsc')
        });
      }
    },
    {
      dependency: supportBootstrapTable,
      initializer: () => {
        // Bootstrap 数据表格表配置
        mixin($.fn.bootstrapTable.defaults, {
          classes: getDefaults('table.classes'),
          iconsPrefix: "fa",
          icons: {
            refresh: "fa-refresh",
            toggle: "fa-list-alt",
            columns: "fa-th",
            detailOpen: "fa-plus",
            detailClose: "fa-minus"
          },
          iconSize: "sm",
          sidePagination: "server",
          pagination: true,
          pageSize: 20,
          // showPaginationSwitch: false,
          pageList: [],
          cache: false,
          queryParams: function( params ) {
            return jsonify(this.__$search
              .serializeArray()
              .concat({
                name: 'pageSize',
                value: this.pageSize
              }, {
                name: 'pageNo',
                value: this.pageNumber
              }, params.sort == null ? [] : [{
                name: getDefaults('table.keys.sort'),
                value: params.sort
              }, {
                name: getDefaults('table.keys.order'),
                value: params.order
              }]), jsonified => {
                each(keys(jsonified), k => jsonified[k] = jsonified[k].toString());

                return jsonified;
              });
          },
          responseHandler: function( res ) {
            return getDefaults('table.responseHandler').call(this, res);
          },
          onPostBody: ( data ) => {
            $(".detail-icon").closest("td").addClass("u-alignMiddle u-textCenter");
          }
        });

        // Bootstrap 数据表格列配置
        mixin($.fn.bootstrapTable.columnDefaults, {valign: "middle"});
      }
    },
    {
      dependency: supportBootstrapDateTime,
      initializer: () => {
        mixin(true, $.fn.datetimepicker.defaults, {
          locale: "zh-CN",
          icons: {
            time: "fa fa-clock-o",
            date: "fa fa-calendar",
            up: "fa fa-chevron-up",
            down: "fa fa-chevron-down",
            previous: "fa fa-chevron-left",
            next: "fa fa-chevron-right",
            today: "fa fa-crosshairs",
            clear: "fa fa-trash",
            close: "fa fa-remove"
          },
          showTodayButton: true
        });
      }
    },
    {
      dependency: supportSelect2,
      initializer: () => {
        // Select2 下拉列表
        each({
          containerCssClass: "handie-Select2-container",
          dropdownCssClass: "handie-Select2-dropdown",
          minimumResultsForSearch: "Infinity"
        }, ( v, k ) => {
          $.fn.select2.defaults.set(k, v);
        });
      }
    },
    {
      dependency: supportH5fx,
      initializer: () => {
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
          INVALID_VALUE: "{{LABEL}}不符合要求的格式",
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
      dependency: supportMomentJs,
      initializer: () => {
        // moment 日期时间格式转换
        moment.locale("zh-CN");
      }
    }
  ], function( lib ) {
    if ( lib.dependency() ) {
      lib.initializer();
    }
  });
}

function initDialogs() {
  if ( !supportBootstrapModal() ) {
    return;
  }

  $(document).on("shown.bs.modal", ".modal", function() {
    const $m = $(this);
    const $dlg = $(".modal-dialog", $m);
    const $cnt = $(".modal-content", $m);

    levelUp($m);

    if ( $dlg.height() > $m.height() ) {
      $m.addClass("is-scrollable");
      $cnt.css("height", $m.height() - parseFloat($dlg.css("margin-top"), 10) - parseFloat($dlg.css("margin-bottom"), 10) - parseFloat($cnt.css("border-top-width"), 10) - parseFloat($cnt.css("border-bottom-width"), 10));
    }
  });

  $(document).on("hidden.bs.modal", ".modal", function() {
    let $m = $(this);

    levelDown($m);

    if ( $m.hasClass("is-scrollable") ) {
      $m.removeClass("is-scrollable");
      $(".modal-content", $m).css("height", "auto");
    }
  });
}

function initSelects() {
  if ( !supportSelect2() ) {
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

$(document).ready(function() {
  initDefaults();
  initDialogs();
  initSelects();
  initNotificationCounter();

  // 阻止滑动引起的数字增减
  $("input[type='number']").on("mousewheel", function( e ) {
    e.preventDefault();
  });

  $("body").on("click", ".js-removeUploadedImage", function() {
    const $btn = $(this);
    const $item = $btn.closest(".ImageItem");

    $("[data-file-ext]", $item).removeAttr("data-file-ext");
    $item.removeClass("is-nongraphic");

    if ( $item.siblings("button.ImageItem--add").length ) {
      $item
        .addClass("is-empty")
        .removeAttr("data-file-id");

      setImageItemUrl($item, "");
    }
    else {
      moveImageItemsForward($item);
    }
  });
});
