import { isString, isArray, isPlainObject, arrayEach, arrayMap, hasOwnProp, objectKeys, mixin, clone } from "../common/helper";
import { defaults } from "../common/settings";

const builtInActions = {
  edit: {
    text: "编辑",
    icon: "edit"
  },
  delete: {
    text: "删除",
    action: "delete",
    icon: "trash"
  },
  disable: {
    text: "禁用",
    icon: "pause"
  },
  enable: {
    text: "启用",
    icon: "play"
  }
};

/**
 * 获取默认的操作按钮参数
 */
function resolveDefaultTriggerOptions() {
  return mixin(true, {}, builtInActions, defaults.generator.actions);
}

/**
 * 获取简易处理的按钮参数
 *
 * @param {*} opts 操作按钮参数
 */
export function resolveTriggerOptionsSimply( opts ) {
  if ( isString(opts) && hasOwnProp(opts, resolveDefaultTriggerOptions()) ) {
    opts = {action: opts};
  }

  return opts;
}

/**
 * 获取处理后的按钮参数
 *
 * @param {*} opts 操作按钮参数
 */
export function resolveTriggerOptions( opts ) {
  const defaultActionOpts = resolveDefaultTriggerOptions();
  
  let action;

  if ( opts.isDelete === true ) {
    action = "delete";
  }
  else {
    action = opts.action;
  }

  if ( hasOwnProp(action, defaultActionOpts) ) {
    const defaultOpts = defaultActionOpts[action];

    arrayEach(objectKeys(defaultOpts), function( k ) {
      if ( !hasOwnProp(k, opts) ) {
        opts[k] = defaultOpts[k];
      }
    });
  }

  return opts;
}

/**
 * 生成操作的主触发器
 */
function generateMainTrigger( opts ) {
  const triggerCls = [].concat(opts.btnCls);
  const attrs = [];

  let tagName;

  if ( isString(opts.action) ) {
    triggerCls.push(`js-${opts.action}`);
  }

  if ( isString(opts.url) ) {
    tagName = "a";

    attrs.push(`href="${opts.url}"`);

    if ( opts.isExternal === true ) {
      attrs.push("target=\"_blank\"");
    }
  }
  else {
    tagName = "button";

    attrs.push(`type="button"`);

    if ( opts.disabled === true ) {
      attrs.push("disabled");
    }
  }

  if ( opts.hasChildren && opts.isSplit !== true ) {
    triggerCls.push("dropdown-toggle");
    attrs.push(`data-toggle="dropdown"`)
  }

  attrs.push(`class="${triggerCls.join(" ")}"`, `title="${opts.tooltip || opts.text}"`);

  const html = [`<${tagName} ${attrs.concat(opts.btnAttrs).join(" ")}>`];

  if ( isString(opts.icon) ) {
    const iconCls = ["Operation-icon", "fa", `fa-${opts.icon}`];

    if ( opts.fixedWidth !== false ) {
      iconCls.push("fa-fw");
    }

    html.push(`<i class="${iconCls.join(" ")}"></i><span class="${opts.isCoexisted === true ? "Operation-label" : "sr-only"}">${opts.text}</span>`);
  }
  else {
    html.push(opts.text);
  }

  if ( opts.hasChildren && opts.isSplit !== true ) {
    html.push(`<span class="caret"></span>`);
  }

  html.push(`</${tagName}>`);

  return html.join("");
}

/**
 * 生成下拉菜单的条目
 */
function generateSubItem( item ) {
  let content;

  if ( isString(item) ) {
    content = item;
  }
  else if ( isPlainObject(item) ) {
    item = resolveTriggerOptions(item);

    if ( hasOwnProp("html", item) ) {
      content = item.html;
    }
    else {
      content = `<a class="js-${item.action}" href="${isString(item.url) ? item.url : "javascript:void(0);"}"${item.isExternal === true ? "target=\"_blank\"" : ""}>${item.text}</a>`;
    }
  }

  return `<li>${content || ""}</li>`;
}

/**
 * 生成按钮操作相关的下拉菜单
 */
function generateDropdownMenu( opts ) {
  let html = [];

  // 子菜单操作与主按钮分离
  if ( opts.isSplit === true ) {
    html.push(
      `<button type="button" class="${opts.btnCls.concat("dropdown-toggle").join(" ")}" data-toggle="dropdown"`,
      opts.disabled === true ? " disabled" : "",
      "><span class=\"caret\"></span></button>"
    );
  }

  html.push(
    "<ul class=\"Operation-menu dropdown-menu",
    opts.align === "right" ? " dropdown-menu-right" : "",
    "\">"
  );

  // `opts.actions` 的结构可以为：
  //        `[action, action, action, action]`
  //    或
  //        `[[action, action], [action, action]]`
  //
  // 后者会在下拉菜单中生成分割线
  //
  // `action` 的结构为 `{action: "", text: "", url: "", isExternal: true}`
  html.push(arrayMap(opts.actions, function( child, idx ) {
    const isGrouped = isArray(child);

    let items = !isGrouped ? generateSubItem(child) : arrayMap(child, groupedChild => generateSubItem(groupedChild)).join("");

    if ( idx > 0 && isGrouped ) {
      items = `<li class="divider"></li>${items}`;
    }

    return items;
  }).join(""));

  html.push("</ul>");

  return html.join("");
}

/**
 * 构建操作按钮
 *
 * @param {*} opts 操作按钮配置项
 * @param {*} settings 额外配置项
 */
export function constructActionButton( opts, settings ) {
  opts = resolveTriggerOptionsSimply(opts);

  if ( !isPlainObject(opts) ) {
    return "";
  }

  mixin(opts, settings);

  const html = [];
  const size = opts.size || "xs";
  const hasChildren = hasOwnProp("actions", opts) && isArray(opts.actions);

  let btnCls = clone(opts.classes);

  if ( isString(btnCls) ) {
    btnCls = btnCls.split(" ");
  }
  else if ( !isArray(btnCls) ) {
    btnCls = [];
  }

  btnCls = [
      "Operation",
      "btn",
      `btn-${opts.isPrimary === true ? "primary" : opts.isDelete === true ? "danger" : "default"}`,
      `btn-${size}`
    ]
    .concat(btnCls);

  let btnAttrs = clone(opts.attributes);

  if ( isPlainObject(btnAttrs) ) {
    let attrs = [];

    arrayEach(btnAttrs, function( k, v ) {
      attrs.push(`${k}=${v}`);
    });

    btnAttrs = attrs;
  }
  else if ( isString(btnAttrs) ) {
    btnAttrs = btnAttrs.split(" ");
  }
  else if ( !isArray(btnAttrs) ) {
    btnAttrs = [];
  }

  html.push(generateMainTrigger(mixin({}, resolveTriggerOptions(opts), {
    btnCls: btnCls.concat(isString(opts.buttonClass) ? opts.buttonClass : []),
    btnAttrs,
    hasChildren
  })));

  if ( hasChildren ) {
    html.unshift(`<div class="btn-group btn-group-${size}">`);
    html.push(generateDropdownMenu(mixin({}, opts, {btnCls})), "</div>");
  }

  return html.join("");
}
