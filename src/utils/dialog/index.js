import { isFunction, isString, isPlainObject, inArray, arrayEach, hasOwnProp, mixin, clone } from "../common/helper";
import { defaults } from "../common/settings";
import { post as ajaxPost, put as ajaxPut } from "../ajax";
import { jsonify, h5f } from "../form";
import { getDefaultTable, refreshTable } from "../table/helper";

const DIALOG_DEFAULT_INDEX = 1050;

let dialogLevel = 0;

/**
 * 获取对话框中的表单
 * 
 * @param {*} $dlg 对话框
 * @param {*} opts 对话框配置项
 */
function resolveDialogForm( $dlg, opts ) {
  let $form = $(opts.$form);

  if ( $form.length === 0 || !$.contains($dlg.get(0), $form.get(0)) ) {
    $form = $("form", $dlg);
  }

  return $form.eq(0);
}

/**
 * 获取处理后的请求方法
 * 
 * @param {*} method 请求方法
 * @param {*} params 请求参数
 * @param {*} ctx 环境上下文
 */
function resolveRequestHandler( method, params, ctx ) {
  let handler = method;
  
  // 应该返回 `"post"`、`"put"` 或 `muu.ajax.post`、`muu.ajax.put`
  if ( isFunction(handler) ) {
    handler = handler.call(ctx, params);
  }

  // 通过 `"post"`、`"put"` 获取对应的处理函数
  if ( isString(handler) && inArray(handler.toLowerCase(), ["post", "put"]) ) {
    handler = handler.toLowerCase() === "post" ? ajaxPost : ajaxPut;
  }

  // 默认的请求方法
  if ( !isFunction(handler) ) {
    handler = ajaxPost;
  }

  return handler;
}

/**
 * 获取表单提交处理函数
 * 
 * @param {*} $dlg 对话框
 * @param {*} opts 对话框配置项
 */
function resolveSubmitHandler( $dlg, opts ) {
  if ( isFunction(opts.onFormSubmit) ) {
    return opts.onFormSubmit;
  }

  let ajaxOpts = clone(opts.ajax) || {};

  if ( isString(ajaxOpts) ) {
    ajaxOpts = {url: ajaxOpts};
  }

  let rawUrl = ajaxOpts.url;

  if ( !inArray($.type(rawUrl), ["string", "function"]) ) {
    return $.noop;
  }

  let { method, params, callback } = ajaxOpts;

  // 删除用于构造处理函数的属性
  // 其余部分作为 `muu.ajax.METHOD()` 的最后一个参数传入
  arrayEach(["url", "method", "params", "callback"], key => {
    delete ajaxOpts[key];
  });
  
  return function( evt, jsonified, inst, submitEvt ) {
    const req = resolveRequestHandler(method, jsonified, this);
    
    let url = rawUrl;

    if ( isFunction(url) ) {
      url = url.call(null, jsonified);
    }
  
    if ( isFunction(params) ) {
      jsonified = params.call(this, jsonified);
    }

    req(url, jsonified, function() {
      if ( isFunction(callback) ) {
        callback.call(null);
      }

      refreshTable(opts.$table);
      $dlg.modal("hide");
    }, mixin({isJson: defaults.ajax.RESTful === true, $waiting: $dlg}, ajaxOpts));
  }
}

/**
 * 初始化对话框
 * 
 * opts 的结构为：
 * {
 *   $button: $(defaults.dialog.button),
 *   $table: null,
 *   $form: null,
 *   ajax: {
 *     url: "",
 *     method: "",
 *     params: $.noop,
 *     callback: $.noop,
 *     isJson: true,
 *     $waiting: $(),
 *     waitingText: "",
 *     alertTyle: "system"
 *   },
 *   onFormSubmit: $.noop,
 *   onFormReset: $.noop,
 *   onDialogClose: $.noop
 * }
 */
export function init( $dlg, opts ) {
  const defaultSelector = defaults.dialog.selector;

  if ( isPlainObject($dlg) ) {
    opts = $dlg;
    $dlg = $(defaultSelector);
  }
  else {
    $dlg = $($dlg);

    if ( !isPlainObject(opts) ) {
      opts = {};
    }
  }

  const $form = resolveDialogForm($dlg, opts);

  // 不是 Bootstrap 所提供的模态对话框或对话框中表单个数不是一个时跳出
  if ( !$dlg.is(".modal") || $form.length !== 1 ) {
    return;
  }

  h5f($form);

  if ( $dlg.is(defaultSelector) ) {
    if ( !hasOwnProp("$button", opts) && !hasOwnProp("$btn", opts) ) {
      opts.$button = $(defaults.dialog.button);
    }

    if ( !hasOwnProp("$table", opts) ) {
      opts.$table = getDefaultTable();
    }
  }

  let $btn = $(opts.$button);

  // 兼容旧的 `$btn` 属性
  // 已废弃，以后会删除
  if ( $btn.length === 0 ) {
    $btn = $(opts.$btn);
  }

  if ( $btn.length > 0 ) {
    $btn.on("click", function() {
      $form.trigger("submit");
    });
  }

  let onFormSubmit = resolveSubmitHandler($dlg, opts);

  $form.on({
    "H5F:submit": function( evt, inst, submitEvt ) {
      onFormSubmit.apply(this, [evt, jsonify($form), inst, submitEvt]);
      
      submitEvt.preventDefault();

      return false;
    },
    "reset": function() {
      if ( isFunction(opts.onFormReset) ) {
        opts.onFormReset.apply(this, arguments);
      }
    }
  });

  let handler = opts.onDialogClose;

  // 兼容旧的 `onModalHide` 属性
  // 已废弃，以后会删除
  if ( !isFunction(handler) ) {
    handler = opts.onModalHide;
  }

  $dlg.on("hidden.bs.modal", function() {
    $form.trigger("reset");
    $dlg.removeClass("is-editing is-viewing");

    if ( isFunction(handler) ) {
      handler.apply(this, arguments);
    }
  });

  return $dlg;
}

export function levelUp( $dlg ) {
  let $backdrop = $dlg.data("bs.modal").$backdrop;
  let increase = dialogLevel * 2 * 10;

  $dlg.css("z-index", DIALOG_DEFAULT_INDEX + increase);

  if ( $backdrop ) {
    $backdrop.css("z-index", DIALOG_DEFAULT_INDEX + increase - 10);
  }

  dialogLevel++;
}

export function levelDown( $dlg ) {
  let $backdrop = $dlg.data("bs.modal").$backdrop;

  $dlg.css("z-index", DIALOG_DEFAULT_INDEX);

  if ( $backdrop ) {
    $backdrop.css("z-index", DIALOG_DEFAULT_INDEX - 10);
  }

  dialogLevel--;
}

// 获取最顶级的对话框
export function top() {
  return [].sort.call($(".modal:visible"), function( a, b ) {
    return $(a).css("z-index") * 1 < $(b).css("z-index") * 1;
  }).first();
}
