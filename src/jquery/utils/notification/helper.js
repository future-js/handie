import { isNumeric, supportLocalStorage } from '../common/helper';

const NOTIFICATION_STORAGE_KEY = 'MUU:NotificationCount';

let noticeTotalCount = 0;

function resolveCounterDom() {
  const $notice = $('.Action--notification');

  if ( $notice.length === 0 ) {
    return;
  }

  let $counter = $('.Notification-counter', $notice);

  if ( $counter.length === 0 ) {
    $counter = $(`<span class="Notification-counter"></span>`);

    $('.Action-trigger', $notice).append($counter);
  }

  return $counter;
}

export function resetNotificationCounter( $counter = resolveCounterDom() ) {
  noticeTotalCount = 0;

  if ( $counter ) {
    $counter.remove();
  }

  if ( supportLocalStorage() ) {
    localStorage.removeItem(NOTIFICATION_STORAGE_KEY);
  }
}

export function countNotification( count ) {
  noticeTotalCount += count;

  const $counter = resolveCounterDom();

  if ( noticeTotalCount === 0 ) {
    resetNotificationCounter($counter);
  }
  else {
    if ( $counter ) {
      $counter.text(noticeTotalCount > 99 ? '99+' : noticeTotalCount);
    }

    if ( supportLocalStorage() ) {
      localStorage.setItem(NOTIFICATION_STORAGE_KEY, noticeTotalCount);
    }
  }
}

export function initNotificationCounter() {
  if ( supportLocalStorage() ) {
    const count = localStorage.getItem(NOTIFICATION_STORAGE_KEY);

    if ( count && isNumeric(count) ) {
      countNotification(count * 1);
    }
  }
}

export function getNoticeTotalCount() {
  return noticeTotalCount;
}
