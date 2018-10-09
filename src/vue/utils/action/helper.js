import { isString, mixin } from '../common/helper';

export function resolveAction( index, action ) {
  const resolved = {};

  if ( isString(action) ) {
    action = {text: action};
  }

  mixin(resolved, action, {index});

  return resolved;
}
