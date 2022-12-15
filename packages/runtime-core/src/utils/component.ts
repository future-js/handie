import type { ComponentType, ComponentCtor, ComponentDescriptor } from '../vendors/organik';

const keyTypeMap: Record<string, ComponentType> = {
  controls: 'control',
  widgets: 'widget',
  renderers: 'renderer',
};

function convertToDescriptors(
  map: Record<string, ComponentCtor>,
  type: ComponentType = 'control',
): ComponentDescriptor[] {
  return Object.keys(map).map(name => ({ name, ctor: map[name], type }));
}

function resolveComponentDescriptors(
  map: Partial<Record<'controls' | 'widgets' | 'renderers', Record<string, ComponentCtor>>>,
): ComponentDescriptor[] {
  const ctors: ComponentDescriptor[] = [];

  ['controls', 'widgets', 'renderers'].forEach(key => {
    if (map[key]) {
      ctors.push(...convertToDescriptors(map[key], keyTypeMap[key]));
    }
  });

  return ctors;
}

export { resolveComponentDescriptors };
