import { createModuleContext } from '@/utils';

import { MODULE_NAME } from './helper';
import repository from './repository';

export default createModuleContext({
  moduleName: MODULE_NAME,
  actions: repository,
});
