import 'handie/adapters/bridge/web';

import { setBridge } from '../helper';

import NOTIFICATION_APIS from './notification';

setBridge('fallback', {
  notice: NOTIFICATION_APIS
});
