import { isString, isArray, isPlainObject } from '../vendors/toolbox';
import type { ObjectViewContext } from '../vendors/organik';

function resolveRouteParams(
  viewContent: ObjectViewContext,
  keys: string | string[] | Record<string, string>,
): Record<string, any> {
  let params: Record<string, any> = {};

  if (isString(keys) || isArray(keys)) {
    params = ([] as string[])
      .concat(keys as string | string[])
      .reduce((acc, key) => ({ ...acc, [key]: viewContent.getFieldValue(key) }), {});
  } else if (isPlainObject(keys)) {
    params = Object.entries(keys).reduce(
      (acc, [routeParamKey, recordParamKey]) => ({
        ...acc,
        [routeParamKey]: viewContent.getFieldValue(recordParamKey as string),
      }),
      {},
    );
  }

  return params;
}

export { resolveRouteParams };
