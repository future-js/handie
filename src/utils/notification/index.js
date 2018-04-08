import {
  isFunction, isPlainObject,
  inArray, arrayEach, arrayMap,
  capitalize, hasOwnProp, clone
} from "../common/helper";
import { supportWebNotification, supportLocalStorage } from "../common/supports";
import { defaults } from "../common/settings";

const NOTIFICATION_STORAGE_KEY = "MUU:NotificationCount";
const noticeLayerTypes = ["info", "success", "warning", "danger"];

let noticeTotalCount = 0;

/**
 * 判断是否已获得用户的桌面通知授权
 *
 * @param {*} permission 用户授权字符串
 */
function isPermissionGranted( permission ) {
  return permission === "granted";
}

/**
 * 新建桌面通知
 *
 * @param {*} opts
 */
function spawnNotification( opts ) {
  const copy = clone(opts);
  const events = ["click", "error", "close", "show"];

  delete opts.title;

  // 删除自定义事件参数
  arrayEach(events, function( evtName ) {
    delete opts[`on${capitalize(evtName)}`];
  });

  const notification = new Notification(copy.title, opts);

  // 绑定事件
  arrayEach(events, function( evtName ) {
    const handler = copy[`on${capitalize(evtName)}`];

    if ( isFunction(handler) ) {
      notification[`on${evtName}`] = handler;
    }
  });

  return notification;
}

function resolveCounterDom() {
  const $notice = $(".Action--notification");

  if ( $notice.length === 0 ) {
    return;
  }

  let $counter = $(".Notification-counter", $notice);

  if ( $counter.length === 0 ) {
    $counter = $(`<span class="Notification-counter"></span>`);

    $(".Action-trigger", $notice).append($counter);
  }

  return $counter;
}

function initNotificationCounter() {
  if ( supportLocalStorage() ) {
    const count = localStorage.getItem(NOTIFICATION_STORAGE_KEY);

    if ( count && $.isNumeric(count) ) {
      countNotification(count * 1);
    }
  }
}

function resetNotificationCounter( $counter = resolveCounterDom() ) {
  noticeTotalCount = 0;

  if ( $counter ) {
    $counter.remove();
  }

  if ( supportLocalStorage() ) {
    localStorage.removeItem(NOTIFICATION_STORAGE_KEY);
  }
}

function countNotification( count ) {
  noticeTotalCount += count;

  const $counter = resolveCounterDom();

  if ( noticeTotalCount === 0 ) {
    resetNotificationCounter($counter);
  }
  else {
    if ( $counter ) {
      $counter.text(noticeTotalCount > 99 ? "99+" : noticeTotalCount);
    }

    if ( supportLocalStorage() ) {
      localStorage.setItem(NOTIFICATION_STORAGE_KEY, noticeTotalCount);
    }
  }
}

function showNoticeLayer( text, type, forceOver ) {
  const opts = defaults.notification.layer;

  let $layer = $(".Page-body > .Layer--notice");
  let cls = [];

  if ( $layer.length === 0 ) {
    cls.push("Layer--notice");

    if ( opts.size !== "normal" && inArray(opts.size, ["medium", "large"]) ) {
      cls.push(`is-${opts.size}`);
    }

    $layer = $(`<div class="${cls.join(" ")}"><i class="fa fa-fw"></i><span></span></div>`);

    if ( opts.alignClasses[opts.align] ) {
      $layer.addClass(opts.alignClasses[opts.align]);
    }

    $(".Page-body").prepend($layer);

    $layer.on("webkitAnimationEnd animationend", function() {
      $layer.removeClass("is-shown");
    });
  }
  else {
    $layer.removeClass(arrayMap(["bg", "text"], function( p ) {
      return arrayMap(noticeLayerTypes, function( t ) {
        return `${p}-${t}`;
      });
    }).concat("is-shown", "is-over").join(" "));

    $(".fa", $layer).removeClass(arrayMap(noticeLayerTypes, function( t ) {
      return opts.icons[t];
    }).join(" "));
  }

  if ( !inArray(type, noticeLayerTypes) ) {
    type = "info";
  }

  $(".fa", $layer).addClass(opts.icons[type]);
  $("span", $layer).html(text);

  cls = [`bg-${type}`, `text-${type}`, `is-shown`];

  if ( forceOver === true || $(".modal:visible").length ) {
    cls.push("is-over");
  }

  $layer.addClass(cls.join(" "));
}

function generateNoticeUtil( type ) {
  return function( text, forceOver ) {
    return showNoticeLayer(text, type, forceOver);
  };
}

export const info = generateNoticeUtil("info");

export const success = generateNoticeUtil("success");

export const warning = generateNoticeUtil("warning");

export const danger = generateNoticeUtil("danger");

export function show( opts ) {
  if ( isString(opts) ) {
    opts = {title: opts};
  }

  if ( !(supportWebNotification() && isPlainObject(opts) && hasOwnProp("title", opts)) ) {
    return;
  }

  let notification;

  if ( isPermissionGranted(Notification.permission) ) {
    notification = spawnNotification(opts);
  }
  else if ( Notification.permission !== "denied" ) {
    Notification.requestPermission(function( permission ) {
      if ( isPermissionGranted(permission) ) {
        spawnNotification(opts);
      }
    });
  }

  return notification;
}

export function count( count ) {
  if ( $.isNumeric(count) && (count * 1 > 0 || noticeTotalCount !== 0) ) {
    countNotification(count * 1);
  }

  return noticeTotalCount;
}

export function clear() {
  resetNotificationCounter();
}
