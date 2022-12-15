import { isNumeric, isFunction, capitalize, includes } from '../../vendors/toolbox';
import { ComponentCtor, ModuleContext, ViewContext } from '../../vendors/organik';

import { BuiltInDataType } from '../../types/data-type';
import type {
  EnumFieldOption,
  EnumFieldOptionGetter,
  EnumField,
  FilterDescriptor,
  ViewFieldDescriptor,
} from '../../types/input';
import type { FieldRendererProps } from '../../types/renderer';

import { cacheDynamicEnumOptions, getCachedEnumOptions } from '../input';
import { resolveFieldRenderType } from '../renderer';
import { resolveWidgetCtor } from './base';

function resolveFieldWidgetCtor<WidgetCtor extends ComponentCtor = ComponentCtor>(
  moduleContext: ModuleContext,
  { field, readonly }: FieldRendererProps,
): WidgetCtor | undefined {
  return resolveWidgetCtor<WidgetCtor>(
    moduleContext,
    field.widget,
    () =>
      `${resolveFieldRenderType(field)
        .split('-')
        .map(part => capitalize(part))
        .join('')}${readonly ? 'Read' : 'Edit'}${(field.dataType || '')
        .split('-')
        .map(part => capitalize(part))
        .join('')}FieldWidget`,
  );
}

function resolvePlaceholder(
  fieldOrFilter: ViewFieldDescriptor | FilterDescriptor,
  behaviorFromConfig: boolean | undefined,
  behaviorFromTheme: boolean,
): string {
  let defaultPlaceholder: string = '';

  if (fieldOrFilter.dataType) {
    defaultPlaceholder = `${
      includes(fieldOrFilter.dataType, [
        BuiltInDataType.Integer,
        BuiltInDataType.Float,
        BuiltInDataType.String,
        BuiltInDataType.Text,
      ])
        ? '请输入'
        : '请选择'
    }${fieldOrFilter.label || ''}`;
  }

  const showHintAsPlaceholder =
    behaviorFromConfig === undefined ? behaviorFromTheme : behaviorFromConfig;
  const placeholder = fieldOrFilter.placeholder || defaultPlaceholder;

  return showHintAsPlaceholder ? fieldOrFilter.hint || placeholder : placeholder;
}

function resolveEnumOptions(
  context: ViewContext,
  fieldOrFilter: EnumField,
  callback: (options: EnumFieldOption[]) => void,
): void {
  const { options } = fieldOrFilter;

  if (isFunction(options)) {
    const moduleName = context.getModuleContext().getModuleName();
    const cachedOptions = getCachedEnumOptions(moduleName, fieldOrFilter);

    if (cachedOptions) {
      callback(cachedOptions);
    } else {
      (options as EnumFieldOptionGetter)().then(({ success, data }) => {
        if (success) {
          cacheDynamicEnumOptions(moduleName, fieldOrFilter, data);
          callback(data);
        }
      });
    }
  } else {
    callback((options as EnumFieldOption[]) || []); // eslint-disable-line node/no-callback-literal
  }
}

function resolveSingleEnumDisplayText(value: number | string, options: EnumFieldOption[]): string {
  const chosen = options.find(opt =>
    isNumeric(opt.value) && isNumeric(value)
      ? Number(opt.value) === Number(value)
      : opt.value === value,
  );

  return chosen ? chosen.label : '';
}

function resolveMultipleEnumDisplayText(
  value: number[] | string[],
  optionMap: Record<string, EnumFieldOption>,
): string {
  return ((value || []) as any[])
    .map(v => (v != null && optionMap[v] ? optionMap[v].label : v))
    .join('、');
}

export {
  resolveFieldWidgetCtor,
  resolvePlaceholder,
  resolveEnumOptions,
  resolveSingleEnumDisplayText,
  resolveMultipleEnumDisplayText,
};
