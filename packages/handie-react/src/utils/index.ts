import {
  EventWithNamespace,
  isFunction,
  generateRandomId,
  createBindEventResolver,
} from '@handie/runtime-core';

let idCounter = 0;

function generateWidgetId(): string {
  idCounter++;

  return `${generateRandomId('HandieReactWidget')}-${idCounter}`;
}

function getViewLibInstId(reactEl: any): string {
  return reactEl.__handieReactWidgetId;
}

function getEventWithNamespace(reactEl: any, event: string = ''): EventWithNamespace {
  return `${event}.react_inst_${getViewLibInstId(reactEl)}`;
}

const resolveBindEvent = createBindEventResolver(getEventWithNamespace);

function isComponentCtor(ctor: any): boolean {
  return isFunction(ctor);
}

export {
  generateWidgetId,
  getViewLibInstId,
  getEventWithNamespace,
  resolveBindEvent,
  isComponentCtor,
};
