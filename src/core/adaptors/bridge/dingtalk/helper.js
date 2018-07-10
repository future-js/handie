import { isFunction } from '../../../utils/is/type';
import { mixin } from '../../../utils/collection';
import { retrieveData } from '../../../utils/storage/helper';

/**
 * 调用钉钉 API
 * 
 * @param {*} ref API 引用
 * @param {*} opts 配置项
 */
export function invokeDingTalkApi( ref, opts ) {
  const handler = retrieveData(window.dd, ref);

  if ( !isFunction(handler) ) {
    return;
  }

  return handler(mixin({onFail: ( ...args ) => console.log(...args)}, opts));
}
