type ComponentName = string;

type ComponentType = 'control' | 'widget' | 'renderer';

type ComponentCtor = Function; // eslint-disable-line @typescript-eslint/ban-types

type ComponentGetter = () => ComponentCtor;

interface ComponentDescriptor {
  name: ComponentName;
  ctor: ComponentCtor;
  type?: ComponentType;
}

export type { ComponentName, ComponentType, ComponentCtor, ComponentGetter, ComponentDescriptor };
