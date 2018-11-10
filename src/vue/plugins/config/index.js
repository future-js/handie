import { isPlainObject, clone, each } from '../../utils/common/helper';
import { setDefaults, setPrivate } from '../../utils/storage/helper';

import * as utils from '../../utils';

import '../../adapters/bridge/apis';

export default function( Vue, settings ) {
  if ( isPlainObject(settings) ) {
    each(settings, ( v, k ) => setDefaults(k, v));
  }

  setPrivate('runtime', Vue);

  Vue.muu = clone(utils);

  each({
    $muu: Vue.muu,
    $http: utils.http
  }, ( raw, ref ) => Object.defineProperty(Vue.prototype, ref, {get: () => clone(raw)}));
}
