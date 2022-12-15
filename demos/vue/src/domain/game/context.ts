import { createModuleContext } from '@/utils';

import { MODULE_NAME } from './helper';
import * as repo from './repository';

export default createModuleContext({
  moduleName: MODULE_NAME,
  actions: repo,
});
