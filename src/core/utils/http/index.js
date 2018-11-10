import { isFunction, isPlainObject } from '../is/type';
import { includes, map, keys, mixin } from '../collection';
import { setDefaults, getDefaults } from '../storage/helper';
import { supportJquery, supportAxios } from './helper';

import HTTP_DEFAULTS from './defaults';

setDefaults('http', HTTP_DEFAULTS);

let requestSender;

/**
 * 获取发送请求的第三方库
 */
function resolveRequestSender() {
  return supportJquery() && jQuery.support.ajax && isFunction(jQuery.ajax) ? 'jquery' : supportAxios() ? 'axios' : null;
}

/**
 * 处理请求响应
 * 
 * @param {*} res 原始响应信息
 * @param {*} callback 回调函数
 */
function resolveResponseResult( res, callback ) {
  const handler = getDefaults('http.responseHandler');

  if ( !isFunction(handler) ) {
    return;
  }

  return handler(res, callback);
}

/**
 * 用 `jQuery.ajax()` 发送 HTTP 请求
 * 
 * @param {*} opts 配置项
 */
function sendRequestViaJquery( opts ) {
  const httpDefaults = getDefaults('http');
  const params = httpDefaults.jsonify(opts.params);
  const { url, method, callback } = opts;
  const resolved = {url, method, type: method, global: false};

  if ( opts.isJson === true ) {
    resolved.data = JSON.stringify(params);
    resolved.contentType = 'application/json; charset=UTF-8';
  }
  else if ( !includes(method, ['get', 'delete']) ) {
    resolved.data = params;
  }
  else if ( isPlainObject(params) && keys(params).length ) {
    resolved.url += ('?' + map(keys(params), k => `${k}=${encodeURIComponent(params[k])}`).join('&'));
  }

  const req = window.jQuery.ajax(resolved);

  if ( opts.global !== false ) {
    req
      .always(() => httpDefaults.completeHandler())
      .done(res => {
        resolveResponseResult(res, result => {
          if ( isFunction(callback) ) {
            callback.call(null, result, res);
          }
        });
      })
      .fail(jqXHR => httpDefaults.errorHandler(jqXHR));
  }

  return req;
}

/**
 * 用 `axios()` 发送 HTTP 请求
 * 
 * @param {*} opts 配置项
 */
function sendRequestViaAxios( opts ) {
  return window.axios(opts);
}

/**
 * 发送 HTTP 请求
 * 
 * @param {*} opts 配置项
 */
function sendHttpRequest( opts ) {
  if ( !isFunction(requestSender) ) {
    requestSender = resolveRequestSender();
  }

  const resolved = mixin({
      url: '',
      method: 'get',
      params: null,
      callback: null,
      isJson: false
    }, opts);
  
  if ( !/^http(s)?\:\/\//.test(resolved.url) ) {
    resolved.url = getDefaults('http.baseURL') + resolved.url;
  }

  return requestSender === 'jquery' ? sendRequestViaJquery(resolved) : requestSender === 'axios' ? sendRequestViaAxios(resolved) : null;
}

/**
 * 生成 HTTP 工具方法
 * 
 * @param {*} method 请求方式
 */
function generateHttpUtil( method ) {
  return ( url, params, callback, isJson ) => {
    let global;

    /**
     * http[method]({
     *    url: "",
     *    data: {},
     *    callback: $.noop,
     *    isJson: false
     * })
     */
    if ( isPlainObject(url) ) {
      const opts = url;

      url = opts.url;
      params = opts.data;
      callback = opts.callback;
      isJson = opts.isJson;
      global = opts.global;
    }
    // http[method](url, callback, isJson)
    else if ( isFunction(params) ) {
      isJson = callback;
      callback = params;
      params = {};
    }
    /**
     * http[method](url, params, {
     *    callback: $.noop,
     *    isJson: false
     * })
     */
    else if ( isPlainObject(callback) ) {
      isJson = callback.isJson;
      callback = callback.callback;
      global = callback.global;
    }
    /**
     * http[method](url, params, callback, {
     *    isJson: false
     * })
     */
    else if ( isPlainObject(isJson) ) {
      isJson = isJson.isJson;
      global = isJson.global;
    }

    return sendHttpRequest({url, method, params, callback, isJson, global});
  }
}

const httpGetUtil = generateHttpUtil('get');
const httpPostUtil = generateHttpUtil('post');
const httpPutUtil = generateHttpUtil('put');
const httpDeleteUtil = generateHttpUtil('delete');

export {
  httpGetUtil as get,
  httpPostUtil as post,
  httpPutUtil as put,
  httpDeleteUtil as delete
}
