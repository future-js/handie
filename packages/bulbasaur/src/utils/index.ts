import {
  DateValue,
  ObjectValue,
  DateFieldWidgetConfig,
  DateFilterWidgetConfig,
  isNumber,
  isFunction,
  pick,
} from '@handie/runtime-core';
import type { NumberField, StringField } from '@handie/runtime-core/dist/types/input';

function getPickerOption<VT extends DateValue | DateValue[]>(
  value: VT,
  config: DateFieldWidgetConfig | DateFilterWidgetConfig,
  record: ObjectValue,
): Record<string, any> {
  const { disableDate, showNow } = pick(config, ['disableDate', 'showNow']) as Record<string, any>;
  const options: Record<string, any> = { showNow };

  if (isFunction(disableDate)) {
    options.disableDate = (date: Date) => disableDate(value, date, record);
  }

  return options;
}

function getNumberInputProps(vueInst): Record<string, any> {
  const props: Record<string, any> = {
    value: vueInst.value,
    placeholder: vueInst.getPlaceholder(),
    disabled: vueInst.disabled,
    prefix: vueInst.config.prefix,
    suffix: vueInst.config.suffix,
  };

  if (vueInst.showValidationRulesAsNative) {
    const { min, max } = vueInst.field as NumberField;

    if (isNumber(min)) {
      props.min = min;
    }

    if (isNumber(max)) {
      props.max = max;
    }
  }

  return props;
}

function getStringInputtableControlProps(
  vueInst,
  filterWidget: boolean = false,
): Record<string, any> {
  const props: Record<string, any> = {
    value: vueInst.value,
    placeholder: vueInst.getPlaceholder(),
  };

  if (filterWidget !== true) {
    props.disabled = vueInst.disabled;
  }

  if (vueInst.showValidationRulesAsNative) {
    const { min, max } = (filterWidget === true ? vueInst.filter : vueInst.field) as StringField;

    if (isNumber(min)) {
      props.minLength = min;
    }

    if (isNumber(max)) {
      props.maxLength = max;
    }
  }

  return props;
}

export { getPickerOption, getNumberInputProps, getStringInputtableControlProps };
