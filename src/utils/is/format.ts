/**
 * 判断是否为一个 URL
 *
 * @param {*} target 目标
 */
export function isUrl( target: string ): boolean {
  return /^((http(s)?\:)?\/\/|\/[^\/]+).+/i.test(target);
}

/**
 * 判断是否为电子邮箱
 *
 * 参考 https://html.spec.whatwg.org/multipage/forms.html#e-mail-state-(type=email)
 *
 * @param {*} target 目标
 */
export function isEmail( target: string ): boolean {
  return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(target);
}

/**
 * 判断是否为手机号
 *
 * @param {*} target 目标
 */
export function isCellphone( target: string ): boolean {
  return /^1[345789]\d{9}$/.test(target);
}
