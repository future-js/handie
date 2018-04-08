import { isString, isFunction, isArray, isPlainObject, inArray, arrayEach, arrayMap, hasOwnProp, mixin, clone, generateRandomId, initBootstrapTooltip } from "../common/helper";
import { resolveTriggerOptionsSimply, resolveTriggerOptions, constructActionButton } from "../generator/helper";
import { init as initDialog } from "../dialog"
import { resolveCreateOptions, refreshTable } from "./helper";
import { defaults } from "../common/settings";

/**
 * 重写 Bootstrap Table 的初始化工具栏实现
 */
$.fn.bootstrapTable.Constructor.prototype.initToolbar = function() {
  const tableInst = this;
  const tableOpts = tableInst.options;

  tableOpts.__$search = $(".Area--query form");

  let toolbarOpts = tableOpts.toolbar;

  if ( toolbarOpts === true ) {
    toolbarOpts = {};
  }

  if ( !isPlainObject(toolbarOpts) && !tableOpts.showColumns ) {
    return;
  }

  mixin(true, tableOpts, {
    __tableInst: tableInst,
    __toolbar: toolbarOpts,
    __$toolbar: $(`<div id="${generateRandomId("toolbar")}" class="Table-toolbar u-clearfix" />`)
  });

  const $table = tableInst.$el;
  const $toolbar = tableInst.$toolbar;

  tableOpts.toolbar = null;

  $toolbar.prepend(tableOpts.__$toolbar);

  initToolbarLeftGroup(toolbarOpts, tableOpts, $table, $toolbar);
  initToolbarRightGroup(toolbarOpts, tableOpts, $table, $toolbar);

  initBootstrapTooltip($("[title]", tableOpts.__$toolbar));
}

function resolveToolbarActionDefaults( opts ) {
  return mixin({}, defaults.table.toolbarActions.basic, opts);
}

/**
 * 构造「新增」按钮
 *
 * @param {*} createOpts 新增数据配置项
 * @param {*} tableOpts 表格配置项
 */
function constructCreateButton( createOpts, tableOpts ) {
  const hasDlgOpts = hasOwnProp("dialog", createOpts);

  if ( createOpts === true ) {
    createOpts = {};
  }

  // 当新增数据配置项为空对象或有 `button` 与 `dialog` 其中任意一个属性时构造「新增」按钮
  if ( !(isPlainObject(createOpts) && ($.isEmptyObject(createOpts) || hasOwnProp("button", createOpts) || hasDlgOpts)) ) {
    return "";
  }

  const btnOpts = mixin(true, {}, resolveToolbarActionDefaults(defaults.table.toolbarActions.create), createOpts.button, {
      size: tableOpts.iconSize,
      isPrimary: true
    });

  let classes = ["Table-action--create"];

  // 添加自定义的 class
  if ( isString(btnOpts.classes) && btnOpts.classes !== "" ) {
    classes = classes.concat(btnOpts.classes.split(" "));
  }

  btnOpts.classes = classes;

  const attrs = [];

  if ( !isString(btnOpts.url) ) {
    let dlgOpts = hasDlgOpts ? createOpts.dialog : {};

    if ( isPlainObject(dlgOpts) ) {
      let dlgSelector = dlgOpts.selector;

      if ( isString(dlgSelector) ) {
        delete dlgOpts.selector;
      }
      else {
        dlgSelector = defaults.dialog.selector;
      }

      tableOpts.__$dialog = $(dlgSelector);

      attrs.push("data-toggle=\"modal\"", `data-target="${dlgSelector}"`);
    }
  }

  return constructActionButton(mixin(btnOpts, {attributes: attrs}));
}

/**
 * 获取指定数据列表所有被选中行的数据
 *
 * @param {*} $table 数据列表
 */
function getSelectedRowData( $table ) {
  return $table.bootstrapTable("getAllSelections");
}

/**
 * 判断指定数据列表的数据是否为空
 *
 * @param {*} $table 数据列表
 */
function isEmptyRowData( $table ) {
  return getSelectedRowData($table).length === 0;
}

/**
 * 绑定批量操作事件
 *
 * @param {*} action 操作配置项
 * @param {*} $table 表格
 * @param {*} $toolbar 工具栏容器
 */
function bindBatchHandle( action, $table, $toolbar ) {
  $toolbar.on("click", `.js-${action.action}`, function( evt ) {
    return action.handler.apply(this, [evt, getSelectedRowData($table), $table]);
  });
}

/**
 * 工具栏中操作按钮的事件处理
 *
 * @param {*} actions 操作配置项列表
 * @param {*} bindHandler 绑定事件的处理函数
 * @param {*} $table 表格
 * @param {*} $toolbar 工具栏容器
 */
function initToolbarActionHandlers( actions, bindHandler, $table, $toolbar ) {
  arrayEach([].concat(actions), function( a ) {
    if ( isArray(a) ) {
      initToolbarActionHandlers(a, bindHandler, $table, $toolbar);
    }
    else if ( isString(a.action) && isFunction(a.handler) ) {
      bindHandler(a, $table, $toolbar);
    }
  });
}

/**
 * 构造「批量操作」按钮
 *
 * @param {*} batchOpts 批量操作配置项
 * @param {*} tableOpts 表格配置项
 * @param {*} $table 数据列表
 * @param {*} $toolbar 工具栏容器
 */
function constructBatchButton( batchOpts, tableOpts, $table, $toolbar ) {
  let actions = [];
  let isPrimary = false;
  let isSplit = false;

  if ( isArray(batchOpts) ) {
    actions = batchOpts;
  }
  else if ( isPlainObject(batchOpts) && isArray(batchOpts.actions) ) {
    actions = batchOpts.actions;
    isPrimary = batchOpts.isPrimary === true;

    if ( isFunction(batchOpts.handler) ) {
      isSplit = true;

      bindBatchHandle({action: defaults.table.toolbarActions.batch.action, handler: batchOpts.handler}, $table, $toolbar);
    }
    else {
      isSplit = batchOpts.isSplit === true;
    }
  }

  if ( actions.length === 0 ) {
    return "";
  }

  const btnOpts = mixin(true, {}, resolveToolbarActionDefaults(defaults.table.toolbarActions.batch), {
      buttonClass: "Table-action--batch",
      size: tableOpts.iconSize,
      disabled: true,
      isSplit
    });

  if ( actions.length === 1 && !isArray(actions[0]) ) {
    mixin(true, btnOpts, resolveTriggerOptions(resolveTriggerOptionsSimply(actions[0])));
  }
  else {
    mixin(btnOpts, {actions, isPrimary});
  }

  initToolbarActionHandlers(actions, bindBatchHandle, $table, $toolbar);

  return constructActionButton(btnOpts);
}

function constructOtherButtons( actions, tableOpts, $table, $toolbar ) {
  const btnOpts = resolveToolbarActionDefaults({size: tableOpts.iconSize});

  if ( isPlainObject(actions) ) {
    actions = [mixin({}, btnOpts, actions)];
  }
  else if ( !isArray(actions) ) {
    return "";
  }

  const bindHandler = function( action, $table, $toolbar ) {
      $toolbar.on("click", `.js-${action.action}`, function( evt ) {
        return action.handler.apply(this, [evt, $table, $toolbar]);
      });
    }
  const html = [];

  arrayEach(actions, function( a ) {
    a = resolveTriggerOptionsSimply(a);

    html.push(constructActionButton(mixin({}, btnOpts, a)));

    initToolbarActionHandlers(a, bindHandler, $table, $toolbar);

    if ( isArray(a.actions) ) {
      initToolbarActionHandlers(a.actions, bindHandler, $table, $toolbar);
    }
  });

  return html.join("");
}

/**
 * 构造数据列表的工具栏左侧操作组
 *
 * @param {*} toolbarOpts 工具栏配置项
 * @param {*} tableOpts 表格配置项
 * @param {*} $table 数据列表
 * @param {*} $toolbar 工具栏容器
 */
function constructToolbarLeftGroup( toolbarOpts, tableOpts, $table, $toolbar ) {
  return [
      constructCreateButton(resolveCreateOptions(toolbarOpts), tableOpts),
      constructOtherButtons(clone(toolbarOpts.actions), tableOpts, $table, $toolbar),
      constructBatchButton(clone(toolbarOpts.batch), tableOpts, $table, $toolbar)
    ].join("");
}

/**
 * 初始化工具栏左侧操作组
 *
 * @param {*} toolbarOpts 工具栏配置项
 * @param {*} tableOpts 表格配置项
 * @param {*} $table 数据列表
 * @param {*} $toolbar 工具栏容器
 */
function initToolbarLeftGroup( toolbarOpts, tableOpts, $table, $toolbar ) {
  if ( !isPlainObject(toolbarOpts) ) {
    return;
  }

  const $group = $("<div class=\"OperationGroup u-floatLeft u-hidden\" />");

  $group.append(constructToolbarLeftGroup(toolbarOpts, tableOpts, $table, $toolbar));

  if ( $group.children().length > 0 ) {
    $group.removeClass("u-hidden");
  }

  tableOpts.__$toolbar.prepend($group);

  let $batch = $(".Table-action--batch", $group);

  if ( $batch.is(`.js-${defaults.table.toolbarActions.batch.action}`) ) {
    $batch = $batch.add($batch.siblings("button"));
  }

  // 批量操作按钮可用状态控制
  $table.on({
    "check.bs.table \
     uncheck.bs.table \
     check-some.bs.table \
     uncheck-some.bs.table \
     check-all.bs.table \
     uncheck-all.bs.table": function() {
      $batch.prop("disabled", isEmptyRowData($table));
    },
    "post-body.bs.table": function( evt, data ) {
      $batch.prop("disabled", (data.length === 0 || isEmptyRowData($table)));
    },
    "refresh.bs.table": function() {
      if ( tableOpts.url || (tableOpts.ajaxOptions && tableOpts.ajaxOptions.url) ) {
        $batch.prop("disabled", true);
      }
    },
    "page-change.bs.table": function() {
      $batch.prop("disabled", tableOpts.sidePagination === "server" ? true : isEmptyRowData($table));
    }
  });

  // 初始化绑定的表单对话框
  if ( tableOpts.__$dialog ) {
    initDialog(tableOpts.__$dialog, mixin({$table}, resolveCreateOptions(toolbarOpts).dialog));
  }

  tableOpts.__$left = $group;
  tableOpts.__$batch = $batch;
}

/**
 * 初始化工具栏右侧操作组
 *
 * @param {*} toolbarOpts 工具栏配置项
 * @param {*} tableOpts 表格配置项
 * @param {*} $table 数据列表
 * @param {*} $toolbar 工具栏容器
 */
function initToolbarRightGroup( toolbarOpts, tableOpts, $table, $toolbar ) {
  const $group = $("<div class=\"OperationGroup u-floatRight u-hidden\" />");

  tableOpts.__$toolbar.append($group);

  tableOpts.__$right = $group;

  if ( isPlainObject(toolbarOpts) ) {
    // 筛选条件
    initTableSearch(toolbarOpts.search, tableOpts, $table, $toolbar);
  }

  if ( tableOpts.showColumns === true ) {
    initTableColumnToggle(tableOpts, $table, $toolbar);
  }

  if ( $group.children().length > 0 ) {
    $group.removeClass("u-hidden");
  }
}

/**
 * 构造数据列表的筛选框
 *
 * @param {*} filterOpts 筛选配置项
 * @param {*} tableOpts 表格配置项
 */
function constructTableFilter( filterOpts, tableOpts ) {
  if ( !isPlainObject(filterOpts) ) {
    filterOpts = {selector: filterOpts};
  }

  filterOpts = mixin(true, {}, defaults.table.toolbarActions.search.filter, filterOpts);

  const $filter = $(filterOpts.selector);

  if ( $filter.length !== 1 || !inArray(filterOpts.mode, ["dropdown", "dialog"]) ) {
    return "";
  }

  const filterId = generateRandomId("filter");
  const attrs = [];

  let $container;

  // 对话框模式
  if ( filterOpts.mode === "dialog" ) {
    $container = $(`<div id="${filterId}" class="Table-filter--dialog modal fade">
        <div class="modal-dialog modal-${filterOpts.dialog.size}">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
              <h4 class="modal-title">${filterOpts.dialog.title}</h4>
            </div>
            <div class="modal-body"></div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
              <button type="button" class="btn btn-default js-resetTableFilters">重置</button>
              <button type="button" class="btn btn-primary js-executeTableFilters">筛选</button>
            </div>
          </div>
        </div>
      </div>`);

    $(".modal-body", $container).append($filter);

    $("body").append($container);
    
    attrs.push("data-toggle=\"modal\"", `data-target="#${filterId}"`);
  }
  // 下拉模式
  else {
    $container = $(`<div id="${filterId}" class="Table-filter--dropdown Card u-clearfix u-hidden">
        <div class="Card-content"></div>
        <div class="Card-footer"><button type="button" class="btn btn-primary btn-sm js-executeTableFilters"><i class="fa fa-filter"></i><span>筛选</span></button><button type="reset" class="btn btn-default btn-sm js-resetTableFilters"><i class="fa fa-refresh"></i><span>重置</span></button></div>
      </div>`);

    $(".Card-content", $container).append($filter);
  }

  $("select", $filter).each(function() {
    $(this).data("select2").$container.css("width", "100%");
  });

  $container.addClass("Table-filter js-showTableFilters");
  $filter.removeClass("u-hidden");

  tableOpts.__$filter = $container;

  return constructActionButton(mixin(resolveToolbarActionDefaults(filterOpts.button), {size: tableOpts.iconSize, attributes: attrs}));
}

/**
 * 构造数据列表的查询框
 *
 * @param {*} searchOpts 查询配置项
 * @param {*} tableOpts 表格配置项
 */
function constructTableSearch( searchOpts, tableOpts ) {
  let fields = clone(searchOpts.field);

  if ( isPlainObject(fields) ) {
    fields = [fields];
  }

  if ( !isArray(fields) ) {
    return;
  }

  const selectableFields = [];
  const hiddenFields = [];

  arrayEach(fields, function( field ) {
    // `isHidden` 为兼容属性，后期考虑删除
    if ( field.required === true || field.isHidden === true ) {
      hiddenFields.push(field);
    }
    else {
      selectableFields.push(field);
    }
  });

  if ( selectableFields.length === 0 ) {
    return;
  }

  const defaultField = selectableFields[0];
  const searchId = generateRandomId("search");
  const html = [
      "<div class=\"Table-search u-floatLeft\">",
      `<form class="input-group input-group-${tableOpts.iconSize}">`
    ];

  searchOpts.__selectable = selectableFields;

  if ( selectableFields.length > 1 ) {
    html.push(
      "<div class=\"input-group-btn\">",
      `<button class="btn btn-default dropdown-toggle" data-toggle="dropdown" type="button"><span>${defaultField.text}</span><span class="caret"></span></button>`,
      "<ul class=\"Operation-menu dropdown-menu\">",
      arrayMap(selectableFields, function( field ) {
        return `<li><a href="javascript:void(0);" data-field="${field.name}" data-placeholder="${field.placeholder}">${field.text}</a></li>`;
      }).join(""),
      "</ul></div>"
    );
  }
  else if ( searchOpts.label === true ) {
    html.push(`<label class="input-group-addon" for="${searchId}">${defaultField.text}</label>`)
  }

  html.push(
    `<input id="${searchId}" class="form-control" type="text" name="${defaultField.name}" value="" placeholder="${defaultField.placeholder || ""}">`,
    arrayMap(hiddenFields, function( field ) {
      return `<input type="hidden" name="${field.name}" value="${hasOwnProp("value", field) ? field.value : ""}">`;
    }).join(""),
    "<div class=\"input-group-btn\">",
    "<button class=\"btn btn-default js-executeTableSearch\" type=\"submit\" title=\"查询\"><i class=\"fa fa-search fa-fw\"></i><span class=\"sr-only\">查询</span></button>",
    constructTableFilter(clone(searchOpts.filter), tableOpts),
    "</div>",
    "</form></div>"
  );

  return html.join("");
}

/**
 * 计算简单查询区域宽度
 * 
 * @param {*} searchOpts 查询配置项
 * @param {*} $search 简单查询区域
 */
function calculateTableSearchWidth( searchOpts, $search ) {
  let width = parseFloat(searchOpts.width, 10);

  if ( $.isNumeric(width) ) {
    return width;
  }

  const defaultSearchWidth = defaults.table.toolbarActions.search.width;

  if ( defaultSearchWidth !== "auto" ) {
    width = parseFloat(defaultSearchWidth, 10);

    if ( $.isNumeric(width) ) {
      return width;
    }
  }

  const $ipt = $("[id^='search']", $search);
  const $dropdown = $(".dropdown-menu", $search);

  const field = clone(searchOpts.__selectable).sort(( a, b ) => a.text.length + a.placeholder.length < b.text.length + b.placeholder.length).shift();
  const fontSize = parseFloat($ipt.css("font-size"), 10);

  width = parseFloat($ipt.css("border-left-width"), 10) + parseFloat($ipt.css("padding-left"), 10) + parseFloat($ipt.css("padding-right"), 10) + parseFloat($ipt.css("border-right-width"), 10) + field.placeholder.length * fontSize + $(".js-executeTableSearch", $search).parent().width();

  if ( $dropdown.length ) {
    return width + $dropdown.parent().width() - ($("span", $dropdown.siblings(".dropdown-toggle")).text().length - field.text.length) * fontSize;
  }

  return width + $("label", $search).outerWidth() || 0;
}

/**
 * 初始化数据列表查询框
 *
 * @param {*} searchOpts 查询配置项
 * @param {*} tableOpts 表格配置项
 * @param {*} $table 数据列表
 * @param {*} $toolbar 工具栏容器
 */
function initTableSearch( searchOpts, tableOpts, $table, $toolbar ) {
  if ( !isPlainObject(searchOpts) || $(".Table-search", $toolbar).length > 0 ) {
    return;
  }

  const $search = $(constructTableSearch(searchOpts, tableOpts));
  const $searchInput = $("[id^='search']", $search);
  const $filter = tableOpts.__$filter;

  tableOpts.__$search = $("form", $search);

  tableOpts.__$right.append($search);

  // 查询/筛选表单提交事件
  $("form", $search.add($filter)).on("submit", function() {
    refreshTable($table, true);

    return false;
  });

  // 选择首选查询条件
  $(".dropdown-menu a", $search).on("click", function() {
    const $a = $(this);
    const $btn = $(".dropdown-toggle", $search);

    $("span:first", $btn).text($a.text());

    $searchInput
      .attr({
        name: $a.attr("data-field"),
        placeholder: $a.attr("data-placeholder")
      })
      .val("");
  });

  if ( $filter ) {
    const $filterForm = $("form", $filter);
    const $searchForm = $("form", $search);

    // 下拉筛选条件
    if ( $filter.hasClass("Table-filter--dropdown") ) {
      $toolbar.append($filter);

      $(".js-showMoreFilters", $toolbar).on("click", function() {
        const $btn = $(this);
        const droppedCls = "is-dropped";
        const hiddenCls = "u-hidden";
        const $controls = $(".js-executeTableSearch, [id^='search']", $toolbar).add($(".dropdown-toggle", $searchForm));

        if ( $btn.hasClass(droppedCls) ) {
          $filter.addClass(hiddenCls);
          $btn.removeClass(droppedCls);

          $controls.prop("disabled", false);
          $filterForm.trigger("reset");

          tableOpts.__$search = $searchForm;
        }
        else {
          $filter.removeClass(hiddenCls);
          $btn.addClass(droppedCls);

          $controls.prop("disabled", true);
          $searchForm.trigger("reset");

          tableOpts.__$search = $filterForm;
        }

        return false;
      });

      $(".js-executeTableFilters", $filter).on("click", function() {
        $filterForm.trigger("submit");
      });
    }
    else if ( $filter.hasClass("Table-filter--dialog") ) {
      $(".js-executeTableFilters", $filter).on("click", function() {
        tableOpts.__$search = $filterForm;

        $searchForm.trigger("reset");
        $filterForm.trigger("submit");

        tableOpts.__$search = $searchForm;

        $filter.modal("hide");
      });
    }

    // 重置复杂条件查询
    $(".js-resetTableFilters", $filter).on("click", function() {
      $filterForm.trigger("reset");
    });
  }

  $search.ready(() => $search.width(calculateTableSearchWidth(searchOpts, $search)));
}

function constructColumnToggleButton( tableOpts ) {
  const html = ["<div class=\"Table-columnToggle u-floatLeft keep-open\">"];
  const actions = [];

  arrayEach(tableOpts.__tableInst.columns, function( col, idx ) {
    if ( !col.radio && !col.checkbox &&
        !(tableOpts.cardView && !col.cardVisible) &&
        col.switchable && col.field !== defaults.table.operationColumn.field ) {
      const attrs = [
        "type=\"checkbox\"",
        `data-field="${col.field}"`,
        `value="${idx}"`
      ];

      if ( col.visible ) {
        attrs.push("checked");
      }

      actions.push(`<label><input ${attrs.join(" ")}> ${col.title}</label>`);
    }
  });

  html.push(constructActionButton(resolveToolbarActionDefaults({
    text: "切换列状态",
    size: tableOpts.iconSize,
    icon: tableOpts.icons.columns.replace(/^fa\-/, ""),
    isCoexisted: false,
    align: "right",
    actions
  })));

  html.push("</div>");

  return html.join("");
}

function initTableColumnToggle( tableOpts, $table, $toolbar ) {
  const tableInst = tableOpts.__tableInst;
  const $toggle = $(constructColumnToggleButton(tableOpts));

  tableOpts.__$right.append($toggle);

  const $items = $(".Operation-menu li", $toggle);
  const $checkboxes = $(":checkbox", $toggle);

  if ( $items.length <= tableOpts.minimumCountColumns ) {
    $checkboxes.prop("disabled", true);
  }

  $items.on("click", function( evt ) {
    evt.stopPropagation();
  });

  $checkboxes.on("change", function() {
    const $ipt = $(this);
    const checked = $ipt.prop("checked");

    tableInst.toggleColumn($ipt.val(), checked, false);
    tableInst.trigger("column-switch", $ipt.attr("data-field"), checked);
  });
}
