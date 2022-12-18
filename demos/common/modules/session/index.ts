import {
  ModuleDescriptor,
  ModuleContextDescriptor,
  ModuleContext,
  createModuleContext,
} from '@handie/runtime-core';

import { MODULE_NAME } from './helper';
import * as actions from './repository';

function getModule<S extends any = any>(store?: S): ModuleDescriptor & { store?: S } {
  const module = {
    name: MODULE_NAME,
    actions,
    components: { XButton: 'Button' },
  } as ModuleDescriptor & { store?: S };

  if (store) {
    module.store = store;
  }

  return module;
}

function getModuleContext<MC extends ModuleContext = ModuleContext>(
  creator?: (descriptor: ModuleContextDescriptor | string) => MC,
): MC {
  return (creator || createModuleContext)({ moduleName: MODULE_NAME, actions }) as MC;
}

export { getModule, getModuleContext };
