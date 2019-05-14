import { hasOwnProp } from '../common/helper';
import { each, mixin, clone } from '../collection';
import { isString, isPlainObject } from '../is/type';

const APP_DEFAULTS = {
    theme: {
      color: '#ff8903'
    },
    behavior: 'native',
    flexible: false
  };

const PRIVATE_DATA = {};
const BIZ_DATA = {};

/**
 * 获取引用的键
 *
 * @param {*} ref 引用
 */
export function resolveRefKeys( ref: string ): string[] {
  return isString(ref) && (new RegExp('^[0-9a-z_]+(\.[0-9a-z_]+)*$', 'i')).test(ref) ? ref.split('.') : [];
}

/**
 * 存储数据
 *
 * @param {*} storage 储存体
 * @param {*} ref 数据的引用
 * @param {*} val 数据的值
 * @param {*} merge 合并配置项
 */
export function saveData( storage: object, ref: string, val: any, merge?: boolean ): any {
  const refKeys = resolveRefKeys(ref);

  if ( arguments.length < 3 || refKeys.length === 0 ) {
    return;
  }

  const lastKey = refKeys.pop();

  let tmp: any = storage;

  each(refKeys, ( k: string ) => {
    if ( !hasOwnProp(k, tmp) ) {
      tmp[k] = {};
    }

    tmp = tmp[k];
  });

  if ( merge === true && isPlainObject(tmp[lastKey!]) && isPlainObject(val) ) {
    mixin(true, tmp[lastKey!], val);
  }
  else {
    tmp[lastKey!] = val;
  }

  return val;
}

/**
 * 获取数据
 *
 * @param {*} storage 储存体
 * @param {*} ref 数据的引用
 */
export function retrieveData( storage: object, ref: string ): any {
  const refKeys = resolveRefKeys(ref);
  const keyLength = refKeys.length;

  if ( keyLength === 0 ) {
    return;
  }

  let idx = 0;
  let tmp = clone(storage);
  let val, k;

  for ( ; idx < keyLength; idx++ ) {
    k = refKeys[idx];
    val = tmp[k];

    if ( !hasOwnProp(k, tmp) ) {
      break;
    }

    tmp = val;
  }

  return val;
}

/**
 * 设置应用配置信息
 *
 * @param ref
 * @param val
 */
export function setDefaults( ref: string, val: any ): any {
  return saveData(APP_DEFAULTS, ref, val, true);
}

/**
 * 获取应用配置信息
 *
 * @param ref
 */
export function getDefaults( ref: string ): any {
  return retrieveData(APP_DEFAULTS, ref);
}

/**
 * 设置应用私有数据
 *
 * @param ref
 * @param val
 */
export function setPrivate( ref: string, val: any ): any {
  return saveData(PRIVATE_DATA, ref, val, true);
}

/**
 * 获取应用私有数据
 *
 * @param ref
 */
export function getPrivate( ref: string ): any {
  return retrieveData(PRIVATE_DATA, ref);
}

/**
 * 设置应用业务数据
 *
 * @param ref
 * @param val
 */
export function setBizData( ref: string, val: any ): any {
  return saveData(BIZ_DATA, ref, val);
}

/**
 * 获取应用业务数据
 *
 * @param ref
 */
export function getBizData( ref: string ): any {
  return retrieveData(BIZ_DATA, ref);
}
