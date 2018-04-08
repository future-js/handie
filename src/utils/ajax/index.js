import {
  isFunction, isArray, isPlainObject,
  inArray, arrayMap, hasOwnProp, objectKeys
} from "../common/helper";
import { defaults } from "../common/settings";

import { jsonify } from "../form";

import { resetWaitStatus } from "./helper";

function resolveAjaxResult( res, callback, settings ) {
  if ( !isPlainObject(settings) ) {
    settings = {};
  }

  if ( !hasOwnProp("alertType", settings) ) {
    settings.alertType = "system";
  }

  defaults.ajax.responseHandler(res, callback, settings);
}

function waitingForResponse( $target, text = defaults.ajax.waitingText ) {
  const $dlg = $target.closest(".modal");

  if ( $dlg.length ) {
    $dlg.addClass("is-waiting");

    if ( $(".js-waitForResult", $dlg).length ) {
      $(".js-waitForResult", $dlg).show();
    }
    else {
      $(".modal-content", $dlg).append(`<div class="Layer Layer--loading js-waitForResult"><p>${text}</p></div>`);
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
function httpReq( url, method, params, callback, isJson, settings ) {
  let ajaxOpts = {
    url,
    type: method,
    success: function( res ) {
      resetWaitStatus();

      resolveAjaxResult(res, function( result ) {
        if ( isFunction(callback) ) {
          callback.call(null, result, res);
        }
      }, settings);
    }
  };

  params = isPlainObject(params) || isArray(params) ? params : jsonify(params);

  if ( isJson === true ) {
    ajaxOpts.data = JSON.stringify(params);
    ajaxOpts.contentType = "application/json; charset=UTF-8";
  }
  else {
    if ( inArray(method, ["get", "delete"]) ) {
      if ( objectKeys(params).length ) {
        ajaxOpts.url += ("?" + arrayMap(objectKeys(params), function( k ) {
          return k + "=" + encodeURIComponent(params[k]);
        }).join("&"));
      }
    }
    else {
      ajaxOpts.data = params;
    }
  }

  return $.ajax(ajaxOpts);
}

function generateAjaxUtil( method ) {
  return function( url, params, callback, isJson ) {
    let $waiting, waitingText, alertType;

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
    if ( isPlainObject(url) ) {
      let opts = url;

      url = opts.url;
      params = opts.data;
      callback = opts.callback;
      isJson = opts.isJson;

      $waiting = opts.$waiting;
      waitingText = opts.waitingText;

      alertType = opts.alertType;
    }
    else {
      // muu.ajax[method](url, callback, isJson)
      if ( isFunction(params) ) {
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
      else if ( isPlainObject(callback) ) {
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
      else if ( isPlainObject(isJson) ) {
        $waiting = isJson.$waiting;
        waitingText = isJson.waitingText;

        alertType = isJson.alertType;

        isJson = isJson.isJson;
      }
    }

    if ( $waiting ) {
      waitingForResponse($waiting, waitingText);
    }

    if ( alertType == null ) {
      alertType = "system";
    }

    return httpReq(url, method, params, callback, isJson, {alertType});
  }
}

const ajaxGet = generateAjaxUtil("get");

const ajaxPost = generateAjaxUtil("post");

const ajaxPut = generateAjaxUtil("put");

const ajaxDelete = generateAjaxUtil("delete");

export {
  ajaxGet as get,
  ajaxPost as post,
  ajaxPut as put,
  ajaxDelete as delete,
  resolveAjaxResult as result,
  waitingForResponse as waiting
}
