// @ts-ignore
import { history } from 'umi';
import { MessageShortcutType, MessageShortcutMethod } from 'petals-ui/dist/message';
import {
  HistoryLocation,
  AppHelper,
  AppInstance,
  isPlainObject,
  createApp as _createApp,
} from 'handie-react-starter-antd';

import { AppDescriptor } from '../types/app';
import { Dialog, Message } from '../controls';
import { setRoutes, getLocation, resolveHistoryParams } from './history';

function generateMessageHelper(type: MessageShortcutType): MessageShortcutMethod {
  return (message, ...args: any[]) => {
    const lastParam = args.slice(-1);

    Message.show(
      message,
      ...(isPlainObject(lastParam)
        ? [...args.slice(0, args.length - 1), { ...lastParam, type }]
        : [...args, { type }]),
    );
  };
}

function createAppHelper(): AppHelper {
  return {
    history: {
      getLocation,
      back: history.goBack,
      forward: history.goForward,
      go: history.go,
      push: (location: HistoryLocation) => history.push(resolveHistoryParams(location)),
      replace: (location: HistoryLocation) => history.replace(resolveHistoryParams(location)),
    },
    alert: Dialog.alert,
    confirm: Dialog.confirm,
    success: generateMessageHelper('success'),
    error: generateMessageHelper('error'),
    warning: generateMessageHelper('warning'),
    info: generateMessageHelper('info'),
  };
}

function createApp({ routes, ...others }: AppDescriptor): AppInstance {
  setRoutes(routes);

  return _createApp({ ...others, creators: { appHelper: createAppHelper } });
}

export { createApp };
