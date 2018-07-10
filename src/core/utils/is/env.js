/**
 * 获取用户代理字符串
 */
function getUserAgent() {
  return window.navigator.userAgent;
}

/**
 * 钉钉
 * 
 * 参考 https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7386797.0.0.tW7djx&source=search&treeId=173&articleId=107515&docType=1
 */
export function isDingTalk() {
  return window.dd && window.dd.version ? 'mobile' : window.DingTalkPC && window.DingTalkPC.ua && window.DingTalkPC.ua.isInDingTalk ? 'pc' : false;
}

/**
 * 微信
 */
export function isWeChat() {
  return /micromessenger/ig.test(getUserAgent());
}

/**
 * Android
 */
export function isAndroid() {
  return /android|adr/ig.test(getUserAgent());
}
