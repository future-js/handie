import { isFunction } from '@handie/runtime-core';

import type { VuexStoreModule, StoreCreator, StoreModule } from '../types';

type VuexStoreModuleTree = { [key: string]: VuexStoreModule };

let storeCreator = (() => function () {} as any) as StoreCreator; // eslint-disable-line @typescript-eslint/no-empty-function

function setStoreCreator(creator: StoreCreator): void {
  if (isFunction(creator)) {
    storeCreator = creator;
  }
}

function resolveVuexModuleTree(moduleConfig: StoreModule[]): VuexStoreModuleTree {
  const modules: VuexStoreModuleTree = {};

  moduleConfig.forEach(({ name, store }) => {
    modules[name] = {
      ...store,
      namespaced: true,
    };
  });

  return modules;
}

function createStore(storeModules: StoreModule[]): any {
  return storeCreator(resolveVuexModuleTree(storeModules));
}

export { setStoreCreator, resolveVuexModuleTree, createStore };
