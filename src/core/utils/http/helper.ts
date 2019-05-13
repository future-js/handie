import { isFunction, isPlainObject } from '../is/type';

/**
 * 判断是否支持 jQuery
 */
export function supportJquery(): boolean {
  return isFunction(jQuery) && isFunction(jQuery.ready) && isPlainObject(jQuery.support) && isPlainObject(jQuery.fn);
}

/**
 * 判断是否支持 Axios
 */
export function supportAxios(): boolean {
  return isFunction(axios) && isFunction(axios.get) && isFunction(axios.put) && isFunction(axios.post) && isFunction(axios.delete) && isFunction(axios.options) && isFunction(axios.head) && isFunction(axios.patch) && isFunction(axios.request);
}
