defaults.form = {
  filter: function( data, $field, arr ) {
    return true;
  },
  serializer: function( arr ) {
    return arr;
  }
};

/**
 * 获取下拉列表的默认选项
 *
 * @param     $sel
 */
function getDefaultOptions( $sel ) {
  return [].filter.call($("option", $sel), function( opt ) {
    opt.defaultSelected === true;
  });
}

utils.select = {
  change: function( $sel, val, callback ) {
    let opts;

    if ( val == null || val === "" ) {
      opts = getDefaultOptions($sel);
    }
    else {
      if ( typeof val === "string" && val.split(",") ) {
        val = val.split(",");
      }

      opts = Array.isArray(val) ? val.map(function( v ) {
        return $(`option[value='${v}']`, $sel);
      }) : $(`option[value='${val}']`, $sel);
    }

    $(":selected", $sel).prop("selected", false);

    [].forEach.call(opts, function( opt ) {
      $(opt).prop("selected", true);
    });

    if ( $.isFunction(callback) ) {
      callback.call($sel.get(0));
    }

    $sel.trigger("change");

    return $sel;
  }
};

function isQueryStr( str ) {
  return typeof str === "string" &&
    str.split("&").length > 0 &&
    str.split("&")[0].split("=").length > 0;
}

function queryStr2SerializedArr( str ) {
  return str.split("&").map(function( pair ) {
    let p = pair.split("=");

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
function jsonifyFormData( $form, callback ) {
  let jsonData = {};

  (
    Array.isArray($form) ? $form :
    isQueryStr($form) ? queryStr2SerializedArr($form) :
    $($form).serializeArray()
  ).forEach(function( p ) {
    jsonData[p.name] = jsonData.hasOwnProperty(p.name) ? [].concat(jsonData[p.name], p.value) : p.value;
  });

  if ( $.isFunction(callback) ) {
    let newJson = callback(jsonData);

    if ( $.isPlainObject(newJson) ) {
      jsonData = newJson;
    }
  }

  return jsonData;
}

utils.form = {
  h5f: function( $form ) {
    H5F.init($form, {immediate: false});

    $("[name]", $form).on({
      "H5F:valid": function( e, f ) {
        let $cell = $(e.target).closest("div");
        let $group = $(".ErrorGroup", $cell);

        $(".Error[data-name='" + f.name + "']", $cell).remove();

        if ( $(".Error", $group).size() === 0 ) {
          $group.remove();
        }
      },
      "H5F:invalid": function( e, f ) {
        let $cell = $(e.target).closest("div");
        let $err = $(".Error[data-name='" + f.name + "']", $cell);

        if ( $(".ErrorGroup", $cell).size() === 0 ) {
          $cell.append("<div class=\"ErrorGroup\" />");
        }

        if ( $err.size() === 0 ) {
          $(".ErrorGroup", $cell).append("<p class=\"Error\" data-name=\"" + f.name + "\" />");

          $err = $(".Error[data-name='" + f.name + "']", $cell);
        }

        $err.text(f.message);
      }
    });

    $form.on("reset", function() {
      $(".ErrorGroup", $form).remove();
    });
  },
  /**
   * 填充表单
   *
   * @param $form
   * @param data
   */
  fill: function( $form, data ) {
    $("[name]", $form).each(function() {
      let $ipt = $(this);
      let tagName = this.tagName.toLowerCase();
      let key = $ipt.attr("name");
      let value = data[key];

      if ( ["input", "textarea"].includes(tagName) ) {
        if ( ["radio", "checkbox"].includes($ipt.attr("type")) ) {
          $(`[name="${key}"][value="${value}"]`, $form).prop("checked", true);
        }
        else {
          $ipt.val(value);
        }
      }
      else if ( tagName === "select" ) {
        utils.select.change($ipt, value);
      }
    });
  },
  /**
   * 重置表单
   *
   * @param $form
   */
  reset: function( $form, callback ) {
    $("select", $form).each(function() {
      utils.select.change($(this));
    });

    $("[type='hidden']", $form).val("");

    if ( $.isFunction(callback) ) {
      callback.call($form.get(0));
    }
  },
  jsonify: jsonifyFormData,
  serialize: function( $form, filter ) {
    let settings = $form;
    let serializer;

    if ( $.isPlainObject($form) ) {
      $form = settings.$form;
      filter = settings.filter;
      serializer = settings.serializer;
    }

    if ( !$.isFunction(filter) ) {
      filter = defaults.form.filter;
    }

    if ( !$.isFunction(serializer) ) {
      serializer = defaults.form.serializer;
    }

    $form = $($form);

    return serializer($form.serializeArray().filter(function( data, idx, arr ) {
      return filter(data, $(`[name="${data.name}"]`, $form), arr);
    }));
  }
};

utils.field = {
  fill: function( $container, data, callback ) {
    $("[data-field]", $container).each(function() {
      let $f = $(this);
      let val = data[$f.attr("data-field")];

      if ( $f.is("img") ) {
        $f.attr("src", val);
      }
      else {
        $f.text(val || "-");
      }

      if ( $.isFunction(callback) ) {
        callback.apply(this, [$f.attr("data-field"), val]);
      }
    });
  },
  datepicker: function( $picker = $(".js-pickDate"), opts ) {
    $picker.each(function() {
      let $p = $(this);
      let $ipt = $(`[name="${$p.attr("data-to")}"]`, $p.closest("form"));

      $p.datepicker($.extend({
        language: "zh-CN",
        autohide: true
      }, ($ipt.size() ? {
        pick: function() {
          $ipt.val(moment($(this).datepicker("getDate")).format());
        }
      } : null), opts));

      if ( $ipt.size() ) {
        $p.on("change", function() {
          if ( $(this).val() === "" ) {
            $ipt.val("");
          }
        });
      }
    });
  },
  datetimepicker: function( $picker, opts ) {
    if ( $.isPlainObject($picker) ) {
      opts = $picker;
      $picker = null;
    }

    $picker = $picker == null ? $(".js-pickDateTime") : $($picker);
    opts = $.extend(true, {}, opts);

    $picker.each(function() {
      let $p = $(this);

      // 时间段
      if ( $p.is(".js-pickDatePeriod") ) {
        let selector = "input:not([type='hidden'])";
        let $ipts = $(selector, $p);

        if ( $ipts.size() === 2 ) {
          $ipts.each(function( idx ) {
            let $ipt = $(this);
            let method;

            if ( idx === 0 ) {
              method = "minDate";
            }
            else {
              method = "maxDate";
              // 请看 https://github.com/Eonasdan/bootstrap-datetimepicker/issues/1075
              opts.useCurrent = false;
            }

            $ipt
              .datetimepicker(opts)
              .on("dp.change", function( evt ) {
                let $dt = $(this);
                let date = evt.date;

                $dt.siblings(selector).data("DateTimePicker")[method](date);
                $(`input[name='${$dt.attr("data-to")}']`, $dt.closest("form")).val(moment(date).format());
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
};
