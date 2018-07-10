import { hasOwnProp } from '../common/helper';

/**
 * 判断是否支持 Plupload
 */
export function supportPlupload() {
  return hasOwnProp('plupload', window) && hasOwnProp('Uploader', window.plupload);
}

/**
 * 判断是否支持七牛
 */
export function supportQiniu() {
  return hasOwnProp('Qiniu', window) && hasOwnProp('uploader', window.Qiniu);
}
