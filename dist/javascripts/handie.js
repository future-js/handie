;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.handie = factory();
  }
}(this, function() {
"use strict";

var defaults = {};
var utils = {};
var SUPPORTS = {
  BS_MODAL: $.fn.hasOwnProperty("modal"),
  BS_TABLE: $.fn.hasOwnProperty("bootstrapTable"),
  SELECT2: $.fn.hasOwnProperty("select2"),
  H5FX: window.hasOwnProperty("H5F"),
  MOMENTJS: window.hasOwnProperty("moment")
};

utils.setDefaults = function (settings) {
  $.extend(true, defaults, settings);
};

utils.$el = {
  triggerType: function triggerType($el) {
    return $el.attr("class").match(/js\-([a-zA-Z]+)/)[1];
  }
};

defaults.ajax = {
  errorHandler: function errorHandler(evt, req, settings, err) {
    var code = req.status;

    if (code >= 500) {
      alert("服务器开小差啦～");
    } else if (code >= 400) {
      alert(req.responseText);
    }
  },
  responseHandler: function responseHandler(res, callback) {
    callback(null, res);
  }
};

/**
 * 重置请求等待状态
 */
function resetWaitStatus() {
  var $layer = $(".modal:visible .js-waitForResult:visible");

  if ($layer.size()) {
    $layer.hide();
    $("button", $(".modal-header, .modal-footer", $layer.closest(".modal"))).prop("disabled", false);
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
 * @returns {*}
 */
function httpReq(url, method, params, callback, isJson) {
  var ajaxOpts = {
    url: url,
    type: method,
    success: function success(res) {
      resetWaitStatus();

      utils.ajax.result(res, function (result) {
        if ($.isFunction(callback)) {
          callback.call(null, result, res);
        }
      });
    }
  };

  if (isJson === true) {
    ajaxOpts.data = JSON.stringify(params);
    ajaxOpts.contentType = "application/json; charset=UTF-8";
  } else {
    if (["get", "delete"].includes(method)) {
      ajaxOpts.url += "?" + Object.keys(params).map(function (k) {
        return k + "=" + encodeURIComponent(params[k]);
      }).join("&");
    } else {
      ajaxOpts.data = params;
    }
  }

  return $.ajax(ajaxOpts);
}

utils.ajax = {
  get: function get(url, params, callback) {
    if ($.isFunction(params)) {
      callback = params;
      params = {};
    }

    return $.getJSON(url, params, function (res) {
      resetWaitStatus();

      utils.ajax.result(res, function (result) {
        if ($.isFunction(callback)) {
          callback.call(null, result, res);
        }
      });
    });
  },
  result: function result() {
    var _defaults$ajax;

    (_defaults$ajax = defaults.ajax).responseHandler.apply(_defaults$ajax, arguments);
  },
  waiting: function waiting($target) {
    var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "数据保存中，请耐心等待...";

    var $dlg = $target.closest(".modal");

    if ($dlg.size()) {
      if ($(".js-waitForResult", $dlg).size()) {
        $(".js-waitForResult", $dlg).show();
      } else {
        $(".modal-body", $dlg).append("<div class=\"Layer Layer--loading js-waitForResult\"><p>" + text + "</p></div>");
      }

      $("button", $(".modal-header, .modal-footer", $dlg)).prop("disabled", true);
    }
  }
};

["post", "put", "delete"].forEach(function (method) {
  utils.ajax[method] = function (url, params, callback, isJson) {
    return httpReq(url, method, params, callback, isJson);
  };
});

/*====================
  数字计算相关
  ====================*/

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

utils.calculate = {
  plus: function plus(a, b) {
    var d = getMoveDigit(a, b);

    return move2Left(move2Right(a, d) + move2Right(b, d), d);
  },
  minus: function minus(a, b) {
    var d = getMoveDigit(a, b);

    return move2Left(move2Right(a, d) - move2Right(b, d), d);
  },
  multiply: function multiply(a, b) {
    var d = getMoveDigit(a, b);

    return move2Left(move2Right(a, d) * move2Right(b, d), d * 2);
  },
  divided: function divided(a, b) {
    var d = getMoveDigit(a, b);

    return move2Left(move2Right(a, d) / move2Right(b, d), d);
  },
  move2Left: move2Left,
  move2Right: move2Right,
  getMoveDigit: getMoveDigit
};

var dialogLevel = 0;
var DIALOG_DEFAULT_INDEX = 1050;

if (SUPPORTS.BS_MODAL) {
  utils.dialog = {
    levelUp: function levelUp($dlg) {
      var $backdrop = $dlg.data("bs.modal").$backdrop;
      var increase = dialogLevel * 2 * 10;

      $dlg.css("z-index", DIALOG_DEFAULT_INDEX + increase);

      if ($backdrop) {
        $backdrop.css("z-index", DIALOG_DEFAULT_INDEX + increase - 10);
      }

      dialogLevel++;
    },
    levelDown: function levelDown($dlg) {
      var $backdrop = $dlg.data("bs.modal").$backdrop;

      $dlg.css("z-index", DIALOG_DEFAULT_INDEX);

      if ($backdrop) {
        $backdrop.css("z-index", DIALOG_DEFAULT_INDEX - 10);
      }

      dialogLevel--;
    },
    // 获取最顶级的对话框
    top: function top() {
      return [].sort.call($(".modal:visible"), function (a, b) {
        return $(a).css("z-index") * 1 < $(b).css("z-index") * 1;
      }).first();
    }
  };
}

utils.select = {
  change: function change($sel, val, callback) {
    $(val == null || val === "" ? ":first" : "[value='" + val + "']", $sel).prop("selected", true).siblings(":selected").prop("selected", false);

    if ($.isFunction(callback)) {
      callback.call($sel.get(0));
    }

    $sel.trigger("change");

    return $sel;
  }
};

utils.form = {
  /**
   * 填充表单
   *
   * @param $form
   * @param data
   */
  fill: function fill($form, data) {
    $("[name]", $form).each(function () {
      var $ipt = $(this);
      var tagName = this.tagName.toLowerCase();
      var key = $ipt.attr("name");
      var value = data[key];

      if (["input", "textarea"].includes(tagName)) {
        if (["radio", "checkbox"].includes($ipt.attr("type"))) {
          $("[name=\"" + key + "\"][value=\"" + value + "\"]", $form).prop("checked", true);
        } else {
          $ipt.val(value);
        }
      } else if (tagName === "select") {
        utils.select.change($ipt, value);
      }
    });
  }
};

if (SUPPORTS.H5FX) {
  utils.form.h5f = function ($form) {
    H5F.init($form, { immediate: false });

    $("[name]", $form).on({
      "H5F:valid": function H5FValid(e, f) {
        var $cell = $(e.target).closest("div");
        var $group = $(".ErrorGroup", $cell);

        $(".Error[data-name='" + f.name + "']", $cell).remove();

        if ($(".Error", $group).size() === 0) {
          $group.remove();
        }
      },
      "H5F:invalid": function H5FInvalid(e, f) {
        var $cell = $(e.target).closest("div");
        var $err = $(".Error[data-name='" + f.name + "']", $cell);

        if ($(".ErrorGroup", $cell).size() === 0) {
          $cell.append("<div class=\"ErrorGroup\" />");
        }

        if ($err.size() === 0) {
          $(".ErrorGroup", $cell).append("<p class=\"Error\" data-name=\"" + f.name + "\" />");

          $err = $(".Error[data-name='" + f.name + "']", $cell);
        }

        $err.text(f.message);
      }
    });

    $form.on("reset", function () {
      $(".ErrorGroup", $form).remove();
    });
  };
}

utils.field = {
  fill: function fill($container, data, callback) {
    $("[data-field]", $container).each(function () {
      var $f = $(this);
      var val = data[$f.attr("data-field")];

      if ($f.is("img")) {
        $f.attr("src", val);
      } else {
        $f.text(val || "-");
      }

      if ($.isFunction(callback)) {
        callback.apply(this, [$f.attr("data-field"), val]);
      }
    });
  },
  datepicker: function datepicker() {
    var $picker = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $(".js-pickDate");
    var opts = arguments[1];

    $picker.each(function () {
      var $p = $(this);
      var $ipt = $("[name=\"" + $p.attr("data-to") + "\"]", $p.closest("form"));

      $p.datepicker($.extend({
        language: "zh-CN",
        autohide: true
      }, $ipt.size() ? {
        pick: function pick() {
          $ipt.val(moment($(this).datepicker("getDate")).format());
        }
      } : null, opts));

      if ($ipt.size()) {
        $p.on("change", function () {
          if ($(this).val() === "") {
            $ipt.val("");
          }
        });
      }
    });
  }
};

utils.generate = {
  image: function image(url, alt) {
    var caption = "";

    alt = alt || "";

    if (alt) {
      caption = "<figcaption>" + alt + "</figcaption>";
    }

    return "<figure class=\"ImageItem\"><a href=\"" + url + "\" target=\"_blank\"><img src=\"" + url + "\" alt=\"" + alt + "\" title=\"" + alt + "\"></a>" + caption + "</figure>";
  },
  action: function action(actions, wrapped) {
    if ($.isPlainObject(actions)) {
      actions = [actions];
    }

    actions = actions.concat(defaults.table.rowActions);

    if (!Array.isArray(actions)) {
      return false;
    }

    var html = actions.map(function (a) {
      if ($.isPlainObject(a)) {
        var btnHtml = [];
        var btnCls = "btn btn-" + (a.isDelete === true ? "danger" : "default") + " btn-xs js-" + a.action;
        var isLink = $.type(a.url) === "string";

        if (isLink) {
          btnHtml.push("<a href=\"" + a.url + "\" class=\"" + btnCls + "\" title=\"" + a.text + "\">");
        } else {
          btnHtml.push("<button type=\"button\" class=\"" + btnCls + "\" title=\"" + a.text + "\">");
        }

        btnHtml.push($.type(a.icon) === "string" ? "<i class=\"fa fa-" + a.icon + "\"></i><span class=\"sr-only\">" + a.text + "</span>" : a.text);
        btnHtml.push("</" + (isLink ? "a" : "button") + ">");

        return btnHtml.join("");
      } else {
        return "";
      }
    });

    if (actions.length > 1 || wrapped === true) {
      html.unshift("<div class=\"OperationGroup\">");
      html.push("</div>");
    }

    return html.join("");
  }
};

defaults.table = {
  selector: "",
  showRowNumber: false,
  rowActions: []
};

function getDataTable() {
  return $(defaults.table.selector);
}

if (SUPPORTS.BS_TABLE) {
  defaults.table.responseHandler = $.fn.bootstrapTable.defaults.responseHandler;

  utils.table = {
    init: function init(opts) {
      opts.columns = utils.table.columns(opts.columns, opts.showRowNumber);

      getDataTable().bootstrapTable(opts);
    },
    columns: function columns(cols, showRowNumber) {
      var temp = cols.concat([]);

      if ($.type(showRowNumber) !== "boolean") {
        showRowNumber = defaults.table.showRowNumber;
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

      return temp.map(function (col) {
        var viewDetailOpts = col.viewDetail;
        var dateTimeFormatter = col.dateTimeFormatter;

        if ($.isPlainObject(viewDetailOpts)) {
          col.formatter = function (val) {
            return "<a href=\"javascript:void(0);\" class=\"js-openDetailDialog\">" + (val || "-") + "</a>";
          };

          col.events = $.extend({}, col.events, {
            "click .js-openDetailDialog": function clickJsOpenDetailDialog(e, val, row) {
              $.getJSON(viewDetailOpts.url, viewDetailOpts.params(val, row), function (res) {
                utils.ajax.result(res, function (result) {
                  var $m = $(".js-viewDetail");

                  if ($.isFunction(viewDetailOpts.handler)) {
                    viewDetailOpts.handler.apply(null, [val, row, result, $m]);
                  } else {
                    utils.field.fill($m, result);
                  }

                  $m.modal("show");
                });
              });
            }
          });
        } else if (dateTimeFormatter) {
          col.formatter = function (val) {
            if (dateTimeFormatter === true) {
              dateTimeFormatter = "YYYY-MM-DD HH:mm:ss";
            }

            return $.type(dateTimeFormatter) === "string" && moment ? moment(val).format(dateTimeFormatter) : $.isFunction(dateTimeFormatter) ? dateTimeFormatter.call(this, val) : val;
          };
        }

        col.titleTooltip = col.title;

        return col;
      });
    },
    /**
     * @param     $table
     * @param     resetTop    是否重置到首页
     */
    refresh: function refresh() {
      var $table = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getDataTable();
      var resetTop = arguments[1];

      if (typeof $table === "boolean") {
        resetTop = $table;
        $table = getDataTable();
      }

      if (resetTop === true) {
        $table.data("bootstrap.table").options.pageNumber = 1;
      }

      $table.bootstrapTable("refresh");
    }
  };
}

/**
 * 初始化第三方插件的默认参数
 */
function initDefaults() {
  [{
    dependency: SUPPORTS.BS_MODAL,
    initializer: function initializer() {
      // Bootstrap 对话框
      $.extend($.fn.modal.Constructor.DEFAULTS, {
        backdrop: "static",
        keyboard: false
      });
    }
  }, {
    dependency: SUPPORTS.BS_TABLE,
    initializer: function initializer() {
      // Bootstrap 数据表格表配置
      $.extend($.fn.bootstrapTable.defaults, {
        classes: "table table-condensed table-hover",
        iconsPrefix: "fa",
        sidePagination: "server",
        pagination: true,
        pageSize: 20,
        // showPaginationSwitch: false,
        pageList: [],
        queryParams: function queryParams(params) {
          params = {};

          $(".Area--query form").serializeArray().concat({
            name: "pageSize",
            value: this.pageSize
          }, {
            name: "pageNo",
            value: this.pageNumber
          }).forEach(function (p) {
            params[p.name] = p.value;
          });

          return params;
        },
        responseHandler: function responseHandler(res) {
          return defaults.table.responseHandler.call(this, res);
        }
      });

      // Bootstrap 数据表格列配置
      $.extend($.fn.bootstrapTable.columnDefaults, { valign: "middle" });
    }
  }, {
    dependency: SUPPORTS.SELECT2,
    initializer: function initializer() {
      // Select2 下拉列表
      $.each({
        containerCssClass: "handie-Select2-container",
        dropdownCssClass: "handie-Select2-dropdown",
        minimumResultsForSearch: "Infinity"
      }, function (k, v) {
        $.fn.select2.defaults.set(k, v);
      });
    }
  }, {
    dependency: SUPPORTS.H5FX,
    initializer: function initializer() {
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
        INVALID_VALUE: "无效字符",
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
  }, {
    dependency: SUPPORTS.MOMENTJS,
    initializer: function initializer() {
      // moment 日期时间格式转换
      moment.locale("zh-CN");
    }
  }].forEach(function (lib) {
    if (lib.dependency) {
      lib.initializer();
    }
  });
}

function initDialogs() {
  if (!SUPPORTS.MODAL) {
    return;
  }

  $(document).on("shown.bs.modal", ".modal", function () {
    var $m = $(this);
    var $dlg = $(".modal-dialog", $m);
    var $cnt = $(".modal-content", $m);

    utils.dialog.levelUp($m);

    if ($dlg.height() > $m.height()) {
      $m.addClass("is-scrollable");
      $cnt.css("height", $m.height() - parseFloat($dlg.css("margin-top"), 10) - parseFloat($dlg.css("margin-bottom"), 10) - parseFloat($cnt.css("border-top-width"), 10) - parseFloat($cnt.css("border-bottom-width"), 10));
    }
  });

  $(document).on("hidden.bs.modal", ".modal", function () {
    var $m = $(this);

    utils.dialog.levelDown($m);

    if ($m.hasClass("is-scrollable")) {
      $m.removeClass("is-scrollable");
      $(".modal-content", $m).css("height", "auto");
    }
  });
}

function initSelects() {
  if (!SUPPORTS.SELECT2) {
    return;
  }

  // 美化下拉列表控件
  $("select").select2();

  // 对话框中的 Select2 下拉列表在打开时加上所在对话框的层级
  // 以避免有多级重叠对话框时顶级的对话框中的下拉列表不显示
  $(".modal select").on("select2:open", function () {
    $(this).data("select2").$dropdown.css("z-index", $(this).closest(".modal").css("z-index"));
  });
}

$(document).ajaxError(function () {
  var _defaults$ajax2;

  (_defaults$ajax2 = defaults.ajax).errorHandler.apply(_defaults$ajax2, arguments);
  resetWaitStatus();
});

$(document).ready(function () {
  initDefaults();
  initDialogs();
  initSelects();

  // 阻止滑动引起的数字增减
  $("input[type='number']").on("mousewheel", function (e) {
    e.preventDefault();
  });
});
return utils;
}));
