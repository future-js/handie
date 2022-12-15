import Vue from 'vue';

import {
  ModuleContextDescriptor,
  createModuleContext as _createModuleContext,
} from '@handie/runtime-core';

import type { ModuleContext } from '../types/module';

const vm = new Vue();

function callVuexMethodWithNamespace(
  namespace: string,
  methodName: 'commit' | 'dispatch',
  type: string,
  payload?: any,
): void {
  const store = (vm as any).$store;

  if (!store) {
    return;
  }

  store[methodName](`${namespace}/${type}`, payload);
}

function createModuleContext(descriptor: ModuleContextDescriptor | string): ModuleContext {
  const ctx = _createModuleContext(descriptor) as ModuleContext;
  const flag = '__hacked_by_handie';

  if (!(ctx as any)[flag]) {
    const callVuexMethod = callVuexMethodWithNamespace.bind(null, ctx.getModuleName());

    ctx.commit = callVuexMethod.bind(null, 'commit');
    ctx.dispatch = async (type: string, payload?: any) => callVuexMethod('dispatch', type, payload);
    ctx[flag] = true;
  }

  return ctx;
}

export { createModuleContext };
