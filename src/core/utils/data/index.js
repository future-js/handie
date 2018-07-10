import { isPlainObject, isArray } from '../is/type';
import { includes, each } from '../collection';

/**
 * 过滤掉不在排除列表之内的未修改数据
 *
 * @param data
 * @param raw
 * @param excluded
 * @returns {{}}
 */
function filterUnchanged( data, raw, excluded ) {
  let filtered = {};

  if ( isPlainObject(data) ) {
    if ( isPlainObject(raw) ) {
      if ( !isArray(excluded) ) {
        excluded = [];
      }

      each(data, function( k, v ) {
        if ( (excluded.length > 0 && includes(k, excluded)) || v !== raw[k] ) {
          filtered[k] = v;
        }
      });
    }
    else {
      filtered = data;
    }
  }

  return filtered;
}

export {
  filterUnchanged as changed
}
