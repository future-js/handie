import { MODULE_NAME } from '@_/modules/game/helper';
import * as repo from '@_/modules/game/repository';

import { createModuleContext } from '@/utils';

export default createModuleContext({ moduleName: MODULE_NAME, actions: repo });
