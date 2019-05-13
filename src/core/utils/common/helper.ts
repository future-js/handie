export function toString( target: any ): string {
  return Object.prototype.toString.call(target);
}

export function hasOwnProp( prop: string, obj: object ): boolean {
  return obj != null && Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * 使字符串首字母大写
 */
export function capitalize( str: string ): string {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

/**
 * 生成随机 ID
 *
 * @param {*} prefix 随机 ID 的前缀
 */
export function generateRandomId( prefix: string ): string {
  return `${prefix}-${(new Date()).getTime().toString(32).toUpperCase()}`;
}
