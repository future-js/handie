import { isPlainObject, each } from '../common/helper';
import { setDefaults as setAppDefaults } from './helper';

function resolveAlias( key ) {
  return key === 'ajax' ? 'http' : key;
}

export function setDefaults( settings ) {
  if ( isPlainObject(settings) ) {
    each(settings, ( v, k ) => setAppDefaults(resolveAlias(k), v));
  }
}

export * from 'handie/utils/storage';
