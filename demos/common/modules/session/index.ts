import type {
  ModuleDescriptor,
  ModuleContextDescriptor,
  ModuleContext,
} from '@handie/runtime-core';

import { MODULE_NAME } from './helper';
import * as actions from './repository';

function getModule<S extends any = any>(store?: S): ModuleDescriptor & { store?: S } {
  const module = { name: MODULE_NAME, actions } as ModuleDescriptor & { store?: S };

  if (store) {
    module.store = store;
  }

  return module;
}

function getModuleContext<MC extends ModuleContext = ModuleContext>(
  creator: (descriptor: ModuleContextDescriptor | string) => MC,
): MC {
  return creator({ moduleName: MODULE_NAME, actions });
}

export { getModule, getModuleContext };
