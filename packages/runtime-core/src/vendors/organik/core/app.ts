import { isString, isFunction, noop, clone } from '@ntks/toolbox';

import { LocationDescriptor, HistoryLocation, UserAuthority, AppHelper } from './typing/app';

function resolveUrl(location: HistoryLocation): string {
  return isString(location) ? (location as string) : (location as LocationDescriptor).path || '';
}

let authorityMapGetter: () => UserAuthority = () => null;

function setUserAuthorityGetter(newGetter: () => UserAuthority): void {
  authorityMapGetter = newGetter;
}

function getUserAuthority(): UserAuthority {
  return authorityMapGetter();
}

let appHelper: AppHelper = {
  history: {
    getLocation() {
      return {
        name: '',
        path: location.pathname,
        rawPath: location.pathname,
        hash: location.hash,
        query: {},
        params: {},
        ancestors: [],
      };
    },
    back: window.history.back,
    forward: window.history.forward,
    go: window.history.go,
    push(location: HistoryLocation) {
      return window.history.pushState({}, '', resolveUrl(location));
    },
    replace(location: HistoryLocation) {
      return window.history.replaceState({}, '', resolveUrl(location));
    },
  },
  session: {
    getAuthority: getUserAuthority,
  },
  alert(message: string, callback) {
    window.alert(message);

    if (isFunction(callback)) {
      callback();
    }
  },
  confirm: window.confirm,
  success: noop,
  error: noop,
  warning: noop,
  info: noop,
};

function getAppHelperForInternalUse(): AppHelper {
  return appHelper;
}

function registerAppHelper(helper: Omit<AppHelper, 'session'>): void {
  appHelper = {
    ...clone(helper),
    session: {
      getAuthority: getUserAuthority,
    },
  };
}

function getAppHelper(): AppHelper {
  return clone(appHelper);
}

export { setUserAuthorityGetter, getAppHelperForInternalUse, registerAppHelper, getAppHelper };
