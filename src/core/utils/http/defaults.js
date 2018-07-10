import { hasOwnProp } from '../common/helper';
import { isString, isFunction, isPlainObject } from '../is/type';
import { getDefaults } from '../storage/helper';
import { invoke } from '../../adaptors/bridge';

export default {
  serverErrorText: '服务器开小差啦～',
  /**
   * 将请求参数转换为 JSON
   */
  jsonify( params ) {
    return params;
  },
  /**
   * 请求发生错误时的处理
   */
  errorHandler( res ) {
    const code = res.status;

    if ( code >= 500 ) {
      invoke('notice.alert', getDefaults('http.serverErrorText'));
    }
    else if ( code >= 400 ) {
      let resText = res.responseText;
      let resJson;

      if ( hasOwnProp('responseJSON', res) ) {
        resJson = res.responseJSON;
      }
      else {
        try {
          resJson = JSON.parse(resText);
        }
        catch ( err ) {
          resJson = null;
        }
      }

      // 支持 {"message": ""} 形式的错误信息
      if ( isPlainObject(resJson) && hasOwnProp('message', resJson) ) {
        resText = resJson.message;
      }

      invoke('notice.alert', resText);
    }
  },
  /**
   * 对请求返回数据的处理
   */
  responseHandler( res, callback ) {
    if ( isString(res) && res !== '' ) {
      invoke('notice.alert', res);
    }
    else if ( isFunction(callback) ) {
      callback.call(null, res);
    }
  },
  /**
   * 请求完成时的处理
   */
  completeHandler() {}
}
