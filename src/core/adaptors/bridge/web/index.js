import { setBridge } from '../helper';

import NOTIFICATION_APIS from './notification';
import VIEW_APIS from './view';

setBridge('fallback', {
  notice: NOTIFICATION_APIS,
  view: VIEW_APIS
});
