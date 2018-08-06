import { watermark } from 'handie/utils/watermark';
import { setDefaults } from '../storage/helper';

import WATERMARK_DEFAULTS from './defaults';

setDefaults('watermark', WATERMARK_DEFAULTS);

export {
  watermark
}
