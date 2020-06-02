import { isFunction, isPlainObject, map, mixin } from '@ntks/toolbox';
import { invokeDingTalkApi } from './helper';

/**
 * 调用通知类 API
 *
 * @param {*} shortcut API 简写
 * @param {*} opts 配置项
 */
function invokeNotificationApi(shortcut: string, opts: any): void {
  return invokeDingTalkApi(`device.notification.${shortcut}`, opts);
}

export default {
  alert(message: any, callback: Function = function () {}): void {
    invokeNotificationApi(
      'alert',
      mixin(
        {
          title: '',
          buttonName: '知道了',
          onSuccess: callback,
        },
        isPlainObject(message) ? message : { message },
      ),
    );
  },
  confirm(message: any, agreed: Function = function () {}, cancelled: Function = function () {}): void {
    invokeNotificationApi(
      'confirm',
      mixin(
        {
          title: '',
          buttonLabels: ['确定', '取消'],
          onSuccess: (result: any) => (result.buttonIndex === 0 ? agreed() : cancelled()),
        },
        isPlainObject(message) ? message : { message },
      ),
    );
  },
  // prompt() {},
  toast(opts: any): void {
    const { text, icon, duration, callback: onSuccess } = opts;

    invokeNotificationApi('toast', {
      text,
      icon: icon === 'fail' ? 'error' : icon,
      duration,
      delay: 0,
      onSuccess,
    });
  },
  loading: {
    show(opts: any): void {
      const { text, callback: onSuccess } = opts;

      invokeNotificationApi('showPreloader', {
        text,
        showIcon: true,
        onSuccess,
      });
    },
    hide(callback: Function): void {
      invokeNotificationApi('hidePreloader', { onSuccess: callback });
    },
  },
  actionSheet(opts: any): void {
    const { title, cancel, actions } = opts;

    invokeNotificationApi('actionSheet', {
      title,
      cancelButton: cancel.text,
      otherButtons: map(actions, (action: any) => action.text),
      onSuccess: (result: any) => {
        const { buttonIndex: idx } = result;

        let action, handler;

        if (idx === -1) {
          handler = cancel.handler;
        } else {
          action = actions[idx];
          handler = action.handler;
        }

        if (!isFunction(handler)) {
          handler = opts.handler;
        }

        return action ? handler(action) : handler();
      },
    });
  },
};
