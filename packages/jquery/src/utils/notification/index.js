import {
  isFunction, isPlainObject, isString, isNumeric,
  includes, each, map,
  capitalize, hasOwnProp, clone,
  supportWebNotification,
} from '../common/helper';
import { setDefaults, getDefaults } from '../storage/helper';
import { getNoticeTotalCount, countNotification, resetNotificationCounter } from './helper';

import NOTIFICATION_DEFAULTS from './defaults';

setDefaults('notification', NOTIFICATION_DEFAULTS);

const noticeLayerTypes = ['info', 'success', 'warning', 'danger'];

/**
 * 判断是否已获得用户的桌面通知授权
 *
 * @param {*} permission 用户授权字符串
 */
function isPermissionGranted( permission ) {
  return permission === 'granted';
}

/**
 * 新建桌面通知
 *
 * @param {*} opts
 */
function spawnNotification( opts ) {
  const copy = clone(opts);
  const events = ['click', 'error', 'close', 'show'];

  delete opts.title;

  // 删除自定义事件参数
  each(events, evtName => {
    delete opts[`on${capitalize(evtName)}`];
  });

  const notification = new Notification(copy.title, opts);

  // 绑定事件
  each(events, evtName => {
    const handler = copy[`on${capitalize(evtName)}`];

    if ( isFunction(handler) ) {
      notification[`on${evtName}`] = handler;
    }
  });

  return notification;
}

function showNoticeLayer( text, type, forceOver ) {
  const opts = getDefaults('notification.layer');

  let $layer = $('.Page-body > .Layer--notice');
  let cls = [];

  if ( $layer.length === 0 ) {
    cls.push('Layer--notice');

    if ( opts.size !== 'normal' && includes(opts.size, ['medium', 'large']) ) {
      cls.push(`is-${opts.size}`);
    }

    $layer = $(`<div class="${cls.join(' ')}"><i class="fa fa-fw"></i><span></span></div>`);

    if ( opts.alignClasses[opts.align] ) {
      $layer.addClass(opts.alignClasses[opts.align]);
    }

    $('.Page-body').prepend($layer);

    $layer.on('webkitAnimationEnd animationend', () => $layer.removeClass('is-shown'));
  }
  else {
    $layer.removeClass(map(['bg', 'text'], p => map(noticeLayerTypes, t => `${p}-${t}`)).concat('is-shown', 'is-over').join(' '));
    $('.fa', $layer).removeClass(map(noticeLayerTypes, t => opts.icons[t]).join(' '));
  }

  if ( !includes(type, noticeLayerTypes) ) {
    type = 'info';
  }

  $('.fa', $layer).addClass(opts.icons[type]);
  $('span', $layer).html(text);

  cls = [`bg-${type}`, `text-${type}`, 'is-shown'];

  if ( forceOver === true || $('.modal:visible').length ) {
    cls.push('is-over');
  }

  $layer.addClass(cls.join(' '));
}

function generateNoticeUtil( type ) {
  return ( text, forceOver ) => showNoticeLayer(text, type, forceOver);
}

export const info = generateNoticeUtil('info');

export const success = generateNoticeUtil('success');

export const warning = generateNoticeUtil('warning');

export const danger = generateNoticeUtil('danger');

export function show( opts ) {
  if ( isString(opts) ) {
    opts = {title: opts};
  }

  if ( !(supportWebNotification() && isPlainObject(opts) && hasOwnProp('title', opts)) ) {
    return;
  }

  let notification;

  if ( isPermissionGranted(Notification.permission) ) {
    notification = spawnNotification(opts);
  }
  else if ( Notification.permission !== 'denied' ) {
    Notification.requestPermission(permission => {
      if ( isPermissionGranted(permission) ) {
        spawnNotification(opts);
      }
    });
  }

  return notification;
}

export function count( count ) {
  const totalCount = getNoticeTotalCount();

  if ( isNumeric(count) && (count * 1 > 0 || totalCount !== 0) ) {
    countNotification(count * 1);
  }

  return totalCount;
}

export function clear() {
  resetNotificationCounter();
}
