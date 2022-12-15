import { ModuleDescriptor } from '@/shared/types';

import { MODULE_NAME } from './helper';
import * as actions from './repository';

export default {
  name: MODULE_NAME,
  actions,
  components: {
    XButton: 'Button',
  },
} as ModuleDescriptor;
