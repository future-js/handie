import { hasOwnProp } from './helper';

/**
 * 判断是否支持 CSS 的 `pointer-events`
 */
export function supportPointerEvents() {
  const style = document.createElement('a').style;

  style.cssText = 'pointer-events:auto';

  return style.pointerEvents === 'auto';
}

/**
 * 判断是否支持 Web Sockets API
 */
export function supportWebSocket() {
  return hasOwnProp('WebSocket', window);
}

/**
 * 判断是否支持 Web Notifications API
 */
export function supportWebNotification() {
  return hasOwnProp('Notification', window);
}

/**
 * 判断是否支持 Local Storage API
 */
export function supportLocalStorage() {
  return hasOwnProp('localStorage', window);
}
