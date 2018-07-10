import { setBridge } from '../helper';

import NOTIFICATION_APIS from './notification';
import VIEW_APIS from './view';
import UPLOADER_APIS from './uploader';
import PREVIEWER_APIS from './previewer';

setBridge('dingtalk', {
  notice: NOTIFICATION_APIS,
  view: VIEW_APIS,
  upload: UPLOADER_APIS,
  preview: PREVIEWER_APIS
});
