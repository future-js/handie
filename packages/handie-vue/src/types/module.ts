import type {
  ModuleDescriptor as _ModuleDescriptor,
  ModuleContext as _ModuleContext,
} from '@handie/runtime-core';

import type { VuexStoreModule } from './store';

interface ModuleDescriptor extends _ModuleDescriptor {
  store?: VuexStoreModule;
}

interface ModuleContext extends _ModuleContext {
  commit: (type: string, payload?: any) => void;
  dispatch: (type: string, payload?: any) => Promise<void>;
}

export type { ModuleDescriptor, ModuleContext };
