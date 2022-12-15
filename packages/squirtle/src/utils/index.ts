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

function getNumberInputProps(reactInst): Record<string, any> {
  const props: Record<string, any> = {
    value: reactInst.props.value,
    placeholder: reactInst.getPlaceholder(),
    disabled: reactInst.state.disabled,
    prefix: reactInst.config.prefix,
    suffix: reactInst.config.suffix,
  };

  if (reactInst.showValidationRulesAsNative) {
    const { min, max } = reactInst.props.field as NumberField;

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
  reactInst,
  filterWidget: boolean = false,
): Record<string, any> {
  const props: Record<string, any> = {
    value: reactInst.props.value,
    placeholder: reactInst.getPlaceholder(),
  };

  if (filterWidget !== true) {
    props.disabled = reactInst.state.disabled;
  }

  if (reactInst.showValidationRulesAsNative) {
    const { min, max } = (filterWidget === true
      ? reactInst.props.filter
      : reactInst.props.field) as StringField;

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
