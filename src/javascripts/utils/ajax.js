defaults.ajax = {
  errorHandler: function( evt, req, settings, err ) {
    let code = req.status;

    if ( code >= 500 ) {
      alert("服务器开小差啦～");
    }
    else if ( code >= 400 ) {
      alert(req.responseText);
    }
  },
  responseHandler: function( res, callback ) {
    callback(null, res);
  }
};

/**
 * 重置请求等待状态
 */
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
  result: function( ...args ) {
    defaults.ajax.responseHandler(...args);
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

["get", "post", "put", "delete"].forEach(function( method ) {
  utils.ajax[method] = function( url, params, callback, isJson ) {
    if ( method === "get" && $.isFunction(params) ) {
      callback = params;
      params = {};
    }

    return httpReq(url, method, params, callback, isJson);
  };
});
