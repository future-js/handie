import {
  isBoolean, isString, isFunction,
  isArray, isArrayLike,
  isObject, isLooseObject, isPlainObject } from '../is/type';

/**
 * 判断是否当作数组进行处理
 *
 * @param {*} target 目标
 */
function treatAsArray( target: any ): boolean {
  return isString(target) || isArray(target) || isArrayLike(target);
}

/**
 * 遍历指定对象
 *
 * 与 `jQuery.each()` 效果类似
 *
 * 详见：http://api.jquery.com/jQuery.each/
 *
 * @param {*} target 目标
 * @param {*} callback 应用到每个元素的处理函数
 */
function eachItem( target: any, callback: Function ): void {
  if ( treatAsArray(target) ) {
    let idx = 0;
    let ele;

    while ( idx < target.length ) {
      ele = isString(target) ? target.charAt(idx) : target[idx];

      if ( callback.apply(ele, [ele, idx++, target]) === false ) {
        break;
      }
    }
  }
  else if ( isObject(target) || isFunction(target) ) {
    let name, value;

    for ( name in target ) {
      value = target[name];

      if ( callback.apply(value, [value, name, target]) === false ) {
        break;
      }
    }
  }
}

/**
 * 扩展指定对象
 *
 * 与 `jQuery.extend()` 效果一样
 *
 * 详见：http://api.jquery.com/jQuery.extend/
 */
function extendTarget( ...args: any[] ): object {
  const length = args.length;

  let target = args[0] || {};
  let i = 1;
  let deep = false;
  let clone, copy, copyIsArray, name, opts, src;

  if ( isBoolean(target) ) {
    deep = target;
    target = args[1] || {};
    i = 2;
  }

  if ( !isLooseObject(target) && !isFunction(target) ) {
    target = {};
  }

  if ( length === 1 ) {
    target = this;
    i--;
  }

  while ( i < length ) {
    opts = args[i];

    if ( opts != null ) {
      for ( name in opts ) {
        copy = opts[name];
        src = target[name];

        if ( copy === target ) {
          continue;
        }

        if ( deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy))) ) {
          if ( copyIsArray ) {
            copyIsArray = false;
            clone = src && isArray(src) ? src : [];
          }
          else {
            clone = src && isPlainObject(src) ? src : {};
          }

          target[name] = extendTarget(deep, clone, copy);
        }
        else if ( copy !== undefined ) {
          target[name] = copy;
        }
      }
    }

    i++;
  }

  return target;
}

/**
 * 将目标转化为数组
 *
 * @param {*} target 目标
 */
function toArray( target: any ): any[] {
  return treatAsArray(target) ? [].slice.call(target, 0) : [];
}

/**
 * 判断目标是否在集合中
 *
 * @param {*} target 目标
 * @param {*} collection 集合
 */
export function includes( target: any, collection: any ): boolean {
  if ( isFunction(collection.includes) ) {
    return collection.includes(target);
  }
  else if ( isFunction(collection.indexOf) ) {
    return collection.indexOf(target) > -1;
  }
  else {
    try {
      return jQuery.inArray(target, toArray(collection)) > -1;
    }
    catch ( err ) {
      return false;
    }
  }
}

/**
 * 对集合中的每个元素进行处理并返回一个新的集合
 *
 * @param {*} target 目标
 * @param {*} callback 应用到每个元素的处理函数
 */
export function map( target: any, callback: any ): any[] {
  let result;

  if ( treatAsArray(target) ) {
    if ( isFunction([].map) ) {
      result = [].map.call(target, callback);
    }
    else {
      try {
        result = jQuery.map(toArray(target), callback);
      }
      catch ( err ) {
        result = [];
      }
    }
  }

  return result || [];
}

/**
 * 对集合中的每个元素进行过滤并返回一个新的集合
 *
 * @param {*} target 目标
 * @param {*} callback 应用到每个元素的处理函数
 */
export function filter( arr: any, callback: Function ): any[] {
  let newArr: any[] = [];

  if ( isArray(arr) ) {
    if ( isFunction(arr.filter) ) {
      newArr = arr.filter(callback);
    }
    else if ( isFunction(callback) ) {
      eachItem(arr, ( idx: number, val: any ) => {
        if ( callback.apply(val, [val, idx, [].concat(arr)]) ) {
          newArr.push(val);
        }
      });
    }
  }

  return newArr || [];
}

/**
 * 获取集合中的最后一个元素
 *
 * @param {*} target 目标
 */
export function last( target: any ): any {
  if ( treatAsArray(target) ) {
    return target[target.length - 1];
  }
}

/**
 * 获取指定对象的所有键
 *
 * @param {*} target 目标
 */
export function keys( target: any ): string[] {
  if ( isFunction(Object.keys) ) {
    return Object.keys(target);
  }

  let arr: string[] = [];

  if ( isPlainObject(target) ) {
    eachItem(target, ( key: string ) => arr.push(key));
  }

  return arr;
}

/**
 * 克隆目标
 *
 * @param {*} target 被克隆的对象
 */
export function clone( target: any ): any {
  return isArray(target) ? [].concat(target) : isPlainObject(target) ? extendTarget(true, {}, target) : target;
}

export {
  eachItem as each,
  extendTarget as mixin,
  toArray as arrayify
}
