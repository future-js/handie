import { toString, hasOwnProp } from '../common/helper';

/**
 * 判断是否为布尔类型
 *
 * @param {*} target 目标
 */
export function isBoolean( target: any ): boolean {
  return toString(target) === '[object Boolean]';
}

/**
 * 判断是否为数字类型
 *
 * 如果是 `NaN` 的话则返回 `false`
 *
 * @param {*} target 目标
 */
export function isNumber( target: any ): boolean {
  return toString(target) === '[object Number]' && !isNaN(target);
}

/**
 * 判断是否为字符串类型
 *
 * @param {*} target 目标
 */
export function isString( target: any ): boolean {
  return toString(target) === '[object String]';
}

/**
 * 判断是否为函数类型
 *
 * @param {*} target 目标
 */
export function isFunction( target: any ): boolean {
  return toString(target) === '[object Function]';
}

/**
 * 判断是否为数组类型
 *
 * @param {*} target 目标
 */
export function isArray( target: any ): boolean {
  return toString(target) === '[object Array]';
}

/**
 * 判断是否为日期类型
 *
 * @param {*} target 目标
 */
export function isDate( target: any ): boolean {
  return toString(target) === '[object Date]';
}

/**
 * 判断是否为正则表达式类型
 *
 * @param {*} target 目标
 */
export function isRegExp( target: any ): boolean {
  return toString(target) === '[object RegExp]';
}

/**
 * 判断是否为对象类型
 *
 * @param {*} target 目标
 */
export function isObject( target: any ): boolean {
  return toString(target) === '[object Object]';
}

/**
 * 宽松地判断是否为对象类型
 *
 * @param {*} target 目标
 */
export function isLooseObject( target: any ): boolean {
  return typeof target === 'object';
}

/**
 * 判断是否为数字或类数字类型
 *
 * 与 `jQuery.isNumeric()` 的实现方式一致
 *
 * @param {*} target 目标
 */
export function isNumeric( target: any ): boolean {
  const realStringObj = target && target.toString();

  return !isArray(target) && (realStringObj - parseFloat(realStringObj) + 1) >= 0;
}

/**
 * 判断是否为宿主环境全局对象
 *
 * 在浏览器环境中就是 `window` 对象
 *
 * @param {*} target 目标
 */
export function isGlobal( target: any ): boolean {
  return target && isLooseObject(target) && 'setInterval' in target;
}

/**
 * 判断是否为类数组对象
 *
 * @param {*} target 目标
 */
export function isArrayLike( target: any ): boolean {
  let result = false;

  if ( isLooseObject(target) && !isGlobal(target) ) {
    const length = target.length;

    if ( target.nodeType === 1 && length || !isArray(target) && !isFunction(target) && (length === 0 || isNumber(length) && length > 0 && (length - 1) in target) ) {
      result = true;
    }
  }

  return result;
}

/**
 * 判断是否为纯对象
 *
 * @param {*} target 目标
 */
export function isPlainObject( target: any ): boolean {
  if ( !target || !isLooseObject(target) || target.nodeType || isGlobal(target) ) {
    return false;
  }

  try {
    if ( target.constructor && !hasOwnProp('constructor', target) && !hasOwnProp('isPrototypeOf', target.constructor.prototype) ) {
      return false;
    }
  }
  catch ( err ) {
    return false;
  }

  let key;

  for ( key in target ) {
    key;
  }

  return key === undefined || hasOwnProp(key, target);
}
