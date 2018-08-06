import { isString, isArray, isFunction, filter, map, each } from "../common/helper";

/**
 * 获取下拉列表的默认选项
 * 
 * @param {*} $sel 
 */
function getDefaultOptions( $sel ) {
  return filter($("option", $sel).toArray(), function( opt ) {
    return opt.defaultSelected === true;
  });
}

export function change( $sel, val, callback ) {
  let opts;

  if ( val == null || val === "" ) {
    opts = getDefaultOptions($sel);
  }
  else {
    if ( isString(val) && val.split(",") ) {
      val = val.split(",");
    }

    opts = isArray(val) ? map(val, v => $(`option[value='${v}']`, $sel)) : $(`option[value='${val}']`, $sel);
  }

  $(":selected", $sel).prop("selected", false);

  each($(opts).toArray(), opt => {
    $(opt).prop("selected", true);
  });

  if ( isFunction(callback) ) {
    callback.call($sel.get(0));
  }

  $sel.trigger("change");

  return $sel;
}
