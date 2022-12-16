import { ModuleDescriptor } from '@/types';

import { MODULE_NAME, testUtil } from '@_/modules/animation/helper';
import model from '@_/modules/animation/model';
import * as actions from '@_/modules/animation/repository';

import * as views from './views';
import TestWidget from './widgets/test-widget';

export default {
  name: MODULE_NAME,
  model,
  actions,
  views,
  exports: {
    utils: { test: testUtil },
    widgets: { test: TestWidget },
  },
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
} as ModuleDescriptor;
