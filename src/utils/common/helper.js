import { hasOwnProp } from "@mhc/ntks/utils/helper"
import { func, string, array, plainObject } from "@mhc/ntks/utils/is";
import { includes, arrayify, each, map, filter, last, keys, mixin } from "@mhc/ntks/utils/collection";

export function isRestful( res ) {
  return !(res !== undefined && hasOwnProp("success", res) && hasOwnProp("message", res));
}

/**
 * 使字符串首字母大写
 */
export function capitalize( str ) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

/**
 * 克隆目标
 *
 * @param {*} target 被克隆的对象
 */
export function clone( target ) {
  return array(target) ? [].concat(target) : plainObject(target) ? mixin(true, {}, target) : target;
}

/**
 * 生成随机 ID
 *
 * @param {*} prefix 随机 ID 的前缀
 */
export function generateRandomId( prefix ) {
  return `${prefix}-${(new Date()).getTime().toString(32).toUpperCase()}`;
}

/**
 * 初始化 Bootstrap 所提供的工具提示
 * 
 * https://getbootstrap.com/docs/3.3/javascript/#tooltips
 * 
 * @param {*} $el 目标元素
 * @param {*} opts 配置项
 */
export function initBootstrapTooltip( $el, opts ) {
  $el.tooltip(mixin(true, {placement: "auto bottom", trigger: "hover", container: "body"}, opts));
}

export {
  func as isFunction,
  string as isString,
  array as isArray,
  plainObject as isPlainObject,
  includes as inArray,
  arrayify as toArray,
  each as arrayEach,
  map as arrayMap,
  filter as arrayFilter,
  last as arrayLast,
  keys as objectKeys,
  hasOwnProp, mixin
}
