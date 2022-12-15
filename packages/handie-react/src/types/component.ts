import type { ComponentDescriptor as _ComponentDescriptor } from '@handie/runtime-core';
import type { JSXElementConstructor } from 'react';

type ComponentCtor<P extends Record<string, any> = any> = JSXElementConstructor<P>;

interface ComponentDescriptor extends _ComponentDescriptor {
  ctor: ComponentCtor;
}

export type { ComponentCtor, ComponentDescriptor };
