import { mixin } from '../../utils/collection';

const DEFAULT_FONT_BASELINE = 14;
const DEFAULT_DRAFT_BASELINE = 375;   // iPhone 6/7

let flexibleAdaptorTimer;

/**
 * 设置页面根元素的字体大小
 * 
 * @param {*} fontBaseline 字体大小基准值
 * @param {*} draftBaseline 设计稿宽度基准值
 */
function setFontSize( fontBaseline, draftBaseline ) {
  const rootEl = document.documentElement;
  const width = rootEl.clientWidth;

  if ( !width ) {
    return;
  }

  rootEl.style.fontSize = `${fontBaseline * width / draftBaseline}px`;
}

/**
 * 监听 `window` 对象的事件
 * 
 * @param {*} name 事件名称
 * @param {*} handler 事件处理函数
 */
function bindWindowEvent( name, handler ) {
  window.addEventListener(name, handler, false);
}

/**
 * 设置定时器
 * 
 * @param {*} handler 处理函数
 * @param {*} timeout 延时时间
 */
function setFlexibleAdaptorTimer( handler, timeout = 300 ) {
  clearTimeout(flexibleAdaptorTimer);

  flexibleAdaptorTimer = setTimeout(handler, timeout);
}

export default function( opts ) {
  opts = mixin({font: DEFAULT_FONT_BASELINE, draft: DEFAULT_DRAFT_BASELINE}, opts);

  const handler = () => setFontSize(opts.font, opts.draft);

  bindWindowEvent('resize', () => setFlexibleAdaptorTimer(handler));
  bindWindowEvent('pageshow', evt => evt.persisted && setFlexibleAdaptorTimer(handler));

  handler();
}
