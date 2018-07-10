import { isFunction, isPlainObject } from '../../../utils/is/type';
import { map, mixin } from '../../../utils/collection';
import { invokeDingTalkApi } from './helper';

/**
 * 调用通知类 API
 * 
 * @param {*} shortcut API 简写
 * @param {*} opts 配置项
 */
function invokeNotificationApi( shortcut, opts ) {
  return invokeDingTalkApi(`device.notification.${shortcut}`, opts);
}

export default {
  alert( message, callback = function() {} ) {
    invokeNotificationApi('alert', mixin({
      title: '',
      buttonName: '知道了',
      onSuccess: callback
    }, isPlainObject(message) ? message : {message}));
  },
  confirm( message, agreed = function() {}, cancelled = function() {} ) {
    invokeNotificationApi('confirm', mixin({
      title: '',
      buttonLabels: ['确定', '取消'],
      onSuccess: result => result.buttonIndex === 0 ? agreed() : cancelled()
    }, isPlainObject(message) ? message : {message}));
  },
  // prompt() {},
  toast( opts ) {
    const { text, icon, duration, callback: onSuccess } = opts;

    invokeNotificationApi('toast', {
      text,
      icon: icon === 'fail' ? 'error' : icon,
      duration,
      delay: 0,
      onSuccess
    });
  },
  loading: {
    show( opts ) {
      const { text, callback: onSuccess } = opts;

      invokeNotificationApi('showPreloader', {
        text,
        showIcon: true,
        onSuccess
      });
    },
    hide( callback ) {
      invokeNotificationApi('hidePreloader', {onSuccess: callback});
    }
  },
  actionSheet( opts ) {
    const { title, cancel, actions } = opts;

    invokeNotificationApi('actionSheet', {
      title,
      cancelButton: cancel.text,
      otherButtons: map(actions, action => action.text),
      onSuccess: result => {
        const { buttonIndex: idx } = result;
  
        let action, handler;
  
        if ( idx === -1 ) {
          handler = cancel.handler;
        }
        else {
          action = actions[idx];
          handler = action.handler;
        }
  
        if ( !isFunction(handler) ) {
          handler = opts.handler;
        }
  
        return action ? handler(action) : handler();
      }
    });
  }
}
