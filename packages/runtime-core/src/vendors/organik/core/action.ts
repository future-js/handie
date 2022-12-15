import { isString } from '@ntks/toolbox';

import { ActionDescriptor } from './typing';

const actionMap = new Map<string, ActionDescriptor>();

function registerAction(name: string | ActionDescriptor, action?: ActionDescriptor): void {
  let resolvedName: string;
  let resolvedDescriptor: ActionDescriptor;

  if (isString(name)) {
    resolvedDescriptor = action!;
    resolvedName = name as string;
  } else {
    resolvedDescriptor = name as ActionDescriptor;
    resolvedName = resolvedDescriptor.name!;
  }

  actionMap.set(resolvedName, resolvedDescriptor);
}

function getAction(name: string): ActionDescriptor | undefined {
  return actionMap.get(name);
}

function resolveAction(refOrDescriptor: string | ActionDescriptor): ActionDescriptor | undefined {
  if (isString(refOrDescriptor)) {
    return getAction(refOrDescriptor as string);
  }

  const descriptor = refOrDescriptor as ActionDescriptor;

  if (!descriptor.name) {
    return descriptor;
  }

  const registered = getAction(descriptor.name);

  return registered ? { ...registered, ...descriptor } : descriptor;
}

export { registerAction, resolveAction };
