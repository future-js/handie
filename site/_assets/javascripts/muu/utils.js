/*!
 * MUU v1.6.8
 * Unified UI framework for admin websites of MaiHaoChe.com
 * http://doc.haimaiche.net/muu/
 *
 * Copyright 2017, Ourai Lin <ourairyu@gmail.com> (http://ourai.ws/)
 * Released under the MIT license.
 *
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@8888888888888888888888888888888888@@@@@@@@@@
 * @@@@@@@@@0LffffffffffffffffffffffffffffffffL0@@@@@@@@@
 * @@@@@@@@8LffffffffffffffffffffffffffffffffffL8@@@@@@@@
 * @@@@@@@8LfffffGGGGGGGGGGGGGGGGGGGGGGGGGGfffffL8@@@@@@@
 * @@@@@@@Cfffff0@@@@@@@@@@@@@@@@@@@@@@@@@@0fffffC@@@@@@@
 * @@@@@@GLffffG@@@@@@@@@@.880088.@@@@@@@@@@GffffLG@@@@@@
 * @@@@@0LffffC@@@@@@@@80CLLffffLLC08@@@@@@@@CffffL0@@@@@
 * @@@@@Cfffff8@@@@@@@0LffffffffffffL0@@@@@@@8fffffC@@@@@
 * @@@@8LffffG@@@@@@@GffffffLCCLffffffG@@@@@@@GffffL8@@@@
 * @@@@8fffff0@@@@@@0LffffC8@@@@8CffffL0@@@@@@0fffff8@@@@
 * @@@@8ffffL8@@@@@@Cfffff0@@@@@@0fffffC@@@@@@8Lffff8@@@@
 * @@@@0ffffL8@@@@@@GLffffG8@@@@8GffffLG@@@@@@8Lffff0@@@@
 * @@@@0ffffL8@@@@@@@GfffffLC8@@8LffffG@@@@@@@8Lffff0@@@@
 * @@@@0ffffL8@@@@@@@8GLfttttLC8@@0CLG@@@@@@@@8Ltttt0@@@@
 * @@@@0ttttL8@@@@@@@@@8GLfttttfC8@@8@@@@@@@@@8Ltttt0@@@@
 * @@@@0ttttL8@@@@@@@@@@@8GLftttffC0@@@@@@@@@@8Ltttt0@@@@
 * @@@@0ttttL8@@@@@80GCLG8@80LtttttffCG08@@@@@8Ltttt0@@@@
 * @@@@0ttttfffffffftttttLG@@:GLftttttttfffffffftttt0@@@@
 * @@@@0tttttttttttttttffLG8@@@@8GLffttttttttttttttt0@@@@
 * @@@@8LLLLLLLLLLCCGG00@@@@@@@@@@@@00GGCCLLLLLLLLLL8@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

function toString(target) {
  return Object.prototype.toString.call(target);
}

function hasOwnProp(prop, obj) {
  return obj != null && Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * 电子邮箱
 * 
 * 参考自：https://html.spec.whatwg.org/multipage/forms.html#e-mail-state-(type=email)
 */


/**
 * 手机号
 */


/**
 * 车辆识别代号（车架号）
 * 
 * 详见：https://en.wikipedia.org/wiki/Vehicle_identification_number
 */

/**
 * 判断是否为布尔类型
 * 
 * @param {*} target 目标
 */
function isBoolean(target) {
  return toString(target) === "[object Boolean]";
}

/**
 * 判断是否为数字类型
 * 
 * 如果是 `NaN` 的话则返回 `false`
 * 
 * @param {*} target 目标
 */
function isNumber(target) {
  return toString(target) === "[object Number]" && !isNaN(target);
}

/**
 * 判断是否为字符串类型
 * 
 * @param {*} target 目标
 */
function isString$1(target) {
  return toString(target) === "[object String]";
}

/**
 * 判断是否为函数类型
 * 
 * @param {*} target 目标
 */
function isFunction$1(target) {
  return toString(target) === "[object Function]";
}

/**
 * 判断是否为数组类型
 * 
 * @param {*} target 目标
 */
function isArray(target) {
  return toString(target) === "[object Array]";
}

/**
 * 判断是否为对象类型
 * 
 * @param {*} target 目标
 */
function isObject(target) {
  return toString(target) === "[object Object]";
}

/**
 * 判断是否为宿主环境全局对象
 * 
 * 在浏览器环境中就是 `window` 对象
 * 
 * @param {*} target 目标
 */
function isGlobal(target) {
  return target && isObject(target) && "setInterval" in target;
}

/**
 * 判断是否为类数组对象
 * 
 * @param {*} target 目标
 */
function isArrayLike(target) {
  var result = false;

  if (isObject(target) && !isGlobal(target)) {
    var length = target.length;

    if (target.nodeType === 1 && length || !isArray(target) && !isFunction$1(target) && (length === 0 || isNumber(length) && length > 0 && length - 1 in target)) {
      result = true;
    }
  }

  return result;
}

/**
 * 判断是否为纯对象
 * 
 * @param {*} target 目标
 */
function isPlainObject(target) {
  if (!target || !isObject(target) || target.nodeType || isGlobal(target)) {
    return false;
  }

  try {
    if (target.constructor && !hasOwnProp("constructor", target) && !hasOwnProp("isPrototypeOf", target.constructor.prototype)) {
      return false;
    }
  } catch (err) {
    return false;
  }

  var key = void 0;

  for (key in target) {
    
  }

  return key === undefined || hasOwnProp(key, target);
}

/**
 * 获取用户代理字符串
 */
/**
 * 卖好车
 */


/**
 * 钉钉
 */

// 需要被实现


/**
 * 微信
 */


/**
 * Android
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _typeof$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/**
 * 判断是否当作数组进行处理
 * 
 * @param {*} target 目标
 */
function treatAsArray(target) {
  return isString$1(target) || isArray(target) || isArrayLike(target);
}

/**
 * 遍历指定对象
 * 
 * 与 `jQuery.each()` 效果类似
 * 
 * 详见：http://api.jquery.com/jQuery.each/
 * 
 * @param {*} target 目标
 * @param {*} callback 应用到每个元素的处理函数
 */
function eachItem(target, callback) {
  if (treatAsArray(target)) {
    var idx = 0;
    var ele = void 0;

    while (idx < target.length) {
      ele = isString$1(target) ? target.charAt(idx) : target[idx];

      if (callback.apply(ele, [ele, idx++, target]) === false) {
        break;
      }
    }
  } else if (isObject(target) || isFunction$1(target)) {
    var name = void 0,
        value = void 0;

    for (name in target) {
      value = target[name];

      if (callback.apply(value, [value, name, target]) === false) {
        break;
      }
    }
  }
}

/**
 * 扩展指定对象
 * 
 * 与 `jQuery.extend()` 效果一样
 * 
 * 详见：http://api.jquery.com/jQuery.extend/
 */
function extendTarget() {
  var args = arguments;
  var length = args.length;

  var target = args[0] || {};
  var i = 1;
  var deep = false;
  var clone = void 0,
      copy = void 0,
      copyIsArray = void 0,
      name = void 0,
      opts = void 0,
      src = void 0;

  if (isBoolean(target)) {
    deep = target;
    target = args[1] || {};
    i = 2;
  }

  if ((typeof target === "undefined" ? "undefined" : _typeof$1(target)) !== "object" && !isFunction$1(target)) {
    target = {};
  }

  if (length === 1) {
    target = this;
    i--;
  }

  while (i < length) {
    opts = args[i];

    if (opts != null) {
      for (name in opts) {
        copy = opts[name];
        src = target[name];

        if (copy === target) {
          continue;
        }

        if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && isArray(src) ? src : [];
          } else {
            clone = src && isPlainObject(src) ? src : {};
          }

          target[name] = extendTarget(deep, clone, copy);
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }

    i++;
  }

  return target;
}

/**
 * 将目标转化为数组
 * 
 * @param {*} target 目标
 */
function toArray$1(target) {
  return treatAsArray(target) ? [].slice.call(target, 0) : [];
}

/**
 * 判断目标是否在集合中
 * 
 * @param {*} target 目标
 * @param {*} collection 集合
 */
function includes(target, collection) {
  if (isFunction$1(collection.includes)) {
    return collection.includes(target);
  } else if (isFunction$1(collection.indexOf)) {
    return collection.indexOf(target) > -1;
  } else {
    try {
      return jQuery.inArray(target, toArray$1(collection)) > -1;
    } catch (err) {
      return false;
    }
  }
}

/**
 * 对集合中的每个元素进行处理并返回一个新的集合
 * 
 * @param {*} target 目标
 * @param {*} callback 应用到每个元素的处理函数
 */
function map(target, callback) {
  var result = void 0;

  if (treatAsArray(target)) {
    if (isFunction$1([].map)) {
      result = [].map.call(target, callback);
    } else {
      try {
        result = jQuery.map(toArray$1(target), callback);
      } catch (err) {
        result = [];
      }
    }
  }

  return result || [];
}

/**
 * 对集合中的每个元素进行过滤并返回一个新的集合
 * 
 * @param {*} target 目标
 * @param {*} callback 应用到每个元素的处理函数
 */
function filter(arr, callback) {
  var newArr = [];

  if (isArray(arr)) {
    if (isFunction$1(arr.filter)) {
      newArr = arr.filter(callback);
    } else if (isFunction$1(callback)) {
      eachItem(arr, function (idx, val) {
        if (callback.apply(val, [val, idx, [].concat(arr)])) {
          newArr.push(val);
        }
      });
    }
  }

  return newArr || [];
}

/**
 * 获取集合中的最后一个元素
 * 
 * @param {*} target 目标
 */
function last(target) {
  if (treatAsArray(target)) {
    return target[target.length - 1];
  }
}

/**
 * 获取指定对象的所有键
 * 
 * @param {*} target 目标
 */
function keys(target) {
  if (isFunction$1(Object.keys)) {
    return Object.keys(target);
  }

  var arr = [];

  if (isPlainObject(target)) {
    eachItem(target, function (key) {
      return arr.push(key);
    });
  }

  return arr;
}

function isRestful(res) {
  return !(res !== undefined && hasOwnProp("success", res) && hasOwnProp("message", res));
}

/**
 * 使字符串首字母大写
 */
function capitalize(str) {
  return "" + str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 克隆目标
 *
 * @param {*} target 被克隆的对象
 */
function clone(target) {
  return isArray(target) ? [].concat(target) : isPlainObject(target) ? extendTarget(true, {}, target) : target;
}

/**
 * 生成随机 ID
 *
 * @param {*} prefix 随机 ID 的前缀
 */
function generateRandomId(prefix) {
  return prefix + "-" + new Date().getTime().toString(32).toUpperCase();
}

/**
 * 初始化 Bootstrap 所提供的工具提示
 * 
 * https://getbootstrap.com/docs/3.3/javascript/#tooltips
 * 
 * @param {*} $el 目标元素
 * @param {*} opts 配置项
 */
function initBootstrapTooltip($el, opts) {
  $el.tooltip(extendTarget(true, { placement: "auto bottom", trigger: "hover", container: "body" }, opts));
}

/**
 * 获取下拉列表的默认选项
 * 
 * @param {*} $sel 
 */
function getDefaultOptions($sel) {
  return filter($("option", $sel).toArray(), function (opt) {
    return opt.defaultSelected === true;
  });
}

function change($sel, val, callback) {
  var opts = void 0;

  if (val == null || val === "") {
    opts = getDefaultOptions($sel);
  } else {
    if (isString$1(val) && val.split(",")) {
      val = val.split(",");
    }

    opts = isArray(val) ? map(val, function (v) {
      return $("option[value='" + v + "']", $sel);
    }) : $("option[value='" + val + "']", $sel);
  }

  $(":selected", $sel).prop("selected", false);

  eachItem($(opts).toArray(), function (opt) {
    $(opt).prop("selected", true);
  });

  if (isFunction$1(callback)) {
    callback.call($sel.get(0));
  }

  $sel.trigger("change");

  return $sel;
}

var select = Object.freeze({
	change: change
});

function isQueryStr(str) {
  return isString$1(str) && str.split("&").length > 0 && str.split("&")[0].split("=").length > 0;
}

function queryStr2SerializedArr(str) {
  return map(str.split("&"), function (pair) {
    var p = pair.split("=");

    return {
      name: p[0],
      value: decodeURIComponent(p[1])
    };
  });
}

/**
 * 将表单字段转换为 JSON 对象
 *
 * @param $form
 * @param callback
 */
function jsonifyFormData($form, callback) {
  var jsonData = {};

  arrayEach(isArray($form) ? $form : isQueryStr($form) ? queryStr2SerializedArr($form) : $($form).serializeArray(), function (p) {
    jsonData[p.name] = hasOwnProp(p.name, jsonData) ? [].concat(jsonData[p.name], p.value) : p.value;
  });

  if (isFunction$1(callback)) {
    var newJson = callback(jsonData);

    if (isPlainObject(newJson)) {
      jsonData = newJson;
    }
  }

  return jsonData;
}

function resetValidateStatus() {
  var $form = $(this);

  $(".form-group", $form).removeClass("has-success has-error");
  $(".help-block:not(.is-dynamic)", $form).removeClass("u-hidden");
  $(".help-block.is-dynamic, .Error, .ErrorGroup", $form).addClass("u-hidden");
}

function h5f($form) {
  H5F.init($form, { immediate: false });

  $("[name]", $form).on({
    "H5F:valid": function H5FValid(e, f) {
      var $cell = $(e.target).closest("div");
      var $group = $cell.closest(".form-group");
      var errSelector = void 0;

      if ($group.length > 0) {
        errSelector = ".help-block[data-name=\"" + f.name + "\"]";

        $(".help-block:not(.is-dynamic)", $group).addClass("u-hidden");
        $group.removeClass("has-error").addClass("has-success");
      } else {
        errSelector = ".Error[data-name=\"" + f.name + "\"]";
        $group = $(".ErrorGroup", $cell);
      }

      $(errSelector, $cell).addClass("u-hidden");

      if ($group.is(".ErrorGroup") && $(".Error:not(.u-hidden)", $group).length === 0) {
        $group.addClass("u-hidden");
      }
    },
    "H5F:invalid": function H5FInvalid(e, f) {
      var $cell = $(e.target).closest("div");
      var $group = $cell.closest(".form-group");
      var $container = void 0,
          errSelector = void 0,
          errHtml = void 0;

      if ($group.length > 0) {
        errSelector = ".help-block[data-name=\"" + f.name + "\"]";
        errHtml = "<p class=\"help-block is-dynamic\" data-name=\"" + f.name + "\" />";
        $container = $cell;

        $(".help-block:not(.is-dynamic)", $container).addClass("u-hidden");
        $group.removeClass("has-success").addClass("has-error");
      } else {
        errSelector = ".Error[data-name=\"" + f.name + "\"]";
        errHtml = "<p class=\"Error\" data-name=\"" + f.name + "\" />";
        $container = $(".ErrorGroup", $cell);

        if ($container.length > 0) {
          $container.removeClass("u-hidden");
        } else {
          $cell.append("<div class=\"ErrorGroup\" />");
          $container = $(".ErrorGroup", $cell);
        }
      }

      var $err = $(errSelector, $container);

      if ($err.length === 0) {
        $container.append(errHtml);
        $err = $(errSelector, $container);
      }

      $err.text(f.message).removeClass("u-hidden");
    }
  });

  $form.on("reset", resetValidateStatus);
}

/**
 * 填充表单
 *
 * @param $form
 * @param data
 */
function fill($form, data) {
  if (!isPlainObject(data)) {
    return;
  }

  $("[name]", $form).each(function () {
    var $ipt = $(this);
    var tagName = this.tagName.toLowerCase();
    var key = $ipt.attr("name");
    var value = data[key];

    if (includes(tagName, ["input", "textarea"])) {
      if (includes($ipt.attr("type"), ["radio", "checkbox"])) {
        $("[name=\"" + key + "\"][value=\"" + value + "\"]", $form).prop("checked", true);
      } else {
        $ipt.val(value);
      }
    } else if (tagName === "select") {
      change($ipt, value);
    }
  });
}

/**
 * 重置表单
 *
 * @param $form
 */
function reset($form, callback) {
  $("select", $form).each(function () {
    change($(this));
  });

  $("[type='hidden']", $form).val("");

  if (isFunction$1(callback)) {
    callback.call($form.get(0));
  }
}

function serialize($form, filter$$1) {
  var settings = $form;
  var serializer = void 0;

  if (isPlainObject($form)) {
    $form = settings.$form;
    filter$$1 = settings.filter;
    serializer = settings.serializer;
  }

  if (!isFunction$1(filter$$1)) {
    filter$$1 = defaults$1.form.filter;
  }

  if (!isFunction$1(serializer)) {
    serializer = defaults$1.form.serializer;
  }

  $form = $($form);

  return serializer(filter($form.serializeArray(), function (data, idx, arr) {
    return filter$$1(data, $("[name=\"" + data.name + "\"]", $form), arr);
  }));
}



var form = Object.freeze({
	h5f: h5f,
	fill: fill,
	reset: reset,
	serialize: serialize,
	jsonify: jsonifyFormData
});

var bizData = {};

function resolveRefKeys(str) {
  return isString$1(str) && new RegExp("^[0-9a-z_]+(\.[0-9a-z_]+)*$", "i").test(str) ? str.split(".") : [];
}

function setData(key, val) {
  var keys$$1 = resolveRefKeys(key);

  if (arguments.length < 2 || keys$$1.length === 0) {
    return;
  }

  var lastKey = keys$$1.pop();
  var tmp = bizData;

  eachItem(keys$$1, function (k) {
    if (!hasOwnProp(k, tmp)) {
      tmp[k] = {};
    }

    tmp = tmp[k];
  });

  tmp[lastKey] = val;

  return val;
}

function getData(key) {
  var keys$$1 = resolveRefKeys(key);

  if (keys$$1.length === 0) {
    return;
  }

  var idx = 0;
  var keyLength = keys$$1.length;
  var tmp = clone(bizData);
  var val = void 0,
      k = void 0;

  for (; idx < keyLength; idx++) {
    k = keys$$1[idx];
    val = tmp[k];

    if (!hasOwnProp(k, tmp)) {
      break;
    }

    tmp = val;
  }

  return val;
}

function alertMessage(message, settings) {
  var type = void 0,
      formatter = void 0;

  if (isString$1(settings)) {
    type = settings;
  } else if (isPlainObject(settings)) {
    type = settings.type;
    formatter = settings.formatter;
  }

  if (type === "bootstrap") {
    var $m = $(".js-alertSystemMessage");

    if ($m.length === 0) {
      $m = $("\n          <div class=\"modal fade js-alertSystemMessage\">\n            <div class=\"modal-dialog\">\n              <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                  <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span>&times;</span></button>\n                  <h4 class=\"modal-title\">\u7CFB\u7EDF\u63D0\u793A</h4>\n                </div>\n                <div class=\"modal-body\"></div>\n                <div class=\"modal-footer\">\n                  <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\u5173\u95ED</button>\n                </div>\n              </div>\n            </div>\n          </div>\n        ");

      $("body").append($m);
    }

    if (!isFunction$1(formatter)) {
      formatter = function formatter(message) {
        return "<p class=\"u-textBreak\">" + message + "</p>";
      };
    }

    $(".modal-body", $m).html(formatter.call(null, message) || message);

    $m.modal("show");
  } else {
    window.alert(message);
  }
}

var $el = {
  triggerType: function triggerType($el) {
    return $el.attr("class").match(/js\-([a-zA-Z]+)/)[1];
  }
};

function setDefaults(settings) {
  extendTarget(true, defaults$1, settings);
}

var DEFAULT_TABLE_SELECTOR = ".js-showDataTable";

/**
 * 获取默认的数据表格
 */
function getDefaultTable$1() {
  return $(DEFAULT_TABLE_SELECTOR);
}

/**
 * 获取新增数据相关配置项
 *
 * @param {*} toolbarOpts 工具栏配置项
 */
function resolveCreateOptions(toolbarOpts) {
  return clone(toolbarOpts.create || toolbarOpts.add || toolbarOpts);
}

/**
 * 判断操作列是否可固定
 * 
 * @param {*} tableOpts 表格配置项
 */
function isOperationColumnSticky(tableOpts) {
  return tableOpts.__operationDefinedByColumns === true || tableOpts.operation && tableOpts.operation.sticky === true;
}

/**
 * 切换数据列表表头和操作列的固定状态
 * 
 * @param {*} tableInst 数据列表实例
 * @param {*} enabled 是否启用
 * @param {*} tableBodyHeight 数据列表可见区域高度
 */
function toggleTableStickyStatus$1(tableInst, enabled, tableBodyHeight) {
  var $tableContainer = tableInst.$tableContainer,
      $tableHeader = tableInst.$tableHeader,
      $tableBody = tableInst.$tableBody;

  var isColSticky = isOperationColumnSticky(tableInst.options);

  if (enabled !== false) {
    $tableBody.css("height", tableBodyHeight);
    $tableContainer.addClass("is-sticky");
    $tableHeader.show();

    if (isColSticky) {
      $tableBody.css("position", "relative").find(".Table-container--alternative").css("margin-right", "-" + $tableBody.scrollLeft() + "px");
    }
  } else {
    $tableBody.css("height", "auto");
    $tableContainer.removeClass("is-sticky");
    $("> table", $tableHeader.hide()).css("margin-left", 0);

    if (isColSticky) {
      $tableBody.css("position", "static").find(".Table-container--alternative").css("margin-right", 0);
    }
  }
}

/**
 * 刷新数据列表
 * 
 * @param {*} $table 
 * @param {*} resetTop 是否重置到首页
 */
function refreshTable() {
  var $table = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getDefaultTable$1();
  var resetTop = arguments[1];

  if ($.type($table) === "boolean") {
    resetTop = $table;
    $table = getDefaultTable$1();
  }

  var opts = void 0;

  if (resetTop === true) {
    opts = { pageNumber: 1 };
  }

  $table.bootstrapTable("refresh", opts);
}

var _this = undefined;

/**
 * 获取与指定数据列表绑定的对话框
 *
 * @param {*} $table 数据列表
 */
function resolveBoundDialog($table) {
  var tableOpts = $table.data("bootstrap.table").options;
  var createOpts = resolveCreateOptions(tableOpts.__toolbar || {});

  var $m = $(tableOpts.__$dialog);

  if ($m.length === 0 && $table.is(getDefaultTable$1())) {
    $m = $(defaults$1.dialog.selector);
  }

  return $m;
}

function resolveListResponse(res) {
  var rows = [];
  var total = 0;

  if (isArray(res)) {
    rows = res;
    total = res.length;
  } else if (isPlainObject(res)) {
    // {result: [], totalCount: 0}
    if (isArray(res.result)) {
      rows = res.result;
      total = res.totalCount;
    }
    // {data: [], totalCount: 0}
    else if (isArray(res.data)) {
        rows = res.data;
        total = res.totalCount;
      }
      // {data: {result: [], totalCount: 0}}
      else if (isPlainObject(res.data) && isArray(res.data.result)) {
          rows = res.data.result;
          total = res.data.totalCount;
        }
  }

  return { rows: rows, total: total };
}

var defaults$1 = {
  ajax: {
    RESTful: true,
    waitingText: "数据保存中，请耐心等待...",
    serverErrorText: "服务器开小差啦～",
    /**
     * 请求发生错误时的处理
     */
    errorHandler: function errorHandler(evt, req, settings, err) {
      var code = req.status;

      if (code >= 500) {
        alertMessage(defaults$1.ajax.serverErrorText);
      } else if (code >= 400) {
        var resJson = req.responseJSON;

        var resText = void 0;

        // 支持 {"message": ""} 形式的错误信息
        if (isPlainObject(resJson) && hasOwnProp("message", resJson)) {
          resText = resJson.message;
        } else {
          resText = req.responseText;
        }

        alertMessage(resText);
      }
    },
    /**
     * 对请求返回数据的处理
     */
    responseHandler: function responseHandler(res, callback, settings) {
      var hasCallback = isFunction$1(callback);
      var alertOpts = { type: settings.alertType, formatter: settings.alertFormatter };

      // RESTful 请求的情况
      if (isRestful(res)) {
        if (isString$1(res) && res !== "") {
          alertMessage(res, alertOpts);
        } else {
          if (hasCallback) {
            callback.call(null, res);
          }
        }
      }
      // 返回结构为 {success: true, message: ""} 的情况
      else {
          if (res.success) {
            if (hasCallback) {
              callback.call(null, res.data);
            }
          } else {
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
        "click .js-edit": function clickJsEdit(evt, val, row, idx) {
          var $btn = $(this);
          var $m = resolveBoundDialog($btn.closest("table"));

          if ($btn.is("a[href]") || $m.length !== 1) {
            evt.stopPropagation();

            return;
          }

          fill($("form", $m), row);

          $m.modal("show");

          evt.stopPropagation();
        },
        "click .js-delete": function clickJsDelete(evt, val, row, idx) {
          var $btn = $(this);
          var $t = $btn.closest("table");

          var ajaxOpts = last($t.data("bootstrap.table").columns).__muuAjaxOpts || {};

          if (hasOwnProp("delete", ajaxOpts)) {
            ajaxOpts = ajaxOpts.delete;
          }

          if (!hasOwnProp("url", ajaxOpts)) {
            evt.stopPropagation();

            return;
          }

          var callback = function callback() {
            refreshTable($t);
          };

          var req = defaults$1.ajax.RESTful === true ? ajaxDelete : ajaxPost;
          var args = [row, idx];
          var _ajaxOpts = ajaxOpts,
              url = _ajaxOpts.url,
              params = _ajaxOpts.params,
              extra = _ajaxOpts.extra;


          if (isFunction$1(url)) {
            url = url.apply(this, args);
          }

          if (isFunction$1(params)) {
            params = params.apply(this, args);
          }

          if (isFunction$1(extra)) {
            extra = extra.apply(this, args);
          }

          if (isString$1(url) && confirm("\u786E\u5B9A\u8981" + $btn.attr("title") + "\uFF1F")) {
            if (params) {
              req(url, params, callback, extra);
            } else {
              req(url, callback, extra);
            }
          }

          evt.stopPropagation();
        }
      }
    },
    responseHandler: function responseHandler(res) {
      var resolved = resolveListResponse(res);

      if (isRestful(res)) {
        if (isString$1(res)) {
          alertMessage(res);
        }
      } else if (!res.success) {
        alertMessage(res.message);
      }

      return _this.sidePagination === "server" ? resolved : resolved.rows;
    }
  },
  form: {
    filter: function filter$$1(data, $field, arr) {
      return true;
    },
    serializer: function serializer(arr) {
      return arr;
    }
  },
  dialog: {
    backdrop: true, // 可选值请看 https://getbootstrap.com/docs/3.3/javascript/#modals-options
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
    container: function container() {
      return $(".js-watermark:not(.modal .js-watermark)").get(0);
    },
    mainOnly: false,
    autoInit: true
  }
};

/**
 * 重置请求等待状态
 */
function resetWaitStatus() {
  $(".modal:visible .js-waitForResult:visible").each(function () {
    var $layer = $(this);
    var $modal = $layer.closest(".modal");

    $layer.hide();
    $modal.removeClass("is-waiting");
    $("button", $(".modal-header, .modal-footer", $modal)).prop("disabled", false);
  });
}

function resolveAjaxResult(res, callback, settings) {
  if (!isPlainObject(settings)) {
    settings = {};
  }

  if (!hasOwnProp("alertType", settings)) {
    settings.alertType = "system";
  }

  defaults$1.ajax.responseHandler(res, callback, settings);
}

function waitingForResponse($target) {
  var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaults$1.ajax.waitingText;

  var $dlg = $target.closest(".modal");

  if ($dlg.length) {
    $dlg.addClass("is-waiting");

    if ($(".js-waitForResult", $dlg).length) {
      $(".js-waitForResult", $dlg).show();
    } else {
      $(".modal-content", $dlg).append("<div class=\"Layer Layer--loading js-waitForResult\"><p>" + text + "</p></div>");
    }

    $("button", $(".modal-header, .modal-footer", $dlg)).prop("disabled", true);
  }
}

/**
 * 发起 HTTP 请求
 *
 * @param url
 * @param method
 * @param params
 * @param callback
 * @param isJson
 * @param settings
 * @returns {*}
 */
function httpReq(url, method, params, callback, isJson, settings) {
  var ajaxOpts = {
    url: url,
    type: method,
    success: function success(res) {
      resetWaitStatus();

      resolveAjaxResult(res, function (result) {
        if (isFunction$1(callback)) {
          callback.call(null, result, res);
        }
      }, settings);
    }
  };

  params = isPlainObject(params) || isArray(params) ? params : jsonifyFormData(params);

  if (isJson === true) {
    ajaxOpts.data = JSON.stringify(params);
    ajaxOpts.contentType = "application/json; charset=UTF-8";
  } else {
    if (includes(method, ["get", "delete"])) {
      if (keys(params).length) {
        ajaxOpts.url += "?" + map(keys(params), function (k) {
          return k + "=" + encodeURIComponent(params[k]);
        }).join("&");
      }
    } else {
      ajaxOpts.data = params;
    }
  }

  return $.ajax(ajaxOpts);
}

function generateAjaxUtil(method) {
  return function (url, params, callback, isJson) {
    var $waiting = void 0,
        waitingText = void 0,
        alertType = void 0;

    /**
     * muu.ajax[method]({
     *    url: "",
     *    data: {},
     *    callback: $.noop,
     *    isJson: false,
     *    $waiting: $(),
     *    waitingText: "",
     *    alertType: "bootstrap"
     * })
     */
    if (isPlainObject(url)) {
      var opts = url;

      url = opts.url;
      params = opts.data;
      callback = opts.callback;
      isJson = opts.isJson;

      $waiting = opts.$waiting;
      waitingText = opts.waitingText;

      alertType = opts.alertType;
    } else {
      // muu.ajax[method](url, callback, isJson)
      if (isFunction$1(params)) {
        isJson = callback;
        callback = params;
        params = {};
      }
      /**
       * muu.ajax[method](url, params, {
       *    callback: $.noop,
       *    isJson: false,
       *    $waiting: $(),
       *    waitingText: "",
       *    alertType: "bootstrap"
       * })
       */
      else if (isPlainObject(callback)) {
          $waiting = callback.$waiting;
          waitingText = callback.waitingText;

          alertType = callback.alertType;

          isJson = callback.isJson;
          callback = callback.callback;
        }
        /**
         * muu.ajax[method](url, params, callback, {
         *    isJson: false,
         *    $waiting: $(),
         *    waitingText: "",
         *    alertType: "bootstrap"
         * })
         */
        else if (isPlainObject(isJson)) {
            $waiting = isJson.$waiting;
            waitingText = isJson.waitingText;

            alertType = isJson.alertType;

            isJson = isJson.isJson;
          }
    }

    if ($waiting) {
      waitingForResponse($waiting, waitingText);
    }

    if (alertType == null) {
      alertType = "system";
    }

    return httpReq(url, method, params, callback, isJson, { alertType: alertType });
  };
}

var ajaxGet = generateAjaxUtil("get");

var ajaxPost = generateAjaxUtil("post");

var ajaxPut = generateAjaxUtil("put");

var ajaxDelete = generateAjaxUtil("delete");



var ajax = Object.freeze({
	get: ajaxGet,
	post: ajaxPost,
	put: ajaxPut,
	delete: ajaxDelete,
	result: resolveAjaxResult,
	waiting: waitingForResponse
});

function supportPointerEvents() {
  var style = document.createElement("a").style;

  style.cssText = "pointer-events:auto";

  return style.pointerEvents === "auto";
}

function supportWebSocket() {
  return hasOwnProp("WebSocket", window);
}

function supportWebNotification() {
  return hasOwnProp("Notification", window);
}

function supportLocalStorage() {
  return hasOwnProp("localStorage", window);
}

/**
 * 获取处理后的 WebSocket 连接地址
 *
 * @param {*} url
 */
function resolveSocketUrl(url) {
  var isNoProtocol = url.indexOf("//") === 0;

  // 本地开发时强制替换为 ws 协议
  if (location.hostname === "localhost") {
    url = isNoProtocol ? "ws:" + url : url.replace(/^ws(s)?\:\/\//, "ws\:\/\/");
  }
  // 其他环境中无协议时采用 wss 协议
  else if (isNoProtocol) {
      url = "wss:" + url;
    }

  return url;
}

/**
 * 使 WebSocket 连接保持活跃
 *
 * @param {*} ws 连接实例
 * @param {*} interval 发送信息间隔
 */
function keepSocketAlive(ws, interval) {
  setTimeout(function () {
    ws.send("使 WebSocket 连接保持活跃");
    keepSocketAlive(ws, interval);
  }, interval);
}

/**
 * opts 的结构为：
 * {
 *   url: "",
 *   interval: 0,
 *   closeBeforeUnload: true,
 *   onOpen: $.noop,
 *   onClose: $.noop,
 *   onMessage: $.noop,
 *   onError: $.noop
 * }
 */
function init(opts) {
  if (isString$1(opts)) {
    opts = { url: opts };
  }

  if (!(supportWebSocket() && isPlainObject(opts) && hasOwnProp("url", opts))) {
    return;
  }

  var ws = new WebSocket(resolveSocketUrl(opts.url));

  // 页面卸载时关闭连接
  if (opts.closeBeforeUnload !== false) {
    window.addEventListener("beforeunload", function () {
      ws.close();
    });
  }

  // 保持连接处于活跃状态
  if ($.isNumeric(opts.interval) && opts.interval * 1 > 0) {
    ws.addEventListener("open", function () {
      keepSocketAlive(ws, opts.interval);
    });
  }

  // 绑定指定事件
  eachItem(["open", "close", "message", "error"], function (evtName) {
    var handler = opts["on" + capitalize(evtName)];

    if (isFunction$1(handler)) {
      ws.addEventListener(evtName, handler);
    }
  });

  return ws;
}

var socket = Object.freeze({
	init: init
});

var builtInActions = {
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
  return extendTarget(true, {}, builtInActions, defaults$1.generator.actions);
}

/**
 * 获取简易处理的按钮参数
 *
 * @param {*} opts 操作按钮参数
 */
function resolveTriggerOptionsSimply(opts) {
  if (isString$1(opts) && hasOwnProp(opts, resolveDefaultTriggerOptions())) {
    opts = { action: opts };
  }

  return opts;
}

/**
 * 获取处理后的按钮参数
 *
 * @param {*} opts 操作按钮参数
 */
function resolveTriggerOptions(opts) {
  var defaultActionOpts = resolveDefaultTriggerOptions();

  var action = void 0;

  if (opts.isDelete === true) {
    action = "delete";
  } else {
    action = opts.action;
  }

  if (hasOwnProp(action, defaultActionOpts)) {
    var defaultOpts = defaultActionOpts[action];

    eachItem(keys(defaultOpts), function (k) {
      if (!hasOwnProp(k, opts)) {
        opts[k] = defaultOpts[k];
      }
    });
  }

  return opts;
}

/**
 * 生成操作的主触发器
 */
function generateMainTrigger(opts) {
  var triggerCls = [].concat(opts.btnCls);
  var attrs = [];

  var tagName = void 0;

  if (isString$1(opts.action)) {
    triggerCls.push("js-" + opts.action);
  }

  if (isString$1(opts.url)) {
    tagName = "a";

    attrs.push("href=\"" + opts.url + "\"");

    if (opts.isExternal === true) {
      attrs.push("target=\"_blank\"");
    }
  } else {
    tagName = "button";

    attrs.push("type=\"button\"");

    if (opts.disabled === true) {
      attrs.push("disabled");
    }
  }

  if (opts.hasChildren && opts.isSplit !== true) {
    triggerCls.push("dropdown-toggle");
    attrs.push("data-toggle=\"dropdown\"");
  }

  attrs.push("class=\"" + triggerCls.join(" ") + "\"", "title=\"" + (opts.tooltip || opts.text) + "\"");

  var html = ["<" + tagName + " " + attrs.concat(opts.btnAttrs).join(" ") + ">"];

  if (isString$1(opts.icon)) {
    var iconCls = ["Operation-icon", "fa", "fa-" + opts.icon];

    if (opts.fixedWidth !== false) {
      iconCls.push("fa-fw");
    }

    html.push("<i class=\"" + iconCls.join(" ") + "\"></i><span class=\"" + (opts.isCoexisted === true ? "Operation-label" : "sr-only") + "\">" + opts.text + "</span>");
  } else {
    html.push(opts.text);
  }

  if (opts.hasChildren && opts.isSplit !== true) {
    html.push("<span class=\"caret\"></span>");
  }

  html.push("</" + tagName + ">");

  return html.join("");
}

/**
 * 生成下拉菜单的条目
 */
function generateSubItem(item) {
  var content = void 0;

  if (isString$1(item)) {
    content = item;
  } else if (isPlainObject(item)) {
    item = resolveTriggerOptions(item);

    if (hasOwnProp("html", item)) {
      content = item.html;
    } else {
      content = "<a class=\"js-" + item.action + "\" href=\"" + (isString$1(item.url) ? item.url : "javascript:void(0);") + "\"" + (item.isExternal === true ? "target=\"_blank\"" : "") + ">" + item.text + "</a>";
    }
  }

  return "<li>" + (content || "") + "</li>";
}

/**
 * 生成按钮操作相关的下拉菜单
 */
function generateDropdownMenu(opts) {
  var html = [];

  // 子菜单操作与主按钮分离
  if (opts.isSplit === true) {
    html.push("<button type=\"button\" class=\"" + opts.btnCls.concat("dropdown-toggle").join(" ") + "\" data-toggle=\"dropdown\"", opts.disabled === true ? " disabled" : "", "><span class=\"caret\"></span></button>");
  }

  html.push("<ul class=\"Operation-menu dropdown-menu", opts.align === "right" ? " dropdown-menu-right" : "", "\">");

  // `opts.actions` 的结构可以为：
  //        `[action, action, action, action]`
  //    或
  //        `[[action, action], [action, action]]`
  //
  // 后者会在下拉菜单中生成分割线
  //
  // `action` 的结构为 `{action: "", text: "", url: "", isExternal: true}`
  html.push(map(opts.actions, function (child, idx) {
    var isGrouped = isArray(child);

    var items = !isGrouped ? generateSubItem(child) : map(child, function (groupedChild) {
      return generateSubItem(groupedChild);
    }).join("");

    if (idx > 0 && isGrouped) {
      items = "<li class=\"divider\"></li>" + items;
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
function constructActionButton(opts, settings) {
  opts = resolveTriggerOptionsSimply(opts);

  if (!isPlainObject(opts)) {
    return "";
  }

  extendTarget(opts, settings);

  var html = [];
  var size = opts.size || "xs";
  var hasChildren = hasOwnProp("actions", opts) && isArray(opts.actions);

  var btnCls = clone(opts.classes);

  if (isString$1(btnCls)) {
    btnCls = btnCls.split(" ");
  } else if (!isArray(btnCls)) {
    btnCls = [];
  }

  btnCls = ["Operation", "btn", "btn-" + (opts.isPrimary === true ? "primary" : opts.isDelete === true ? "danger" : "default"), "btn-" + size].concat(btnCls);

  var btnAttrs = clone(opts.attributes);

  if (isPlainObject(btnAttrs)) {
    var attrs = [];

    eachItem(btnAttrs, function (k, v) {
      attrs.push(k + "=" + v);
    });

    btnAttrs = attrs;
  } else if (isString$1(btnAttrs)) {
    btnAttrs = btnAttrs.split(" ");
  } else if (!isArray(btnAttrs)) {
    btnAttrs = [];
  }

  html.push(generateMainTrigger(extendTarget({}, resolveTriggerOptions(opts), {
    btnCls: btnCls.concat(isString$1(opts.buttonClass) ? opts.buttonClass : []),
    btnAttrs: btnAttrs,
    hasChildren: hasChildren
  })));

  if (hasChildren) {
    html.unshift("<div class=\"btn-group btn-group-" + size + "\">");
    html.push(generateDropdownMenu(extendTarget({}, opts, { btnCls: btnCls })), "</div>");
  }

  return html.join("");
}

var DIALOG_DEFAULT_INDEX = 1050;

var dialogLevel = 0;

/**
 * 获取对话框中的表单
 * 
 * @param {*} $dlg 对话框
 * @param {*} opts 对话框配置项
 */
function resolveDialogForm($dlg, opts) {
  var $form = $(opts.$form);

  if ($form.length === 0 || !$.contains($dlg.get(0), $form.get(0))) {
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
function resolveRequestHandler(method, params, ctx) {
  var handler = method;

  // 应该返回 `"post"`、`"put"` 或 `muu.ajax.post`、`muu.ajax.put`
  if (isFunction$1(handler)) {
    handler = handler.call(ctx, params);
  }

  // 通过 `"post"`、`"put"` 获取对应的处理函数
  if (isString$1(handler) && includes(handler.toLowerCase(), ["post", "put"])) {
    handler = handler.toLowerCase() === "post" ? ajaxPost : ajaxPut;
  }

  // 默认的请求方法
  if (!isFunction$1(handler)) {
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
function resolveSubmitHandler($dlg, opts) {
  if (isFunction$1(opts.onFormSubmit)) {
    return opts.onFormSubmit;
  }

  var ajaxOpts = clone(opts.ajax) || {};

  if (isString$1(ajaxOpts)) {
    ajaxOpts = { url: ajaxOpts };
  }

  var rawUrl = ajaxOpts.url;

  if (!includes($.type(rawUrl), ["string", "function"])) {
    return $.noop;
  }

  var _ajaxOpts = ajaxOpts,
      method = _ajaxOpts.method,
      params = _ajaxOpts.params,
      callback = _ajaxOpts.callback;

  // 删除用于构造处理函数的属性
  // 其余部分作为 `muu.ajax.METHOD()` 的最后一个参数传入

  eachItem(["url", "method", "params", "callback"], function (key) {
    delete ajaxOpts[key];
  });

  return function (evt, jsonified, inst, submitEvt) {
    var req = resolveRequestHandler(method, jsonified, this);

    var url = rawUrl;

    if (isFunction$1(url)) {
      url = url.call(null, jsonified);
    }

    if (isFunction$1(params)) {
      jsonified = params.call(this, jsonified);
    }

    req(url, jsonified, function () {
      if (isFunction$1(callback)) {
        callback.call(null);
      }

      refreshTable(opts.$table);
      $dlg.modal("hide");
    }, extendTarget({ isJson: defaults$1.ajax.RESTful === true, $waiting: $dlg }, ajaxOpts));
  };
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
function init$1($dlg, opts) {
  var defaultSelector = defaults$1.dialog.selector;

  if (isPlainObject($dlg)) {
    opts = $dlg;
    $dlg = $(defaultSelector);
  } else {
    $dlg = $($dlg);

    if (!isPlainObject(opts)) {
      opts = {};
    }
  }

  var $form = resolveDialogForm($dlg, opts);

  // 不是 Bootstrap 所提供的模态对话框或对话框中表单个数不是一个时跳出
  if (!$dlg.is(".modal") || $form.length !== 1) {
    return;
  }

  h5f($form);

  if ($dlg.is(defaultSelector)) {
    if (!hasOwnProp("$button", opts) && !hasOwnProp("$btn", opts)) {
      opts.$button = $(defaults$1.dialog.button);
    }

    if (!hasOwnProp("$table", opts)) {
      opts.$table = getDefaultTable$1();
    }
  }

  var $btn = $(opts.$button);

  // 兼容旧的 `$btn` 属性
  // 已废弃，以后会删除
  if ($btn.length === 0) {
    $btn = $(opts.$btn);
  }

  if ($btn.length > 0) {
    $btn.on("click", function () {
      $form.trigger("submit");
    });
  }

  var onFormSubmit = resolveSubmitHandler($dlg, opts);

  $form.on({
    "H5F:submit": function H5FSubmit(evt, inst, submitEvt) {
      onFormSubmit.apply(this, [evt, jsonifyFormData($form), inst, submitEvt]);

      submitEvt.preventDefault();

      return false;
    },
    "reset": function reset$$1() {
      if (isFunction$1(opts.onFormReset)) {
        opts.onFormReset.apply(this, arguments);
      }
    }
  });

  var handler = opts.onDialogClose;

  // 兼容旧的 `onModalHide` 属性
  // 已废弃，以后会删除
  if (!isFunction$1(handler)) {
    handler = opts.onModalHide;
  }

  $dlg.on("hidden.bs.modal", function () {
    $form.trigger("reset");
    $dlg.removeClass("is-editing is-viewing");

    if (isFunction$1(handler)) {
      handler.apply(this, arguments);
    }
  });

  return $dlg;
}

function levelUp($dlg) {
  var $backdrop = $dlg.data("bs.modal").$backdrop;
  var increase = dialogLevel * 2 * 10;

  $dlg.css("z-index", DIALOG_DEFAULT_INDEX + increase);

  if ($backdrop) {
    $backdrop.css("z-index", DIALOG_DEFAULT_INDEX + increase - 10);
  }

  dialogLevel++;
}

function levelDown($dlg) {
  var $backdrop = $dlg.data("bs.modal").$backdrop;

  $dlg.css("z-index", DIALOG_DEFAULT_INDEX);

  if ($backdrop) {
    $backdrop.css("z-index", DIALOG_DEFAULT_INDEX - 10);
  }

  dialogLevel--;
}

// 获取最顶级的对话框
function top() {
  return [].sort.call($(".modal:visible"), function (a, b) {
    return $(a).css("z-index") * 1 < $(b).css("z-index") * 1;
  }).first();
}

var dialog = Object.freeze({
	init: init$1,
	levelUp: levelUp,
	levelDown: levelDown,
	top: top
});

/**
 * 重写 Bootstrap Table 的初始化工具栏实现
 */
$.fn.bootstrapTable.Constructor.prototype.initToolbar = function () {
  var tableInst = this;
  var tableOpts = tableInst.options;

  tableOpts.__$search = $(".Area--query form");

  var toolbarOpts = tableOpts.toolbar;

  if (toolbarOpts === true) {
    toolbarOpts = {};
  }

  if (!isPlainObject(toolbarOpts) && !tableOpts.showColumns) {
    return;
  }

  extendTarget(true, tableOpts, {
    __tableInst: tableInst,
    __toolbar: toolbarOpts,
    __$toolbar: $("<div id=\"" + generateRandomId("toolbar") + "\" class=\"Table-toolbar u-clearfix\" />")
  });

  var $table = tableInst.$el;
  var $toolbar = tableInst.$toolbar;

  tableOpts.toolbar = null;

  $toolbar.prepend(tableOpts.__$toolbar);

  initToolbarLeftGroup(toolbarOpts, tableOpts, $table, $toolbar);
  initToolbarRightGroup(toolbarOpts, tableOpts, $table, $toolbar);

  initBootstrapTooltip($("[title]", tableOpts.__$toolbar));
};

function resolveToolbarActionDefaults(opts) {
  return extendTarget({}, defaults$1.table.toolbarActions.basic, opts);
}

/**
 * 构造「新增」按钮
 *
 * @param {*} createOpts 新增数据配置项
 * @param {*} tableOpts 表格配置项
 */
function constructCreateButton(createOpts, tableOpts) {
  var hasDlgOpts = hasOwnProp("dialog", createOpts);

  if (createOpts === true) {
    createOpts = {};
  }

  // 当新增数据配置项为空对象或有 `button` 与 `dialog` 其中任意一个属性时构造「新增」按钮
  if (!(isPlainObject(createOpts) && ($.isEmptyObject(createOpts) || hasOwnProp("button", createOpts) || hasDlgOpts))) {
    return "";
  }

  var btnOpts = extendTarget(true, {}, resolveToolbarActionDefaults(defaults$1.table.toolbarActions.create), createOpts.button, {
    size: tableOpts.iconSize,
    isPrimary: true
  });

  var classes = ["Table-action--create"];

  // 添加自定义的 class
  if (isString$1(btnOpts.classes) && btnOpts.classes !== "") {
    classes = classes.concat(btnOpts.classes.split(" "));
  }

  btnOpts.classes = classes;

  var attrs = [];

  if (!isString$1(btnOpts.url)) {
    var dlgOpts = hasDlgOpts ? createOpts.dialog : {};

    if (isPlainObject(dlgOpts)) {
      var dlgSelector = dlgOpts.selector;

      if (isString$1(dlgSelector)) {
        delete dlgOpts.selector;
      } else {
        dlgSelector = defaults$1.dialog.selector;
      }

      tableOpts.__$dialog = $(dlgSelector);

      attrs.push("data-toggle=\"modal\"", "data-target=\"" + dlgSelector + "\"");
    }
  }

  return constructActionButton(extendTarget(btnOpts, { attributes: attrs }));
}

/**
 * 获取指定数据列表所有被选中行的数据
 *
 * @param {*} $table 数据列表
 */
function getSelectedRowData($table) {
  return $table.bootstrapTable("getAllSelections");
}

/**
 * 判断指定数据列表的数据是否为空
 *
 * @param {*} $table 数据列表
 */
function isEmptyRowData($table) {
  return getSelectedRowData($table).length === 0;
}

/**
 * 绑定批量操作事件
 *
 * @param {*} action 操作配置项
 * @param {*} $table 表格
 * @param {*} $toolbar 工具栏容器
 */
function bindBatchHandle(action, $table, $toolbar) {
  $toolbar.on("click", ".js-" + action.action, function (evt) {
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
function initToolbarActionHandlers(actions, bindHandler, $table, $toolbar) {
  eachItem([].concat(actions), function (a) {
    if (isArray(a)) {
      initToolbarActionHandlers(a, bindHandler, $table, $toolbar);
    } else if (isString$1(a.action) && isFunction$1(a.handler)) {
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
function constructBatchButton(batchOpts, tableOpts, $table, $toolbar) {
  var actions = [];
  var isPrimary = false;
  var isSplit = false;

  if (isArray(batchOpts)) {
    actions = batchOpts;
  } else if (isPlainObject(batchOpts) && isArray(batchOpts.actions)) {
    actions = batchOpts.actions;
    isPrimary = batchOpts.isPrimary === true;

    if (isFunction$1(batchOpts.handler)) {
      isSplit = true;

      bindBatchHandle({ action: defaults$1.table.toolbarActions.batch.action, handler: batchOpts.handler }, $table, $toolbar);
    } else {
      isSplit = batchOpts.isSplit === true;
    }
  }

  if (actions.length === 0) {
    return "";
  }

  var btnOpts = extendTarget(true, {}, resolveToolbarActionDefaults(defaults$1.table.toolbarActions.batch), {
    buttonClass: "Table-action--batch",
    size: tableOpts.iconSize,
    disabled: true,
    isSplit: isSplit
  });

  if (actions.length === 1 && !isArray(actions[0])) {
    extendTarget(true, btnOpts, resolveTriggerOptions(resolveTriggerOptionsSimply(actions[0])));
  } else {
    extendTarget(btnOpts, { actions: actions, isPrimary: isPrimary });
  }

  initToolbarActionHandlers(actions, bindBatchHandle, $table, $toolbar);

  return constructActionButton(btnOpts);
}

function constructOtherButtons(actions, tableOpts, $table, $toolbar) {
  var btnOpts = resolveToolbarActionDefaults({ size: tableOpts.iconSize });

  if (isPlainObject(actions)) {
    actions = [extendTarget({}, btnOpts, actions)];
  } else if (!isArray(actions)) {
    return "";
  }

  var bindHandler = function bindHandler(action, $table, $toolbar) {
    $toolbar.on("click", ".js-" + action.action, function (evt) {
      return action.handler.apply(this, [evt, $table, $toolbar]);
    });
  };
  var html = [];

  eachItem(actions, function (a) {
    a = resolveTriggerOptionsSimply(a);

    html.push(constructActionButton(extendTarget({}, btnOpts, a)));

    initToolbarActionHandlers(a, bindHandler, $table, $toolbar);

    if (isArray(a.actions)) {
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
function constructToolbarLeftGroup(toolbarOpts, tableOpts, $table, $toolbar) {
  return [constructCreateButton(resolveCreateOptions(toolbarOpts), tableOpts), constructOtherButtons(clone(toolbarOpts.actions), tableOpts, $table, $toolbar), constructBatchButton(clone(toolbarOpts.batch), tableOpts, $table, $toolbar)].join("");
}

/**
 * 初始化工具栏左侧操作组
 *
 * @param {*} toolbarOpts 工具栏配置项
 * @param {*} tableOpts 表格配置项
 * @param {*} $table 数据列表
 * @param {*} $toolbar 工具栏容器
 */
function initToolbarLeftGroup(toolbarOpts, tableOpts, $table, $toolbar) {
  if (!isPlainObject(toolbarOpts)) {
    return;
  }

  var $group = $("<div class=\"OperationGroup u-floatLeft u-hidden\" />");

  $group.append(constructToolbarLeftGroup(toolbarOpts, tableOpts, $table, $toolbar));

  if ($group.children().length > 0) {
    $group.removeClass("u-hidden");
  }

  tableOpts.__$toolbar.prepend($group);

  var $batch = $(".Table-action--batch", $group);

  if ($batch.is(".js-" + defaults$1.table.toolbarActions.batch.action)) {
    $batch = $batch.add($batch.siblings("button"));
  }

  // 批量操作按钮可用状态控制
  $table.on({
    "check.bs.table \
     uncheck.bs.table \
     check-some.bs.table \
     uncheck-some.bs.table \
     check-all.bs.table \
     uncheck-all.bs.table": function checkBsTableUncheckBsTableCheckSomeBsTableUncheckSomeBsTableCheckAllBsTableUncheckAllBsTable() {
      $batch.prop("disabled", isEmptyRowData($table));
    },
    "post-body.bs.table": function postBodyBsTable(evt, data) {
      $batch.prop("disabled", data.length === 0 || isEmptyRowData($table));
    },
    "refresh.bs.table": function refreshBsTable() {
      if (tableOpts.url || tableOpts.ajaxOptions && tableOpts.ajaxOptions.url) {
        $batch.prop("disabled", true);
      }
    },
    "page-change.bs.table": function pageChangeBsTable() {
      $batch.prop("disabled", tableOpts.sidePagination === "server" ? true : isEmptyRowData($table));
    }
  });

  // 初始化绑定的表单对话框
  if (tableOpts.__$dialog) {
    init$1(tableOpts.__$dialog, extendTarget({ $table: $table }, resolveCreateOptions(toolbarOpts).dialog));
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
function initToolbarRightGroup(toolbarOpts, tableOpts, $table, $toolbar) {
  var $group = $("<div class=\"OperationGroup u-floatRight u-hidden\" />");

  tableOpts.__$toolbar.append($group);

  tableOpts.__$right = $group;

  if (isPlainObject(toolbarOpts)) {
    // 筛选条件
    initTableSearch(toolbarOpts.search, tableOpts, $table, $toolbar);
  }

  if (tableOpts.showColumns === true) {
    initTableColumnToggle(tableOpts, $table, $toolbar);
  }

  if ($group.children().length > 0) {
    $group.removeClass("u-hidden");
  }
}

/**
 * 构造数据列表的筛选框
 *
 * @param {*} filterOpts 筛选配置项
 * @param {*} tableOpts 表格配置项
 */
function constructTableFilter(filterOpts, tableOpts) {
  if (!isPlainObject(filterOpts)) {
    filterOpts = { selector: filterOpts };
  }

  filterOpts = extendTarget(true, {}, defaults$1.table.toolbarActions.search.filter, filterOpts);

  var $filter = $(filterOpts.selector);

  if ($filter.length !== 1 || !includes(filterOpts.mode, ["dropdown", "dialog"])) {
    return "";
  }

  var filterId = generateRandomId("filter");
  var attrs = [];

  var $container = void 0;

  // 对话框模式
  if (filterOpts.mode === "dialog") {
    $container = $("<div id=\"" + filterId + "\" class=\"Table-filter--dialog modal fade\">\n        <div class=\"modal-dialog modal-" + filterOpts.dialog.size + "\">\n          <div class=\"modal-content\">\n            <div class=\"modal-header\">\n              <button type=\"button\" class=\"close\" data-dismiss=\"modal\"><span>&times;</span></button>\n              <h4 class=\"modal-title\">" + filterOpts.dialog.title + "</h4>\n            </div>\n            <div class=\"modal-body\"></div>\n            <div class=\"modal-footer\">\n              <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">\u5173\u95ED</button>\n              <button type=\"button\" class=\"btn btn-default js-resetTableFilters\">\u91CD\u7F6E</button>\n              <button type=\"button\" class=\"btn btn-primary js-executeTableFilters\">\u7B5B\u9009</button>\n            </div>\n          </div>\n        </div>\n      </div>");

    $(".modal-body", $container).append($filter);

    $("body").append($container);

    attrs.push("data-toggle=\"modal\"", "data-target=\"#" + filterId + "\"");
  }
  // 下拉模式
  else {
      $container = $("<div id=\"" + filterId + "\" class=\"Table-filter--dropdown Card u-clearfix u-hidden\">\n        <div class=\"Card-content\"></div>\n        <div class=\"Card-footer\"><button type=\"button\" class=\"btn btn-primary btn-sm js-executeTableFilters\"><i class=\"fa fa-filter\"></i><span>\u7B5B\u9009</span></button><button type=\"reset\" class=\"btn btn-default btn-sm js-resetTableFilters\"><i class=\"fa fa-refresh\"></i><span>\u91CD\u7F6E</span></button></div>\n      </div>");

      $(".Card-content", $container).append($filter);
    }

  $("select", $filter).each(function () {
    $(this).data("select2").$container.css("width", "100%");
  });

  $container.addClass("Table-filter js-showTableFilters");
  $filter.removeClass("u-hidden");

  tableOpts.__$filter = $container;

  return constructActionButton(extendTarget(resolveToolbarActionDefaults(filterOpts.button), { size: tableOpts.iconSize, attributes: attrs }));
}

/**
 * 构造数据列表的查询框
 *
 * @param {*} searchOpts 查询配置项
 * @param {*} tableOpts 表格配置项
 */
function constructTableSearch(searchOpts, tableOpts) {
  var fields = clone(searchOpts.field);

  if (isPlainObject(fields)) {
    fields = [fields];
  }

  if (!isArray(fields)) {
    return;
  }

  var selectableFields = [];
  var hiddenFields = [];

  eachItem(fields, function (field) {
    // `isHidden` 为兼容属性，后期考虑删除
    if (field.required === true || field.isHidden === true) {
      hiddenFields.push(field);
    } else {
      selectableFields.push(field);
    }
  });

  if (selectableFields.length === 0) {
    return;
  }

  var defaultField = selectableFields[0];
  var searchId = generateRandomId("search");
  var html = ["<div class=\"Table-search u-floatLeft\">", "<form class=\"input-group input-group-" + tableOpts.iconSize + "\">"];

  searchOpts.__selectable = selectableFields;

  if (selectableFields.length > 1) {
    html.push("<div class=\"input-group-btn\">", "<button class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" type=\"button\"><span>" + defaultField.text + "</span><span class=\"caret\"></span></button>", "<ul class=\"Operation-menu dropdown-menu\">", map(selectableFields, function (field) {
      return "<li><a href=\"javascript:void(0);\" data-field=\"" + field.name + "\" data-placeholder=\"" + field.placeholder + "\">" + field.text + "</a></li>";
    }).join(""), "</ul></div>");
  } else if (searchOpts.label === true) {
    html.push("<label class=\"input-group-addon\" for=\"" + searchId + "\">" + defaultField.text + "</label>");
  }

  html.push("<input id=\"" + searchId + "\" class=\"form-control\" type=\"text\" name=\"" + defaultField.name + "\" value=\"\" placeholder=\"" + (defaultField.placeholder || "") + "\">", map(hiddenFields, function (field) {
    return "<input type=\"hidden\" name=\"" + field.name + "\" value=\"" + (hasOwnProp("value", field) ? field.value : "") + "\">";
  }).join(""), "<div class=\"input-group-btn\">", "<button class=\"btn btn-default js-executeTableSearch\" type=\"submit\" title=\"查询\"><i class=\"fa fa-search fa-fw\"></i><span class=\"sr-only\">查询</span></button>", constructTableFilter(clone(searchOpts.filter), tableOpts), "</div>", "</form></div>");

  return html.join("");
}

/**
 * 计算简单查询区域宽度
 * 
 * @param {*} searchOpts 查询配置项
 * @param {*} $search 简单查询区域
 */
function calculateTableSearchWidth(searchOpts, $search) {
  var width = parseFloat(searchOpts.width, 10);

  if ($.isNumeric(width)) {
    return width;
  }

  var defaultSearchWidth = defaults$1.table.toolbarActions.search.width;

  if (defaultSearchWidth !== "auto") {
    width = parseFloat(defaultSearchWidth, 10);

    if ($.isNumeric(width)) {
      return width;
    }
  }

  var $ipt = $("[id^='search']", $search);
  var $dropdown = $(".dropdown-menu", $search);

  var field = clone(searchOpts.__selectable).sort(function (a, b) {
    return a.text.length + a.placeholder.length < b.text.length + b.placeholder.length;
  }).shift();
  var fontSize = parseFloat($ipt.css("font-size"), 10);

  width = parseFloat($ipt.css("border-left-width"), 10) + parseFloat($ipt.css("padding-left"), 10) + parseFloat($ipt.css("padding-right"), 10) + parseFloat($ipt.css("border-right-width"), 10) + field.placeholder.length * fontSize + $(".js-executeTableSearch", $search).parent().width();

  if ($dropdown.length) {
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
function initTableSearch(searchOpts, tableOpts, $table, $toolbar) {
  if (!isPlainObject(searchOpts) || $(".Table-search", $toolbar).length > 0) {
    return;
  }

  var $search = $(constructTableSearch(searchOpts, tableOpts));
  var $searchInput = $("[id^='search']", $search);
  var $filter = tableOpts.__$filter;

  tableOpts.__$search = $("form", $search);

  tableOpts.__$right.append($search);

  // 查询/筛选表单提交事件
  $("form", $search.add($filter)).on("submit", function () {
    refreshTable($table, true);

    return false;
  });

  // 选择首选查询条件
  $(".dropdown-menu a", $search).on("click", function () {
    var $a = $(this);
    var $btn = $(".dropdown-toggle", $search);

    $("span:first", $btn).text($a.text());

    $searchInput.attr({
      name: $a.attr("data-field"),
      placeholder: $a.attr("data-placeholder")
    }).val("");
  });

  if ($filter) {
    var $filterForm = $("form", $filter);
    var $searchForm = $("form", $search);

    // 下拉筛选条件
    if ($filter.hasClass("Table-filter--dropdown")) {
      $toolbar.append($filter);

      $(".js-showMoreFilters", $toolbar).on("click", function () {
        var $btn = $(this);
        var droppedCls = "is-dropped";
        var hiddenCls = "u-hidden";
        var $controls = $(".js-executeTableSearch, [id^='search']", $toolbar).add($(".dropdown-toggle", $searchForm));

        if ($btn.hasClass(droppedCls)) {
          $filter.addClass(hiddenCls);
          $btn.removeClass(droppedCls);

          $controls.prop("disabled", false);
          $filterForm.trigger("reset");

          tableOpts.__$search = $searchForm;
        } else {
          $filter.removeClass(hiddenCls);
          $btn.addClass(droppedCls);

          $controls.prop("disabled", true);
          $searchForm.trigger("reset");

          tableOpts.__$search = $filterForm;
        }

        return false;
      });

      $(".js-executeTableFilters", $filter).on("click", function () {
        $filterForm.trigger("submit");
      });
    } else if ($filter.hasClass("Table-filter--dialog")) {
      $(".js-executeTableFilters", $filter).on("click", function () {
        tableOpts.__$search = $filterForm;

        $searchForm.trigger("reset");
        $filterForm.trigger("submit");

        tableOpts.__$search = $searchForm;

        $filter.modal("hide");
      });
    }

    // 重置复杂条件查询
    $(".js-resetTableFilters", $filter).on("click", function () {
      $filterForm.trigger("reset");
    });
  }

  $search.ready(function () {
    return $search.width(calculateTableSearchWidth(searchOpts, $search));
  });
}

function constructColumnToggleButton(tableOpts) {
  var html = ["<div class=\"Table-columnToggle u-floatLeft keep-open\">"];
  var actions = [];

  eachItem(tableOpts.__tableInst.columns, function (col, idx) {
    if (!col.radio && !col.checkbox && !(tableOpts.cardView && !col.cardVisible) && col.switchable && col.field !== defaults$1.table.operationColumn.field) {
      var attrs = ["type=\"checkbox\"", "data-field=\"" + col.field + "\"", "value=\"" + idx + "\""];

      if (col.visible) {
        attrs.push("checked");
      }

      actions.push("<label><input " + attrs.join(" ") + "> " + col.title + "</label>");
    }
  });

  html.push(constructActionButton(resolveToolbarActionDefaults({
    text: "切换列状态",
    size: tableOpts.iconSize,
    icon: tableOpts.icons.columns.replace(/^fa\-/, ""),
    isCoexisted: false,
    align: "right",
    actions: actions
  })));

  html.push("</div>");

  return html.join("");
}

function initTableColumnToggle(tableOpts, $table, $toolbar) {
  var tableInst = tableOpts.__tableInst;
  var $toggle = $(constructColumnToggleButton(tableOpts));

  tableOpts.__$right.append($toggle);

  var $items = $(".Operation-menu li", $toggle);
  var $checkboxes = $(":checkbox", $toggle);

  if ($items.length <= tableOpts.minimumCountColumns) {
    $checkboxes.prop("disabled", true);
  }

  $items.on("click", function (evt) {
    evt.stopPropagation();
  });

  $checkboxes.on("change", function () {
    var $ipt = $(this);
    var checked = $ipt.prop("checked");

    tableInst.toggleColumn($ipt.val(), checked, false);
    tableInst.trigger("column-switch", $ipt.attr("data-field"), checked);
  });
}

var initBootstrapTableHeader = $.fn.bootstrapTable.Constructor.prototype.initHeader;

/**
 * 重置数据列表表头和操作列的固定状态
 * 
 * @param {*} tableInst 数据列表实例
 */
function resetTableStickyStatus(tableInst) {
  toggleTableStickyStatus$1(tableInst, false);

  if (isOperationColumnSticky(tableInst.options)) {
    var $tableBody = tableInst.$tableBody;
    var $alternatives = $(".Table-container--alternative", tableInst.$tableContainer);

    if ($tableBody.width() + $tableBody.scrollLeft() === tableInst.$el.width()) {
      $alternatives.hide();
    } else {
      $alternatives.show();
    }
  }
}

/**
 * 重写 Bootstrap Table 的初始化表头实现
 */
$.fn.bootstrapTable.Constructor.prototype.initHeader = function () {
  var tableInst = this;

  initBootstrapTableHeader.apply(tableInst, toArray$1(arguments));

  var tableOpts = tableInst.options;
  var $table = tableInst.$el;
  var $tableHeader = tableInst.$tableHeader;
  var $header = $("table", $tableHeader);

  if (tableOpts.sticky === true) {
    $header.addClass(tableOpts.classes).append(tableInst.$header.clone(true, true));

    $table.on("post-body.bs.table", function () {
      resetTableStickyStatus(tableInst);

      $header.width($table.width());

      $("th", tableInst.$header).each(function () {
        var $el = $(this);
        var $th = $("[data-field=\"" + $el.attr("data-field") + "\"]", $header);

        $th.width($el.width());
        $th.height($el.height());
      });

      $(".Table-container--alternative th", $tableHeader).width($("[data-field='" + defaults$1.table.operationColumn.field + "']", $tableHeader).width());
    });
  }
};

/**
 * 将查询字符串转换为 JSON 对象
 *
 * @param {*} str
 */
function jsonifyQueryString(str) {
  var jsonData = {};

  eachItem(str.split("&"), function (pair) {
    pair = pair.split("=");
    jsonData[pair[0]] = decodeURIComponent(pair[1]);
  });

  return jsonData;
}

function createTemporaryLinkElement(url) {
  var el = document.createElement("a");

  el.setAttribute("href", url);

  return el;
}

function generateUrlUtil(part) {
  return function (url) {
    var defaultUrl = location.href;

    if (!isString$1(url) || !/^(http(s)?\:)?\/\//i.test(url) && url.indexOf("AJAX_URL_PLACEHOLDER") === -1) {
      url = defaultUrl;
    }

    var result = createTemporaryLinkElement(url)[part];

    return includes(part, ["hash", "search"]) ? result.slice(1) : result;
  };
}

var urlSearchUtil = generateUrlUtil("search");

var href = generateUrlUtil("href");

var protocol = generateUrlUtil("protocol");

var host = generateUrlUtil("host");

var hostname = generateUrlUtil("hostname");

var port = generateUrlUtil("port");

var pathname = generateUrlUtil("pathname");

var hash = generateUrlUtil("hash");

var username = generateUrlUtil("username");

var password = generateUrlUtil("password");

var origin = generateUrlUtil("origin");

function query(url, key) {
  var defaultUrl = location.href;
  var length = arguments.length;

  if (length === 1 && isString$1(url) && url.indexOf("http") === -1) {
    key = url;
    url = defaultUrl;
  }

  if (!isString$1(url)) {
    url = defaultUrl;
  }

  var jsonified = jsonifyQueryString(urlSearchUtil(url));

  return key == null ? jsonified : jsonified[key];
}



var url = Object.freeze({
	href: href,
	protocol: protocol,
	host: host,
	hostname: hostname,
	port: port,
	pathname: pathname,
	hash: hash,
	username: username,
	password: password,
	origin: origin,
	query: query,
	search: urlSearchUtil
});

/**
 * 获取指定 URL 的文件扩展名
 * 
 * @param {*} url URL
 */
function resolveFileExtension(url) {
  var segments = pathname(url).split("\/");
  var length = segments.length;

  var fileName = segments[length - 1];

  if (fileName === "") {
    fileName = segments[length - 2];
  }

  var ext = fileName.match(/\.([^\.]+)$/);

  return ext ? ext[1].toUpperCase() : "";
}

var STORAGE_KEY = {
  IMAGE_ITEM_MAX: "muu.imageItemMax"
};

/**
 * 判断图片列的数量是否达到上限
 */
function isImageItemOverflow($btn, limit) {
  return $(".ImageItem:not(.ImageItem--add)", $btn.closest(".ImageList").parent()).length >= limit;
}

/**
 * 生成 `<figure class="ImageItem"></figure>`
 * 
 * @param {*} url 
 * @param {*} alt 
 * @param {*} removable 
 */
function generateImageItem(url, alt, removable) {
  var html = [];

  alt = alt || "";

  var ext = void 0;

  if (url && isString$1(url)) {
    ext = resolveFileExtension(url);
  }

  html.push("<figure class=\"ImageItem");

  if (url && ext && !includes(ext.toLowerCase(), defaults$1.uploader.extension.image.split(","))) {
    html.push(" is-nongraphic");
  }

  html.push("\"><div><a href=\"" + (url || "javascript:void(0);") + "\" target=\"_blank\" data-file-ext=\"" + ext + "\"><img src=\"" + (url || "") + "\" alt=\"" + alt + "\" title=\"" + alt + "\"></a></div>");

  if (alt) {
    html.push("<figcaption class=\"u-textTruncate\" title=\"" + alt + "\">" + alt + "</figcaption>");
  }

  if (removable === true) {
    html.push("<button type=\"button\" class=\"ImageItem-button fa fa-close js-removeUploadedImage\" title=\"\u5220\u9664\"><span class=\"sr-only\"></span></button>");
  }

  html.push("</figure>");

  return html.join("");
}

/**
 * 在上传图片按钮前插入图片
 * 
 * @param {*} opts 
 */
function insertImageItem(opts) {
  var $btn = $(opts.$btn);
  var maxCount = opts.max;

  // 按钮不是图片上传按钮或图片列数量已达上限时跳出
  if (!$btn.is(".ImageItem") || maxCount && isImageItemOverflow($btn, maxCount)) {
    return;
  }

  var columnCount = Number(opts.column);

  if (isNaN(columnCount) || columnCount <= 0) {
    columnCount = defaults$1.generator.imageColumnCount;
  }

  var listCls = "ImageList";
  var itemCls = "ImageList-item";

  var $btnCol = opts.$btn.closest("." + itemCls);
  var $newCol = $("<div class=\"" + itemCls + " col-sm-" + 12 / columnCount + " is-dynamic\" />");

  // 生成并在上传按钮所在列之前插入新的图片列
  $newCol.html(generateImageItem(opts.url, opts.text, opts.removable));
  $btnCol.before($newCol);

  if (isFunction(opts.callback)) {
    opts.callback.call(null, $newCol, $btnCol);
  }

  var imageItemSize = $btnCol.siblings("." + itemCls).length;

  // 当一行的图片列数量到达上限时将上传按钮插入新行
  if (imageItemSize === columnCount) {
    $("." + listCls + ":last", opts.$el).after("<div class=\"" + listCls + " row\" />");
    $("." + listCls + ":last", opts.$el).append($btnCol);
  }

  if (maxCount) {
    var $btnRow = $btnCol.closest("." + listCls);
    var hiddenCls = "u-hidden";

    $btn.data(STORAGE_KEY.IMAGE_ITEM_MAX, maxCount);

    $("." + listCls + "." + hiddenCls + ", ." + itemCls + "." + hiddenCls, $btnRow.parent()).removeClass(hiddenCls);

    // 全部图片列的数量到达上限时隐藏上传按钮
    if (isImageItemOverflow($btnRow, maxCount)) {
      $btnCol.addClass(hiddenCls);

      if (imageItemSize === 0) {
        $btnRow.addClass(hiddenCls);
      }
    }
  }

  return $newCol;
}

/**
 * 生成操作按钮
 */
function action(actions, wrapped) {
  actions = resolveTriggerOptionsSimply(actions);

  if (isPlainObject(actions)) {
    actions = [actions];
  }

  actions = actions.concat(defaults$1.table.rowActions);

  if (!isArray(actions)) {
    return false;
  }

  var html = map(actions, function (a) {
    return constructActionButton(a, { align: "right" });
  });

  if (actions.length > 1 || wrapped === true) {
    html.unshift("<div class=\"OperationGroup\">");
    html.push("</div>");
  }

  return html.join("");
}

function option() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
  var extra = arguments[2];
  var selected = arguments[3];

  var attrs = ["class=\"is-dynamic\"", "value=\"" + value + "\""];

  if (isPlainObject(extra)) {
    eachItem(extra, function (k, v) {
      attrs.push("data-" + k + "=\"" + v + "\"");
    });
  } else {
    selected = extra;
  }

  if (selected === true) {
    attrs.push("selected");
  }

  return "<option " + attrs.join(" ") + ">" + text + "</option>";
}



var generate = Object.freeze({
	action: action,
	option: option,
	image: generateImageItem,
	imageItem: insertImageItem
});

function refillImageItem($img, url) {
  var $item = $img.closest(".ImageItem");

  if ($item.length > 0) {
    var ext = void 0;

    if (isString$1(url)) {
      ext = resolveFileExtension(url);
    }

    var $link = $img.closest("a");

    if (url) {
      $link.attr("href", url);
      $item.removeClass("is-empty");

      if (ext && !includes(ext.toLowerCase(), defaults$1.uploader.extension.image.split(","))) {
        $item.addClass("is-nongraphic");
      } else {
        $item.removeClass("is-nongraphic");
      }
    } else {
      $link.attr("href", "javascript:void(0);");
      $item.addClass("is-empty");
    }

    $link.attr("data-file-ext", ext);
  }
}

function fill$1($container, data, callback) {
  if (!isPlainObject(data)) {
    return;
  }

  $("[data-field]", $container).each(function () {
    var $f = $(this);
    var val = data[$f.attr("data-field")];

    if ($f.is("img")) {
      $f.attr("src", val || "");

      refillImageItem($f, val);
    } else {
      $f.text(val || "-");
    }

    if (isFunction$1(callback)) {
      callback.apply(this, [$f.attr("data-field"), val]);
    }
  });
}

function datepicker() {
  var $picker = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $(".js-pickDate");
  var opts = arguments[1];

  $picker.each(function () {
    var _this = this;

    var $p = $(this);
    var $ipt = $("[name=\"" + $p.attr("data-to") + "\"]", $p.closest("form"));

    $p.datepicker(extendTarget({
      language: "zh-CN",
      autohide: true
    }, $ipt.length ? {
      pick: function pick() {
        $ipt.val(moment($(_this).datepicker("getDate")).format());
      }
    } : null, opts));

    if ($ipt.length) {
      $p.on("change", function () {
        if ($(this).val() === "") {
          $ipt.val("");
        }
      });
    }
  });
}

function datetimepicker($picker) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (isPlainObject($picker)) {
    opts = $picker;
    $picker = null;
  }

  $picker = $picker == null ? $(".js-pickDateTime") : $($picker);
  opts = clone(opts);

  $picker.each(function () {
    var $p = $(this);

    // 时间段
    if ($p.is(".js-pickDatePeriod")) {
      var selector = "input:not([type='hidden'])";
      var $ipts = $(selector, $p);

      if ($ipts.length === 2) {
        $ipts.each(function (idx) {
          var $ipt = $(this);

          var method = void 0;

          if (idx === 0) {
            method = "minDate";
          } else {
            method = "maxDate";
            // 请看 https://github.com/Eonasdan/bootstrap-datetimepicker/issues/1075
            opts.useCurrent = false;
          }

          $ipt.datetimepicker(opts).on("dp.change", function (evt) {
            var $dt = $(this);
            var date = evt.date;

            $dt.siblings(selector).data("DateTimePicker")[method](date);
            $("input[name='" + $dt.attr("data-to") + "']", $dt.closest("form")).val(moment(date).format());
          });
        });
      }
    }
    // 时间点
    else {
        $p.datetimepicker(opts);
      }
  });
}

var field = Object.freeze({
	fill: fill$1,
	datepicker: datepicker,
	datetimepicker: datetimepicker
});

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
function constructOperationColumn(col, opts) {
  var actions = opts.actions;
  var events = {};

  var formatter = void 0;

  if (opts.width) {
    col.width = opts.width;
  }

  if (isFunction$1(opts.formatter)) {
    formatter = opts.formatter;
  } else if (isFunction$1(actions)) {
    formatter = function formatter(val, row, idx) {
      return action(actions.apply(this, [row, idx]));
    };
  } else if (isArray(actions) && actions.length > 0) {
    var btns = [];

    eachItem(actions, function (btn) {
      btn = resolveTriggerOptionsSimply(btn);

      if (isPlainObject(btn)) {
        btn = resolveTriggerOptions(btn);

        if (isString$1(btn.action) && isFunction$1(btn.handler)) {
          var handler = btn.handler;

          events["click .js-" + btn.action] = function (evt, val, row, idx) {
            var returnValue = handler.apply(this, [evt, row, idx]);

            evt.stopPropagation();

            return returnValue;
          };

          delete btn.handler;
        }

        btns.push(btn);
      }
    });

    formatter = function formatter(val, row, idx) {
      var ctx = this;

      return action(map(btns, function (btn) {
        btn = clone(btn);

        if (isFunction$1(btn.text)) {
          btn.text = btn.text.apply(ctx, [row, idx]);
        }

        return btn;
      }));
    };
  }

  col.__muuAjaxOpts = opts.ajax;
  col.formatter = formatter;
  col.events = extendTarget(true, {}, opts.events, events);

  return col;
}

/**
 * 获取处理后的列配置项
 *
 * @param {*} tableOpts 表格配置项
 */
function resolveOperationColumn(tableOpts) {
  var cols = tableOpts.columns;
  var opts = tableOpts.operation;
  var defaultOpts = clone(defaults$1.table.operationColumn);
  var newCols = [];

  var hasCheckboxOpt = false;
  var col = void 0;

  if (isArray(cols)) {
    eachItem(cols, function (c) {
      if (hasOwnProp("checkbox", c)) {
        hasCheckboxOpt = true;
      }

      if (c.field === defaultOpts.field) {
        tableOpts.__operationDefinedByColumns = true;

        col = c;
      } else {
        newCols.push(c);
      }
    });
  }

  // 没明确指定需要带有复选框且有批量操作配置项时添加复选框列
  if (!hasCheckboxOpt && isPlainObject(tableOpts.toolbar) && hasOwnProp("batch", tableOpts.toolbar)) {
    newCols.unshift({ checkbox: true });
  }

  if (col) {
    if (!col.title) {
      col.title = defaultOpts.text;
    }
  } else if (isPlainObject(opts)) {
    col = constructOperationColumn({ title: defaultOpts.text, field: defaultOpts.field }, opts);
  }

  return newCols.concat(col ? extendTarget(true, { events: defaultOpts.events }, col) : []);
}

function resolveTableClass(slim) {
  var classes = defaults$1.table.classes;

  if (slim === true) {
    classes = classes.split(" ").concat("Table--slim").join(" ");
  }

  return classes;
}

/**
 * 处理数据表格列配置项中的自定义属性
 *
 * {
 *   viewDetail: {
 *     url: "",
 *     params: function( val, row ) {},
 *     handler: function( val, row, result, $modal ) {}
 *   }
 * }
 *
 * {
 *   dateTimeFormatter: "" / true / function( val ) {}
 * }
 */
function resolveColumnOptions(cols, showRowNumber) {
  var temp = isArray(cols) ? cols.concat([]) : [];

  if ($.type(showRowNumber) !== "boolean") {
    showRowNumber = defaults$1.table.showRowNumber;
  }

  if (showRowNumber === true) {
    temp.unshift({
      field: "serialNumber",
      title: "序号",
      align: "center",
      formatter: function formatter(val, row, idx) {
        return ++idx;
      }
    });
  }

  return map(temp, function (col) {
    var viewDetailOpts = col.viewDetail;
    var rawFormatter = col.formatter;

    var dateTimeFormatter = col.dateTimeFormatter;

    // 打开查看详情对话框
    if (isPlainObject(viewDetailOpts)) {
      col.formatter = function (val) {
        if (isFunction$1(rawFormatter)) {
          val = rawFormatter.apply(this, toArray$1(arguments));
        }

        return "<a href=\"javascript:void(0);\" class=\"js-openDetailDialog\">" + (val || "-") + "</a>";
      };

      col.events = extendTarget({}, col.events, {
        "click .js-openDetailDialog": function clickJsOpenDetailDialog(evt, val, row) {
          ajaxGet(viewDetailOpts.url, viewDetailOpts.params(val, row), function (result) {
            var $m = $(".js-viewDetail");

            if (isFunction$1(viewDetailOpts.handler)) {
              viewDetailOpts.handler.apply(null, [val, row, result, $m]);
            } else {
              fill$1($m, result);
            }

            $m.modal("show");
          });

          evt.stopPropagation();
        }
      });
    }
    // 日期时间格式转换
    else if (dateTimeFormatter) {
        col.formatter = function (val) {
          if (dateTimeFormatter === true) {
            dateTimeFormatter = "YYYY-MM-DD HH:mm:ss";
          }

          return isString$1(dateTimeFormatter) && moment ? moment(val).format(dateTimeFormatter) : isFunction$1(dateTimeFormatter) ? dateTimeFormatter.call(this, val) : val;
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
function resolveTableOptions(opts) {
  var url = opts.url,
      ajaxOptions = opts.ajaxOptions;


  ajaxOptions = extendTarget(true, {}, $.fn.bootstrapTable.defaults.ajaxOptions, ajaxOptions);
  opts.columns = resolveColumnOptions(resolveOperationColumn(opts), opts.showRowNumber);

  if (!url) {
    url = ajaxOptions.url;
    delete ajaxOptions.url;
  }

  if (isFunction$1(url)) {
    var beforeSend = ajaxOptions.beforeSend;
    var urlMaker = url;

    // 仅起到占位符作用
    // 实际请求的 URL 是下面 `ajaxOptions.beforeSend` 里拼装的
    url = "AJAX_URL_PLACEHOLDER";

    ajaxOptions.beforeSend = function (jqXHR, ajaxSettings) {
      ajaxSettings.url = urlMaker(jsonifyQueryString(ajaxSettings.data || urlSearchUtil(ajaxSettings.url)));

      if (isFunction$1(beforeSend)) {
        return beforeSend.apply(null, [jqXHR, ajaxSettings]);
      }
    };
  }

  opts.slim = hasOwnProp("slim", opts) ? opts.slim === true : defaults$1.table.slim;
  opts.classes = resolveTableClass(opts.slim);

  if (isPlainObject(opts.operation) && !hasOwnProp("sticky", opts.operation)) {
    opts.operation.sticky = opts.slim ? true : defaults$1.table.operationColumn.sticky;
  }

  // 「瘦身」的数据表格
  if (opts.slim) {
    // 没指定 `sticky` 配置项则默认开启
    if (!hasOwnProp("sticky", opts)) {
      opts.sticky = true;
    }

    // 支持列宽度控制
    opts.columns = map(opts.columns, function (col) {
      if (hasOwnProp("width", col)) {
        var colWidth = col.width;
        var rawFormatter = col.formatter;

        col.formatter = function (val) {
          var width = "auto";
          var content = val;

          if ($.isNumeric(colWidth)) {
            width = colWidth + "px";
          } else if (isString$1(colWidth) && /^\d+(\.\d+)?(px|em|rem|%)$/.test(colWidth)) {
            width = colWidth;
          }

          if (isFunction$1(rawFormatter)) {
            content = rawFormatter.apply(this, toArray$1(arguments));
          }

          if (content == null) {
            content = hasOwnProp("undefinedText", opts) ? opts.undefinedText : $.fn.bootstrapTable.defaults.undefinedText;
          }

          return "<div style=\"width: " + width + "; white-space: normal; word-break: break-all;\">" + content + "</div>";
        };
      }

      return col;
    });
  } else if (opts.operation) {
    opts.operation.sticky = false;
  }

  return extendTarget(true, opts, { url: url, ajaxOptions: ajaxOptions });
}

/**
 * 重设数据列表容器大小
 * 
 * @param {*} evt 事件对象实例
 */
function resizeTableContainer(evt) {
  var _evt$data = evt.data,
      stickyOpts = _evt$data.stickyOpts,
      tableInst = _evt$data.tableInst;

  var headerHeight = $(".Page-header").outerHeight();

  toggleTableStickyStatus(tableInst, evt.data.$container.offset().top - headerHeight <= stickyOpts.top, document.documentElement.clientHeight - headerHeight - stickyOpts.top - tableInst.$toolbar.outerHeight() - tableInst.$pagination.outerHeight());
}

function scrollFakeTableHeader(evt) {
  var tableInst = evt.data.tableInst;

  var $tableBody = $(this);
  var scrollLeft = $tableBody.scrollLeft();
  var selector = ".Table-container--alternative";

  $("> table", tableInst.$tableHeader).css("margin-left", "-" + scrollLeft + "px");

  if (isOperationColumnSticky(tableInst.options) && tableInst.$tableContainer.hasClass("is-sticky")) {
    $(selector, tableInst.$tableBody).css("margin-right", tableInst.$tableContainer.hasClass("is-sticky") ? "-" + scrollLeft + "px" : 0);
  }

  var $alternatives = $(selector, tableInst.$tableContainer);

  if ($tableBody.width() + scrollLeft === tableInst.$el.width()) {
    $alternatives.hide();
  } else {
    $alternatives.show();
  }
}

/**
 * 初始化固定的数据列表
 * 
 * @param {*} $table 数据列表
 * @param {*} stickyOpts 配置项
 */
function initStickyTable($table, stickyOpts) {
  var tableInst = $table.data("bootstrap.table");
  var $container = tableInst.$container;

  if ($container.closest(".modal").length > 0) {
    return;
  }

  var tableId = $container.attr("id");

  $(window).on("resize." + tableId, { $container: $container, tableInst: tableInst, stickyOpts: stickyOpts }, resizeTableContainer);
  $(".Page-content").on("scroll." + tableId, { $container: $container, tableInst: tableInst, stickyOpts: stickyOpts }, resizeTableContainer);
}

function constructStickyColumn(evt) {
  var $table = $(this);

  var tableInst = $table.data("bootstrap.table");

  if (!tableInst) {
    return;
  }

  var columnField = defaults$1.table.operationColumn.field;

  var $tableHeader = tableInst.$tableHeader;
  var $tableBody = tableInst.$tableBody;
  var $column = $("[data-field='" + columnField + "']", $table);

  var columnIndex = $("thead th", $table).index($column);
  var cls = "Table-container--alternative";

  if (tableInst.options.sticky && $("." + cls, $tableHeader).length === 0) {
    $tableHeader.append("<div class=\"" + cls + "\"><table><thead><tr></tr></thead></table></div>").find("." + cls + " tr").append($("[data-field='" + columnField + "']", $tableHeader).clone());
  }

  if ($("." + cls, $tableBody).length === 0) {
    var classes = filter(tableInst.options.classes.split(" "), function (c) {
      return c !== "table-hover";
    });

    $tableBody.append("<div class=\"" + cls + "\"><table class=\"" + classes.join(" ") + "\"><thead><tr></tr></thead><tbody></tbody></table></div>");
  }

  var $tableAlternative = $("." + cls + " table", $tableBody);
  var $tbodyRowsCopy = tableInst.$body.children().clone(true, true);

  $tbodyRowsCopy.each(function (idx) {
    var $row = $(this);
    var $cell = $("tr:eq(" + idx + ") td:eq(" + columnIndex + ")", tableInst.$body);
    var $cellCopy = $("td:eq(" + columnIndex + ")", $row);

    $cellCopy.width($cell.outerWidth());
    $cellCopy.height($cell.outerHeight());

    $("td:lt(" + columnIndex + ")", $row).remove();
  });

  $("thead tr", $tableAlternative).empty().append($column.clone(true, true));
  $("tbody", $tableAlternative).empty().append($tbodyRowsCopy);

  $tableAlternative.data("bootstrap.table", tableInst);
}

/**
 * 初始化数据表格
 *
 * opts 的结构为：
 * {
 *   url: "",
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
function init$2($table, opts) {
  if (isPlainObject($table)) {
    opts = $table;
    $table = null;
  }

  if (!$table) {
    $table = getDefaultTable();
  }

  opts = resolveTableOptions(opts);

  if (isOperationColumnSticky(opts)) {
    $table.on("post-body.bs.table", constructStickyColumn);
  }

  $table.on({
    "post-body.bs.table": function postBodyBsTable() {
      initBootstrapTooltip($("[title]", $table));
    },
    "reset-view.bs.table \
      refresh-options.bs.table \
      refresh.bs.table": function resetViewBsTableRefreshOptionsBsTableRefreshBsTable() {
      $("[title]", $table).tooltip("destroy");
    }
  });

  var _opts = opts,
      lazy = _opts.lazy,
      url = _opts.url,
      sticky = _opts.sticky;


  if (lazy === true) {
    delete opts.lazy;
    delete opts.url;
  }

  $table.bootstrapTable(opts);

  var tableId = generateRandomId("table");
  var tableInst = $table.data("bootstrap.table");

  tableInst.$container.attr("id", tableId);

  if (lazy === true) {
    tableInst.options.url = url;
  }

  if (opts.slim) {
    tableInst.$tableBody.on("scroll." + tableId, { tableInst: tableInst }, scrollFakeTableHeader);
  }

  if (sticky) {
    var defaultStickyOpts = { top: 15 };

    var stickyOpts = void 0;

    if (sticky === true) {
      stickyOpts = defaultStickyOpts;
    } else if (isPlainObject(sticky)) {
      stickyOpts = extendTarget(true, defaultStickyOpts, sticky);
    }

    if (isPlainObject(stickyOpts)) {
      initStickyTable($table, stickyOpts);
    }
  }
}



var table = Object.freeze({
	init: init$2,
	columns: resolveColumnOptions,
	refresh: refreshTable
});

function getMoveDigit(a, b) {
  var _a = void 0,
      _b = void 0,
      la = void 0,
      lb = void 0;

  a = a.toString(10);
  b = b.toString(10);

  _a = a.split(".");
  _b = b.split(".");

  la = _a.length === 2 ? _a[1].length : 0;
  lb = _b.length === 2 ? _b[1].length : 0;

  return Math.max(la, lb);
}

function move2Right(num, digit) {
  var str = void 0,
      _num = void 0;

  if (digit === 0) {
    return num;
  }

  num = num.toString(10);
  _num = num.split(".");
  str = _num[1] ? _num[1] : "";
  _num = _num[0];

  for (var i = 0; i < digit; i++) {
    _num += str[i] ? str[i] : "0";
  }

  return _num * 1;
}

function move2Left(num, digit) {
  if (digit === 0) {
    return num;
  }

  var arr = void 0,
      len = void 0;

  num = num.toString();
  arr = num.split(".");

  if (arr.length === 2) {
    digit += arr[1].length;
    num = num.replace(".", "");
  }

  arr = num.split("");
  len = num.length;

  for (var i = 0; i < digit - len; i++) {
    arr.unshift("0");
  }

  arr.splice(arr.length - digit, 0, ".");

  return arr.join("") * 1;
}

function plus(a, b) {
  var d = getMoveDigit(a, b);

  return move2Left(move2Right(a, d) + move2Right(b, d), d);
}

function minus(a, b) {
  var d = getMoveDigit(a, b);

  return move2Left(move2Right(a, d) - move2Right(b, d), d);
}

function multiply(a, b) {
  var d = getMoveDigit(a, b);

  return move2Left(move2Right(a, d) * move2Right(b, d), d * 2);
}

function divided(a, b) {
  var d = getMoveDigit(a, b);

  return move2Left(move2Right(a, d) / move2Right(b, d), d);
}



var calculate = Object.freeze({
	getMoveDigit: getMoveDigit,
	move2Right: move2Right,
	move2Left: move2Left,
	plus: plus,
	minus: minus,
	multiply: multiply,
	divided: divided
});

/**
 * 过滤掉不在排除列表之内的未修改数据
 *
 * @param data
 * @param raw
 * @param excluded
 * @returns {{}}
 */
function filterUnchanged(data, raw, excluded) {
  var filtered = {};

  if (isPlainObject(data)) {
    if (isPlainObject(raw)) {
      if (!isArray(excluded)) {
        excluded = [];
      }

      eachItem(data, function (k, v) {
        if (excluded.length > 0 && includes(k, excluded) || v !== raw[k]) {
          filtered[k] = v;
        }
      });
    } else {
      filtered = data;
    }
  }

  return filtered;
}



var data = Object.freeze({
	changed: filterUnchanged
});

var MAP = {
  GAODE: "gaode",
  BAIDU: "baidu"
};

var availableMaps = map(keys(MAP), function (k) {
  return MAP[k];
});

/**
 * 获取处理后的坐标信息
 * 
 * @param {*} coord 坐标
 * @param {*} defaultName 默认地名
 */
function resolveGeoCoordinate(coord, defaultName) {
  if (isPlainObject(coord) && isString$1(coord.longitude) && isString$1(coord.latitude)) {
    return extendTarget({ name: defaultName }, coord);
  } else if (!isString$1(coord)) {
    return null;
  }

  coord = coord.split(",");

  if (coord.length === 1) {
    return null;
  }

  return {
    longitude: coord[0],
    latitude: coord[1],
    name: coord[2] || defaultName
  };
}

/**
 * 获取路线规划
 * 
 * @param {*} from 起始地信息
 * @param {*} to 目的地信息
 * @param {*} map 地图服务提供商
 */
function resolveRoutePlan(from, to, map$$1) {
  if (arguments.length === 1) {
    if (!isPlainObject(from) || !hasOwnProp("from", from) || !hasOwnProp("to", from)) {
      return "";
    }

    if (hasOwnProp("map", from)) {
      map$$1 = from.map;
    }

    to = from.to;
    from = from.from;
  }

  if (!includes(map$$1, availableMaps)) {
    return "";
  }

  from = resolveGeoCoordinate(from, "起始地");
  to = resolveGeoCoordinate(to, "目的地");

  if (!isPlainObject(from) || !isPlainObject(to)) {
    return "";
  }

  var src = location.href;

  // 高德地图（可唤起客户端）
  if (map$$1 === MAP.GAODE) {
    return "http://uri.amap.com/navigation?from=" + from.longitude + "," + from.latitude + "," + from.name + "&to=" + to.longitude + "," + to.latitude + "," + to.name + "&via=&mode=car&policy=0&src=" + src + "&coordinate=gaode&callnative=1";
  }
  // 百度地图（无法唤起客户端）
  else if (map$$1 === MAP.BAIDU) {
      return "http://api.map.baidu.com/direction?origin=latlng:" + from.latitude + "," + from.longitude + "|name:" + from.name + "&destination=latlng:" + to.latitude + "," + to.longitude + "|name:" + to.name + "&mode=driving&origin_region=" + from.name + "&destination_region=" + to.name + "&output=html&src=" + src;
    }
}



var lbs = Object.freeze({
	route: resolveRoutePlan
});

var NOTIFICATION_STORAGE_KEY = "MUU:NotificationCount";
var noticeLayerTypes = ["info", "success", "warning", "danger"];

var noticeTotalCount = 0;

/**
 * 判断是否已获得用户的桌面通知授权
 *
 * @param {*} permission 用户授权字符串
 */
function isPermissionGranted(permission) {
  return permission === "granted";
}

/**
 * 新建桌面通知
 *
 * @param {*} opts
 */
function spawnNotification(opts) {
  var copy = clone(opts);
  var events = ["click", "error", "close", "show"];

  delete opts.title;

  // 删除自定义事件参数
  eachItem(events, function (evtName) {
    delete opts["on" + capitalize(evtName)];
  });

  var notification = new Notification(copy.title, opts);

  // 绑定事件
  eachItem(events, function (evtName) {
    var handler = copy["on" + capitalize(evtName)];

    if (isFunction$1(handler)) {
      notification["on" + evtName] = handler;
    }
  });

  return notification;
}

function resolveCounterDom() {
  var $notice = $(".Action--notification");

  if ($notice.length === 0) {
    return;
  }

  var $counter = $(".Notification-counter", $notice);

  if ($counter.length === 0) {
    $counter = $("<span class=\"Notification-counter\"></span>");

    $(".Action-trigger", $notice).append($counter);
  }

  return $counter;
}

function resetNotificationCounter() {
  var $counter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : resolveCounterDom();

  noticeTotalCount = 0;

  if ($counter) {
    $counter.remove();
  }

  if (supportLocalStorage()) {
    localStorage.removeItem(NOTIFICATION_STORAGE_KEY);
  }
}

function countNotification(count) {
  noticeTotalCount += count;

  var $counter = resolveCounterDom();

  if (noticeTotalCount === 0) {
    resetNotificationCounter($counter);
  } else {
    if ($counter) {
      $counter.text(noticeTotalCount > 99 ? "99+" : noticeTotalCount);
    }

    if (supportLocalStorage()) {
      localStorage.setItem(NOTIFICATION_STORAGE_KEY, noticeTotalCount);
    }
  }
}

function showNoticeLayer(text, type, forceOver) {
  var opts = defaults$1.notification.layer;

  var $layer = $(".Page-body > .Layer--notice");
  var cls = [];

  if ($layer.length === 0) {
    cls.push("Layer--notice");

    if (opts.size !== "normal" && includes(opts.size, ["medium", "large"])) {
      cls.push("is-" + opts.size);
    }

    $layer = $("<div class=\"" + cls.join(" ") + "\"><i class=\"fa fa-fw\"></i><span></span></div>");

    if (opts.alignClasses[opts.align]) {
      $layer.addClass(opts.alignClasses[opts.align]);
    }

    $(".Page-body").prepend($layer);

    $layer.on("webkitAnimationEnd animationend", function () {
      $layer.removeClass("is-shown");
    });
  } else {
    $layer.removeClass(map(["bg", "text"], function (p) {
      return map(noticeLayerTypes, function (t) {
        return p + "-" + t;
      });
    }).concat("is-shown", "is-over").join(" "));

    $(".fa", $layer).removeClass(map(noticeLayerTypes, function (t) {
      return opts.icons[t];
    }).join(" "));
  }

  if (!includes(type, noticeLayerTypes)) {
    type = "info";
  }

  $(".fa", $layer).addClass(opts.icons[type]);
  $("span", $layer).html(text);

  cls = ["bg-" + type, "text-" + type, "is-shown"];

  if (forceOver === true || $(".modal:visible").length) {
    cls.push("is-over");
  }

  $layer.addClass(cls.join(" "));
}

function generateNoticeUtil(type) {
  return function (text, forceOver) {
    return showNoticeLayer(text, type, forceOver);
  };
}

var info = generateNoticeUtil("info");

var success = generateNoticeUtil("success");

var warning = generateNoticeUtil("warning");

var danger = generateNoticeUtil("danger");

function show(opts) {
  if (isString(opts)) {
    opts = { title: opts };
  }

  if (!(supportWebNotification() && isPlainObject(opts) && hasOwnProp("title", opts))) {
    return;
  }

  var notification = void 0;

  if (isPermissionGranted(Notification.permission)) {
    notification = spawnNotification(opts);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      if (isPermissionGranted(permission)) {
        spawnNotification(opts);
      }
    });
  }

  return notification;
}

function count(count) {
  if ($.isNumeric(count) && (count * 1 > 0 || noticeTotalCount !== 0)) {
    countNotification(count * 1);
  }

  return noticeTotalCount;
}

function clear() {
  resetNotificationCounter();
}

var notice = Object.freeze({
	info: info,
	success: success,
	warning: warning,
	danger: danger,
	show: show,
	count: count,
	clear: clear
});

function copyText(content) {
  var ipt = document.createElement("input");

  ipt.setAttribute("value", content);
  document.body.appendChild(ipt);
  ipt.select();
  document.execCommand("copy");
  document.body.removeChild(ipt);

  return content;
}

function copy(content, keepSelected) {
  var $el = void 0;

  if (!isString$1(content)) {
    $el = $(content);

    var el = $el.get(0);

    if (el == null || el.nodeType !== 1) {
      return;
    }

    if (includes(el.tagName.toLowerCase(), ["input", "textarea"])) {
      content = $el.val();
    } else {
      content = $el.text();
    }
  }

  copyText(content);

  // 将被复制文本的区域保持选中状态
  if ($el && keepSelected === true) {
    $el.select();
  }

  return content;
}

var text = Object.freeze({
	copy: copy
});

function setImageItemUrl($item, url) {
  $("a", $item).attr({ "href": url || "javascript:void(0);", "data-file-ext": resolveFileExtension(url) });
  $("img", $item).attr("src", url);
}

/**
 * 为保证事件处理的顺序正常
 * 而将七牛上传中 `init` 参数传进来的
 * 在本插件中已封装处理的事件暂存
 */
function stashQiniuUploaderEvents(evts) {
  var result = {
    qiniu: {},
    stashed: {}
  };

  if (evts) {
    eachItem(["FilesAdded", "BeforeUpload", "FileUploaded"], function (name) {
      if (isFunction$1(evts[name])) {
        result.stashed[name] = evts[name];

        delete evts[name];
      }
    });
  }

  result.qiniu = evts;

  return result;
}

function resolveUploader(settings, opts) {
  settings = extendTarget(true, { multi_selection: false }, settings);

  var isDynamicUrl = isFunction$1(settings.url);

  if (isDynamicUrl) {
    settings.url = "dynamicUrlPlaceholder";
  }

  var uploader = void 0;

  // 七牛上传插件
  if (settings.uptoken) {
    if (!settings.runtimes) {
      settings.runtimes = "html5,flash,html4";
    }

    var processed = stashQiniuUploaderEvents(settings.init);

    settings.init = processed.qiniu;

    uploader = Qiniu.uploader(settings);

    uploader.__muu = processed.stashed;

    uploader.bind("FileUploaded", function (up, file, result) {
      setImageItemUrl($("[data-file-id=\"" + file.id + "\"]"), "" + up.getOption("domain") + JSON.parse(result.response).key);
    });
  } else {
    uploader = new plupload.Uploader(settings);

    uploader.bind("FileUploaded", function (up, file, result) {
      if (isFunction$1(opts.getImageUrl)) {
        setImageItemUrl($("[data-file-id=\"" + file.id + "\"]"), opts.getImageUrl(JSON.parse(result.response)));
      }
    });

    uploader.init();
  }

  uploader.bind("FilesAdded", function (up, files) {
    if (isDynamicUrl) {
      uploader.setOption("url", settings.url());
    }
  });

  uploader.bind("BeforeUpload", function (up, file) {
    $("[data-file-id=\"" + file.id + "\"]").addClass("is-uploading");
  });

  uploader.bind("FileUploaded", function (up, file) {
    var $item = $("[data-file-id=\"" + file.id + "\"]");

    $item.removeClass("is-uploading");

    if (/^image\/[^\/]+/gi.test(file.type)) {
      $item.removeClass("is-nongraphic");
    } else {
      $item.addClass("is-nongraphic");
    }
  });

  return uploader;
}

function initSingleImageUploader(settings, opts) {
  var uploader = resolveUploader(settings, opts);

  uploader.bind("FilesAdded", function (up, files) {
    var $item = $(settings.browse_button).siblings(".ImageItem");
    var file = files[0];

    setImageItemUrl($item, "");

    $item.removeClass("is-empty").attr("data-file-id", file.id);
  });

  return uploader;
}

function initMultipleImageUploader(settings, opts) {
  var uploader = resolveUploader(settings, opts);

  uploader.bind("FilesAdded", function (up, files) {
    var $btn = $(settings.browse_button);
    var $el = $btn.closest(".ImageList").parent();

    eachItem(files, function (file) {
      insertImageItem({
        $btn: $btn,
        $el: $el,
        text: file.name,
        column: opts.column,
        max: opts.limit,
        removable: true,
        callback: function callback($newCol, $btnCol) {
          $(".ImageItem", $newCol).attr("data-file-id", file.id);

          if (isFunction$1(opts.imageItemAdded)) {
            opts.imageItemAdded.call(null, $newCol, $btnCol);
          }
        }
      });
    });
  });

  return uploader;
}

/**
 * opts:
 *  limit: 0,
 *  column: 3,
 *  draggable: true,
 *  imageItemAdded: function() { },
 *  getImageUrl: function( res ) { }
 *  settings: null
 */
function image($btn, opts) {
  var initializer = void 0,
      uploader = void 0;

  $btn = $($btn);
  opts = extendTarget(true, {
    limit: defaults$1.uploader.limit,
    draggable: defaults$1.uploader.draggable,
    // Settings for Plupload
    settings: null
  }, opts);

  if (isPlainObject(opts.settings)) {
    var defaultSettings = {
      browse_button: $btn.get(0),
      filters: {
        mime_types: [{
          title: "图片文件",
          extensions: defaults$1.uploader.extension.image
        }]
      }
    };

    if (opts.draggable === true) {
      defaultSettings.drop_element = $btn.get(0);
    }

    if ($btn.siblings(".ImageItem").length > 0) {
      initializer = initSingleImageUploader;
      opts.settings.multi_selection = false;
    } else {
      initializer = initMultipleImageUploader;
    }

    uploader = initializer(extendTarget(true, defaultSettings, opts.settings), opts);

    if (hasOwnProp("__muu", uploader)) {
      eachItem(keys(uploader.__muu), function (name) {
        uploader.bind(name, uploader.__muu[name]);
      });

      delete uploader.__muu;
    }
  }

  return uploader;
}

var upload = Object.freeze({
	image: image
});

var defaults$2 = {
  id: "watermark",
  preventTamper: false,
  width: 140,
  height: 100,
  text: "watermark",
  font: "20px Sans-serif",
  rotate: Math.PI / 180 * 30,
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
  }
};

function getElementById(id) {
  document.getElementById(id.indexOf("#") === 0 ? id.substring(1) : id);
}

function createNewElement(tagName) {
  return document.createElement(tagName);
}

function generateDataUrl(opts) {
  var canvas = createNewElement("canvas");

  canvas.width = opts.width;
  canvas.height = opts.height;

  var ctx = canvas.getContext("2d");

  // X 轴阴影距离，负值表示往上，正值表示往下
  ctx.shadowOffsetX = opts.shadow.offsetX;
  // Y 轴阴影距离，负值表示往左，正值表示往右
  ctx.shadowOffsetY = opts.shadow.offsetX;
  // 阴影的模糊程度
  ctx.shadowBlur = opts.shadow.offsetX;
  // 阴影颜色
  // ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
  ctx.font = opts.font;
  ctx.fillStyle = "rgba(204, 204, 204, 0.45)";
  ctx.rotate(opts.rotate);
  ctx.translate(opts.translateX, opts.translateY);
  ctx.textAlign = "left";
  // 实体文字
  ctx.fillText(opts.text, 35, 32);

  return canvas.toDataURL("image/png");
}

function resolveStyleText(opts) {
  var rules = [];

  eachItem(opts, function (v, k) {
    return rules.push(k + ": " + v + ";");
  });

  return rules.join(" ");
}

function createWatermarkContainer(opts) {
  var url = generateDataUrl(opts);
  var old = getElementById(opts.id);
  var div = old || createNewElement("div");

  div.id = opts.id;

  var parentEl = opts.preventTamper === true ? document.body : opts.container || document.body;

  if (isString$1(parentEl)) {
    parentEl = getElementById(parentEl);
  }

  var rect = parentEl.getBoundingClientRect();

  opts.style.left = (isNumber(opts.left) ? opts.left : rect.left) + "px";
  opts.style.top = (isNumber(opts.top) ? opts.top : rect.top) + "px";

  div.style.cssText = resolveStyleText(opts.style);
  div.setAttribute("class", "");

  div.style.background = "url(" + url + ") repeat top left";

  !old && parentEl.appendChild(div);

  return div;
}

function init$3(opts) {
  opts = extendTarget(true, {}, defaults$2, opts);

  if (isFunction$1(opts.container)) {
    opts.container = opts.container.call(null);
  }

  return createWatermarkContainer(opts);
}

function watermark(opts) {
  if (!supportPointerEvents()) {
    return;
  }

  opts = extendTarget(true, {}, defaults$1.watermark, { id: generateRandomId("watermark") }, opts);

  if (opts.mainOnly !== false) {
    opts.style["z-index"] = 9999;
  }

  return init$3(opts);
}

window.muu = {
  setDefaults: setDefaults, set: setData, get: getData, alert: alertMessage, $el: $el,
  ajax: ajax, socket: socket,
  table: table, dialog: dialog, form: form, field: field, select: select,
  generate: generate, text: text, calculate: calculate,
  data: data, upload: upload, url: url, lbs: lbs, notice: notice,
  encrypt: { watermark: watermark }
};

})));
