import { PluginObject, PluginFunction } from 'vue';

import {
  ActionDescriptor,
  AppCreators as _AppCreators,
  AppDescriptor as _AppDescriptor,
} from '@handie/runtime-core';

import { ComponentCtor } from './component';
import { RouterCreator, RouteConfig } from './router';
import { StoreCreator, StoreModule } from './store';
import { ModuleDescriptor } from './module';

type RuntimePlugin<T extends any = never> = PluginObject<T> | PluginFunction<T>;

type Provider = { [key: string]: any };

interface AppCreators extends _AppCreators {
  router?: RouterCreator;
  store?: StoreCreator;
}

interface AppDescriptor extends _AppDescriptor {
  plugins?: RuntimePlugin[];
  creators?: AppCreators;
  metadata?: {
    actions?: ActionDescriptor[];
    modules?: ModuleDescriptor[];
  };
  root?: ComponentCtor;
  routes?: RouteConfig[];
  provider?: Provider | (() => Provider);
  storeModules?: StoreModule[];
}

export type { AppCreators, AppDescriptor };
