import { ComponentName, ComponentType, ComponentCtor, ComponentDescriptor } from './typing';

const componentMap = new Map<ComponentType, Map<ComponentName, ComponentCtor>>();

function registerComponent({ type = 'control', name, ctor }: ComponentDescriptor): void {
  const ctorMap = componentMap.get(type) || new Map<ComponentName, ComponentCtor>();

  ctorMap.set(name, ctor);
  componentMap.set(type, ctorMap);
}

function getComponent(type: ComponentType, name: ComponentName): ComponentCtor | undefined {
  const ctorMap = componentMap.get(type);

  return ctorMap ? ctorMap.get(name) : undefined;
}

const getControl = getComponent.bind(null, 'control');

const getWidget = getComponent.bind(null, 'widget');

const getRenderer = getComponent.bind(null, 'renderer');

export { registerComponent, getControl, getWidget, getRenderer };
