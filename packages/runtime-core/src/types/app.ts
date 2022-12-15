import type {
  ComponentCtor,
  ComponentDescriptor,
  AppHelper,
  ActionDescriptor,
  ModuleDescriptor,
} from '../vendors/organik';

import type { ThemeOptions } from './theme';

type MountEl = Element | string;

type AppHelperCreator = () => Omit<AppHelper, 'session'>;

interface AppCreators {
  appHelper?: AppHelperCreator;
}

interface AppDescriptor {
  components?: ComponentDescriptor[]; // includes controls and widgets
  metadata?: {
    actions?: ActionDescriptor[];
    modules?: ModuleDescriptor[];
  };
  creators?: AppCreators;
  theme?: ThemeOptions;
  root?: ComponentCtor;
  el?: MountEl;
}

interface AppInstance {
  mount(el?: MountEl): void;
}

export type { AppCreators, AppDescriptor, AppInstance };
