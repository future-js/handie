import { isFunction } from '../../utils/is/type';
import { isNativeFlavor, resolveBridge } from './helper';

/**
 * 调用 bridge
 * 
 * @param {*} ref API 引用
 * @param {*} opts 处理函数的首个参数
 * @param {*} rest 处理函数的其余参数
 */
export function invoke( ref, opts, ...rest ) {
  const handler = resolveBridge(ref, isNativeFlavor(opts));

  if ( !isFunction(handler) ) {
    return false;
  }

  return handler.apply(null, [].concat(opts, rest));
}
