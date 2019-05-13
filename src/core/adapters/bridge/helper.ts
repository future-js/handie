import { isBoolean, isString, isFunction, isPlainObject } from '../../utils/is/type';
import { each, keys } from '../../utils/collection';
import { getDefaults, setPrivate, getPrivate } from '../../utils/storage/helper';

/**
 * 是否优先使用 native 组件
 *
 * @param {*} opts 包含抉择的配置项
 */
export function isNativeFlavor( opts: any ): boolean {
  return isBoolean(opts) ? opts :
    isPlainObject(opts) && isBoolean(opts.native) ? opts.native :
    getDefaults('behavior') === 'native';
}

/**
 * 保存指定类别的 bridge 信息
 *
 * @param {*} flag 标识符
 * @param {*} apis API
 */
export function setBridge( flag: string, apis: any ): any {
  return setPrivate(`bridge.${flag}`, apis);
}

/**
 * 获取指定类别的 bridge 处理函数
 *
 * @param {*} flag 标识符
 * @param {*} ref API 引用
 */
export function getBridge( flag: string, ref: string ): any {
  return getPrivate(`bridge.${flag}.${ref}`);
}

/**
 * 获取可用的 bridge 处理函数
 *
 * @param {*} ref API 引用
 * @param {*} isNativeFirst 是否 native 优先
 */
export function resolveBridge( ref: string, isNativeFirst: boolean ): any {
  if ( !isString(ref) ) {
    return;
  }

  let handler;

  if ( isNativeFirst ) {
    const envs = getPrivate('env');

    each(keys(getPrivate('bridge')), ( k: string ) => {
      if ( k !== 'fallback' && envs[k] === true ) {
        handler = getBridge(k, ref);

        return false;
      }
    });
  }

  if ( !isFunction(handler) ) {
    handler = getBridge('fallback', ref);
  }

  return handler;
}
