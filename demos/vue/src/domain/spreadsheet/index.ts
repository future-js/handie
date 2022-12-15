import { ModuleDescriptor } from '@/types';

import { MODULE_NAME } from './helper';
import * as views from './views';

export default {
  name: MODULE_NAME,
  views,
} as ModuleDescriptor;
