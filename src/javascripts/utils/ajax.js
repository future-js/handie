function resetWaitStatus() {
  let $layer = $(".modal:visible .js-waitForResult:visible");

  if ( $layer.size() ) {
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
function httpReq( url, method, params, callback, isJson ) {
  let ajaxOpts = {
    url,
    type: method,
    success: function( res ) {
      resetWaitStatus();

      utils.ajax.result(res, function( result ) {
        if ( $.isFunction(callback) ) {
          callback.call(null, result, res);
        }
      });
    }
  };

  if ( isJson === true ) {
    ajaxOpts.data = JSON.stringify(params);
    ajaxOpts.contentType = "application/json; charset=UTF-8";
  }
  else {
    if ( ["get", "delete"].includes(method) ) {
      ajaxOpts.url += ("?" + Object.keys(params).map(function( k ) {
        return k + "=" + encodeURIComponent(params[k]);
      }).join("&"))
    }
    else {
      ajaxOpts.data = params;
    }
  }

  return $.ajax(ajaxOpts);
}

utils.ajax = {
  get: function( url, params, callback ) {
    if ( $.isFunction(params) ) {
      callback = params;
      params = {};
    }

    return $.getJSON(url, params, function( res ) {
      resetWaitStatus();

      utils.ajax.result(res, function( result ) {
        if ( $.isFunction(callback) ) {
          callback.call(null, result, res);
        }
      });
    });
  },
  result: function( res, callback ) {
    if ( res.success ) {
      if ( $.isFunction(callback) ) {
        callback.call(null, res.data);
      }
    }
    else {
      alert(res.message);
    }
  },
  waiting: function( $target, text = "数据保存中，请耐心等待..." ) {
    let $dlg = $target.closest(".modal");

    if ( $dlg.size() ) {
      if ( $(".js-waitForResult", $dlg).size() ) {
        $(".js-waitForResult", $dlg).show();
      }
      else {
        $(".modal-body", $dlg).append(`<div class="Layer Layer--loading js-waitForResult"><p>${text}</p></div>`);
      }

      $("button", $(".modal-header, .modal-footer", $dlg)).prop("disabled", true);
    }
  }
};

["post", "put", "delete"].forEach(function( method ) {
  utils.ajax[method] = function( url, params, callback, isJson ) {
    return httpReq(url, method, params, callback, isJson);
  };
});
