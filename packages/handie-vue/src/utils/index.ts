import Vue, { CreateElement, VNode } from 'vue';

import {
  EventWithNamespace,
  isFunction,
  toKebabCase,
  getControl,
  createBindEventResolver,
} from '@handie/runtime-core';

let cachedVueApp: Vue | undefined;

function setVueApp(app: Vue): void {
  cachedVueApp = app;
}

function getVueApp(): Vue | undefined {
  return cachedVueApp;
}

function getViewLibInstId(vm: any): string {
  return vm._uid;
}

function getEventWithNamespace(vm: any, event: string = ''): EventWithNamespace {
  return `${event}.vue_inst_${getViewLibInstId(vm)}`;
}

const resolveBindEvent = createBindEventResolver(getEventWithNamespace);

function isComponentCtor(ctor: any): boolean {
  return isFunction(ctor) && !!(ctor as any).extendOptions;
}

function createNode(h: CreateElement, componentName: string, ...args: any[]): VNode {
  const node = h(getControl(componentName), ...args);

  if (node.componentOptions && !node.componentOptions.tag) {
    node.componentOptions.tag = toKebabCase(componentName); // hack for some situations like https://github.com/view-design/ViewUI/blob/v4.6.1/src/components/select/select.vue#L122
  }

  return node;
}

export {
  setVueApp,
  getVueApp,
  getViewLibInstId,
  getEventWithNamespace,
  resolveBindEvent,
  isComponentCtor,
  createNode,
};
