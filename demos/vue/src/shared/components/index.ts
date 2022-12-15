import { ComponentType, ComponentCtor, ComponentDescriptor } from '../types';

import * as controls from './control';
import * as widgets from './widget';
import * as renderers from './renderer';

function convertToDescriptors(
  map: Record<string, ComponentCtor>,
  type: ComponentType = 'control',
): ComponentDescriptor[] {
  return Object.keys(map).map(name => ({ name, ctor: map[name], type }));
}

export default ([] as ComponentDescriptor[]).concat(
  convertToDescriptors(controls),
  convertToDescriptors(widgets, 'widget'),
  convertToDescriptors(renderers, 'renderer'),
);
