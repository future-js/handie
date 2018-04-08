import { isString, isArray, isFunction, isPlainObject, inArray, arrayFilter, arrayMap, hasOwnProp } from "../common/helper";
import { defaults } from "../common/settings";
import { change } from "../select";

function isQueryStr( str ) {
  return isString(str) &&
    str.split("&").length > 0 &&
    str.split("&")[0].split("=").length > 0;
}

function queryStr2SerializedArr( str ) {
  return arrayMap(str.split("&"), pair => {
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

  arrayEach((
    isArray($form) ? $form :
    isQueryStr($form) ? queryStr2SerializedArr($form) :
    $($form).serializeArray()
  ), p => {
    jsonData[p.name] = hasOwnProp(p.name, jsonData) ? [].concat(jsonData[p.name], p.value) : p.value;
  });

  if ( isFunction(callback) ) {
    let newJson = callback(jsonData);

    if ( isPlainObject(newJson) ) {
      jsonData = newJson;
    }
  }

  return jsonData;
}

function resetValidateStatus() {
  let $form = $(this);

  $(".form-group", $form).removeClass("has-success has-error");
  $(".help-block:not(.is-dynamic)", $form).removeClass("u-hidden");
  $(".help-block.is-dynamic, .Error, .ErrorGroup", $form).addClass("u-hidden");
}

export function h5f( $form ) {
  H5F.init($form, {immediate: false});

  $("[name]", $form).on({
    "H5F:valid": function( e, f ) {
      let $cell = $(e.target).closest("div");
      let $group = $cell.closest(".form-group");
      let errSelector;

      if ( $group.length > 0 ) {
        errSelector = `.help-block[data-name="${f.name}"]`;

        $(".help-block:not(.is-dynamic)", $group).addClass("u-hidden");
        $group.removeClass("has-error").addClass("has-success");
      }
      else {
        errSelector = `.Error[data-name="${f.name}"]`;
        $group = $(".ErrorGroup", $cell);
      }

      $(errSelector, $cell).addClass("u-hidden");

      if ( $group.is(".ErrorGroup") && $(".Error:not(.u-hidden)", $group).length === 0 ) {
        $group.addClass("u-hidden");
      }
    },
    "H5F:invalid": function( e, f ) {
      let $cell = $(e.target).closest("div");
      let $group = $cell.closest(".form-group");
      let $container, errSelector, errHtml;

      if ( $group.length > 0 ) {
        errSelector = `.help-block[data-name="${f.name}"]`;
        errHtml = `<p class="help-block is-dynamic" data-name="${f.name}" />`;
        $container = $cell;

        $(".help-block:not(.is-dynamic)", $container).addClass("u-hidden");
        $group.removeClass("has-success").addClass("has-error");
      }
      else {
        errSelector = `.Error[data-name="${f.name}"]`;
        errHtml = `<p class="Error" data-name="${f.name}" />`;
        $container = $(".ErrorGroup", $cell);

        if ( $container.length > 0 ) {
          $container.removeClass("u-hidden");
        }
        else {
          $cell.append("<div class=\"ErrorGroup\" />");
          $container = $(".ErrorGroup", $cell);
        }
      }

      let $err = $(errSelector, $container);

      if ( $err.length === 0 ) {
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
export function fill( $form, data ) {
  if ( !isPlainObject(data) ) {
    return;
  }

  $("[name]", $form).each(function() {
    let $ipt = $(this);
    let tagName = this.tagName.toLowerCase();
    let key = $ipt.attr("name");
    let value = data[key];

    if ( inArray(tagName, ["input", "textarea"]) ) {
      if ( inArray($ipt.attr("type"), ["radio", "checkbox"]) ) {
        $(`[name="${key}"][value="${value}"]`, $form).prop("checked", true);
      }
      else {
        $ipt.val(value);
      }
    }
    else if ( tagName === "select" ) {
      change($ipt, value);
    }
  });
}

/**
 * 重置表单
 *
 * @param $form
 */
export function reset( $form, callback ) {
  $("select", $form).each(function() {
    change($(this));
  });

  $("[type='hidden']", $form).val("");

  if ( isFunction(callback) ) {
    callback.call($form.get(0));
  }
}

export function serialize( $form, filter ) {
  let settings = $form;
  let serializer;

  if ( isPlainObject($form) ) {
    $form = settings.$form;
    filter = settings.filter;
    serializer = settings.serializer;
  }

  if ( !isFunction(filter) ) {
    filter = defaults.form.filter;
  }

  if ( !isFunction(serializer) ) {
    serializer = defaults.form.serializer;
  }

  $form = $($form);

  return serializer(arrayFilter($form.serializeArray(), function( data, idx, arr ) {
    return filter(data, $(`[name="${data.name}"]`, $form), arr);
  }));
}

export {
  jsonifyFormData as jsonify
}
