export function toString( target ) {
  return Object.prototype.toString.call(target);
}

export function hasOwnProp( prop, obj ) {
  return obj != null && Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * 使字符串首字母大写
 */
export function capitalize( str ) {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

/**
 * 生成随机 ID
 *
 * @param {*} prefix 随机 ID 的前缀
 */
export function generateRandomId( prefix ) {
  return `${prefix}-${(new Date()).getTime().toString(32).toUpperCase()}`;
}
