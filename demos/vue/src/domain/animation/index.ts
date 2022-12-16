import { getModule } from '@_/modules/animation';

import * as views from './views';
import TestWidget from './widgets/test-widget';

export default getModule({ views, widgets: { test: TestWidget } });
