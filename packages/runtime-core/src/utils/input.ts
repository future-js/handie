import { isArray, isFunction } from '../vendors/toolbox';
import { InputDescriptor } from '../vendors/organik';

import {
  EnumFieldOption,
  EnumFieldOptionGetter,
  EnumField,
  MultiEnumField,
  ViewFieldDescriptor,
} from '../types/input';
import { isEnumField } from './is';

type ModuleName = string;
type FieldName = string;

const cachedEnumOptionMap = new Map<ModuleName, Map<FieldName, EnumFieldOption[]>>();

function cacheDynamicEnumOptions(
  moduleName: ModuleName,
  field: ViewFieldDescriptor,
  options?: EnumFieldOption[],
): void {
  if (!isEnumField(field)) {
    return;
  }

  if (!cachedEnumOptionMap.has(moduleName)) {
    cachedEnumOptionMap.set(moduleName, new Map<FieldName, EnumFieldOption[]>());
  }

  const moduleSpecificCache = cachedEnumOptionMap.get(moduleName)!;

  if (
    moduleSpecificCache.has(field.name) ||
    !isFunction((field as EnumField | MultiEnumField).options)
  ) {
    return;
  }

  if (isArray(options)) {
    moduleSpecificCache.set(field.name, options!);
    cachedEnumOptionMap.set(moduleName, moduleSpecificCache);
  } else {
    ((field as EnumField | MultiEnumField).options as EnumFieldOptionGetter)().then(
      ({ success, data }) => {
        if (success) {
          moduleSpecificCache.set(field.name, data);
          cachedEnumOptionMap.set(moduleName, moduleSpecificCache);
        }
      },
    );
  }
}

function getCachedEnumOptions(
  moduleName: ModuleName,
  field: ViewFieldDescriptor,
): EnumFieldOption[] | undefined {
  return isEnumField(field) && cachedEnumOptionMap.has(moduleName)
    ? cachedEnumOptionMap.get(moduleName)!.get(field.name)
    : undefined;
}

function resolveRangePlaceholders<CT extends Record<string, any>>(
  inputs: InputDescriptor[],
  config: CT,
): string[] {
  const { fromField, fromPlaceholder, toField, toPlaceholder } = config;

  const labels: string[] = ['开始日期', '结束日期'];
  const placeholders: string[] = [];

  [
    { name: fromField, placeholder: fromPlaceholder },
    { name: toField, placeholder: toPlaceholder },
  ].forEach((targetField, idx) => {
    const { name, placeholder } = targetField;
    const input = name ? inputs.find(f => name === f.name) : undefined;

    placeholders[idx] = placeholder || `请选择${(input && input.label) || labels[idx]}`;
  });

  return placeholders;
}

export { cacheDynamicEnumOptions, getCachedEnumOptions, resolveRangePlaceholders };
