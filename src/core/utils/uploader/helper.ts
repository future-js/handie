import { hasOwnProp } from '../common/helper';

/**
 * 判断是否支持 Plupload
 */
export function supportPlupload(): boolean {
  return hasOwnProp('plupload', window) && hasOwnProp('Uploader', plupload);
}

/**
 * 判断是否支持七牛
 */
export function supportQiniu(): boolean {
  return hasOwnProp('Qiniu', window) && hasOwnProp('uploader', Qiniu);
}
