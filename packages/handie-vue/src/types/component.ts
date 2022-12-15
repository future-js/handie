import type { ComponentDescriptor as _ComponentDescriptor } from '@handie/runtime-core';
import type { VueConstructor } from 'vue';

type ComponentCtor<P extends Record<string, any> = any> = VueConstructor;

interface ComponentDescriptor extends _ComponentDescriptor {
  ctor: ComponentCtor;
}

export type { ComponentCtor, ComponentDescriptor };
