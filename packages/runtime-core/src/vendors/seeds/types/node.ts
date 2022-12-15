import type { ClassName } from '@petals/basic';

import type { ComponentCtor } from '../../organik';

interface NodeDescriptor<CtorType extends ComponentCtor = ComponentCtor> {
  tag: string | CtorType;
  className?: ClassName;
  style?: Record<string, any> | string;
  props?: Record<string, any>;
  attrs?: Record<string, any>;
  key?: string | number;
  ref?: string;
}

export type { NodeDescriptor };
