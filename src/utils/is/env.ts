import { hasOwnProp } from '../common/helper';

/**
 * 获取用户代理字符串
 */
function getUserAgent(): string {
  return window.navigator.userAgent;
}

/**
 * 钉钉
 *
 * 参考 https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7386797.0.0.tW7djx&source=search&treeId=173&articleId=107515&docType=1
 */
export function isDingTalk(): boolean | 'mobile' | 'pc' {
  return hasOwnProp('dd', window) && dd.version
    ? 'mobile'
    : hasOwnProp('DingTalkPC', window) && DingTalkPC.ua && DingTalkPC.ua.isInDingTalk
    ? 'pc'
    : false;
}

/**
 * 微信
 */
export function isWeChat(): boolean {
  return /micromessenger/gi.test(getUserAgent());
}

/**
 * Android
 */
export function isAndroid(): boolean {
  return /android|adr/gi.test(getUserAgent());
}
