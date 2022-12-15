import {
  DataType,
  InputDescriptor,
  InputPropChecker,
  registerInputPropCheckers,
} from '../vendors/organik';

import { BuiltInDataType } from '../types/data-type';
import { isNumber, isString } from '../utils';

function getDisplayText(input: InputDescriptor): string {
  return input.label || input.name;
}

function numberMaxValueChecker(inputValue, propValue, input) {
  return isNumber(propValue) && isNumber(inputValue) && inputValue > propValue
    ? {
        success: false,
        message: `'${getDisplayText(input)}' 的值不能大于 ${propValue}`,
      }
    : { success: true };
}

function numberMinValueChecker(inputValue, propValue, input) {
  return isNumber(propValue) && isNumber(inputValue) && inputValue < propValue
    ? {
        success: false,
        message: `'${getDisplayText(input)}' 的值不能小于 ${propValue}`,
      }
    : { success: true };
}

function stringMaxLengthChecker(inputValue, propValue, input) {
  return isNumber(propValue) && isString(inputValue) && inputValue.length > propValue
    ? {
        success: false,
        message: `'${getDisplayText(input)}' 的长度不能超过 ${propValue} 个字符`,
      }
    : { success: true };
}

function stringMinLengthChecker(inputValue, propValue, input) {
  return isNumber(propValue) && isString(inputValue) && inputValue.length < propValue
    ? {
        success: false,
        message: `'${getDisplayText(input)}' 的长度不能少于 ${propValue} 个字符`,
      }
    : { success: true };
}

const numberInputPropCheckers = [
  { name: 'max', validator: numberMaxValueChecker },
  { name: 'min', validator: numberMinValueChecker },
];

const stringInputPropCheckers = [
  { name: 'max', validator: stringMaxLengthChecker },
  { name: 'min', validator: stringMinLengthChecker },
];

([
  { dataType: BuiltInDataType.Integer, props: [...numberInputPropCheckers] },
  { dataType: BuiltInDataType.Float, props: [...numberInputPropCheckers] },
  { dataType: BuiltInDataType.String, props: [...stringInputPropCheckers] },
  { dataType: BuiltInDataType.Text, props: [...stringInputPropCheckers] },
] as { dataType: DataType; props: InputPropChecker[] }[]).forEach(({ dataType, props }) =>
  registerInputPropCheckers(dataType, props),
);
