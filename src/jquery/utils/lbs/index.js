import { route as resolveRoutePlan } from 'handie/utils/lbs';
import { setDefaults, getDefaults } from '../storage/helper';

import LBS_DEFAULTS from './defaults';

setDefaults('lbs', LBS_DEFAULTS);

export function route( from, to, map = getDefaults('lbs.map') ) {
  return resolveRoutePlan(from, to, map);
}
