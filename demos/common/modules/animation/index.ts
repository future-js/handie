import type {
  ModuleDescriptor,
  ModuleContextDescriptor,
  ModuleContext,
  ComponentCtor,
} from '@handie/runtime-core';

import { MODULE_NAME, testUtil } from './helper';
import model from './model';
import * as actions from './repository';

function getModule<WidgetCtor extends ComponentCtor = ComponentCtor>({
  views,
  widgets,
}: Pick<ModuleDescriptor, 'views'> & {
  widgets?: Record<string, WidgetCtor>;
} = {}): ModuleDescriptor {
  const exports: Pick<ModuleDescriptor, 'exports'>['exports'] = { utils: { test: testUtil } };

  if (widgets) {
    exports.widgets = widgets;
  }

  const module: ModuleDescriptor = {
    name: MODULE_NAME,
    model,
    actions,
    exports,
    components: {
      XButton: 'Button',
      XDialog: 'Dialog',
      Message: true,
      SearchableTree: true,
      Wait: true,
      Popover: true,
      Ellipsis: true,
      Empty: true,
    },
  };

  if (views) {
    module.views = views;
  }

  return module;
}

function getModuleContext<MC extends ModuleContext = ModuleContext>(
  creator: (descriptor: ModuleContextDescriptor | string) => MC,
): MC {
  return creator({ moduleName: MODULE_NAME, actions });
}

export { getModule, getModuleContext };
