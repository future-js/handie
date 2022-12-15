/* eslint-disable import/export */
import './presets';

import type { ComponentCtor, ComponentDescriptor } from './types/component';
import type { ModuleDescriptor, ModuleContext } from './types/module';
import type { AppCreators, AppDescriptor } from './types/app';

import { createModuleContext } from './adapters/context';
import { createApp } from './adapters/app';

export * from '@handie/runtime-core';

export * from './types';
export * from './adapters';
export * from './utils';

export type {
  ComponentCtor,
  ComponentDescriptor,
  ModuleDescriptor,
  ModuleContext,
  AppCreators,
  AppDescriptor,
};
export { createModuleContext, createApp };
