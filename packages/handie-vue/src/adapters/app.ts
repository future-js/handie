import Vue, { ComponentOptions } from 'vue';
import VueRouter from 'vue-router';

import type { MessageShortcutType, MessageShortcutMethod } from 'petals-ui/dist/message';
import {
  HistoryLocation,
  AppHelper,
  AppInstance,
  isPlainObject,
  getControl,
  createApp as _createApp,
} from '@handie/runtime-core';

import type { StoreModule } from '../types/store';
import type { ModuleDescriptor } from '../types/module';
import type { AppCreators, AppDescriptor } from '../types/app';

import { setVueApp, getVueApp } from '../utils';
import { setRoutes, getLocation, resolveHistoryParams } from './history';
import { setRouterCreator, createRouter } from './router';
import { setStoreCreator, createStore } from './store';

function generateMessageHelper(type: MessageShortcutType): MessageShortcutMethod {
  return (message, ...args: any[]) => {
    const lastParam = args.slice(-1);

    (getControl('Message') as any).show(
      message,
      ...(isPlainObject(lastParam)
        ? [...args.slice(0, args.length - 1), { ...lastParam, type }]
        : [...args, { type }]),
    );
  };
}

function createAppHelper(): Omit<AppHelper, 'session'> {
  const Dialog = getControl('Dialog') as any;

  return {
    history: {
      getLocation,
      back: () => getVueApp()!.$router.back(),
      forward: () => getVueApp()!.$router.forward(),
      go: (delta?: number) => getVueApp()!.$router.go(delta!),
      push: (location: HistoryLocation) =>
        getVueApp()!.$router.push(resolveHistoryParams(location)),
      replace: (location: HistoryLocation) =>
        getVueApp()!.$router.replace(resolveHistoryParams(location)),
    },
    alert: Dialog.alert,
    confirm: Dialog.confirm,
    success: generateMessageHelper('success'),
    error: generateMessageHelper('error'),
    warning: generateMessageHelper('warning'),
    info: generateMessageHelper('info'),
  };
}

function setCreators({ router, store }: AppCreators): void {
  if (router) {
    setRouterCreator(router);
  }

  if (store) {
    setStoreCreator(store);
  }
}

function resolveStoreModules(
  storeModules?: StoreModule[],
  modules?: ModuleDescriptor[],
): StoreModule[] {
  if (storeModules) {
    return storeModules;
  }

  const resolved: StoreModule[] = [];

  if (modules) {
    modules.forEach(({ name, store }) => {
      if (store) {
        resolved.push({ name, store });
      }
    });
  }

  return resolved;
}

function createApp({
  plugins = [],
  creators = {},
  root,
  el,
  routes = [],
  provider,
  storeModules,
  ...otherOptions
}: AppDescriptor): AppInstance {
  const vueAppInitNeeded = !!(root || el);
  const { router, store, ...otherCreators } = creators;

  if (vueAppInitNeeded) {
    Vue.config.productionTip = false;

    Vue.use(VueRouter);

    plugins.forEach(plugin => {
      if (plugin !== VueRouter) {
        Vue.use(plugin);
      }
    });

    if (router || store) {
      setCreators({ router, store });
    }
  }

  setRoutes(routes);

  if (!otherCreators.appHelper) {
    otherCreators.appHelper = createAppHelper;
  }

  const _app = _createApp({ ...otherOptions, creators: otherCreators });

  if (!vueAppInitNeeded) {
    return _app;
  }

  const opts = {
    render: h => h(root || Vue.extend({ name: 'HandieApp', render: h => h('router-view') })),
    router: createRouter(routes),
    provide: { routes },
  } as ComponentOptions<Vue>;

  if (el) {
    opts.el = el;
  }

  const resolvedStoreModules = resolveStoreModules(
    storeModules,
    (otherOptions.metadata || {}).modules,
  );

  if (resolvedStoreModules.length > 0) {
    (opts as any).store = createStore(resolvedStoreModules);
  }

  if (provider) {
    opts.provide = { ...opts.provide, ...provider };
  }

  const app = new Vue(opts);

  setVueApp(app);

  return {
    mount: (elementOrSelector: Element | string = '#app') => {
      if (el) {
        return;
      }

      app.$mount(elementOrSelector);
    },
  };
}

export { createApp };
