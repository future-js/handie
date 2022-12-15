import { isDate, isString, isNumber, includes } from '../vendors/toolbox';
import { DataValue } from '../vendors/organik';

import { BuiltInDataType } from '../types/data-type';
import { DateValue } from '../types/value';
import { ViewFieldDescriptor } from '../types/input';

import { createMoment } from './date';

function isEnumField(field: ViewFieldDescriptor): boolean {
  return includes(field.dataType, [BuiltInDataType.Enum, BuiltInDataType.MultiEnum]);
}

function isUnixTimestamp(value: DataValue): boolean {
  return isNumber(value) && /^[0-9]{10}(\.[0-9]{3})?$/.test(`${value}`);
}

function isDateValue(value: DataValue): boolean {
  if (isDate(value)) {
    return true;
  }

  return isString(value) || isNumber(value)
    ? createMoment((isUnixTimestamp(value) ? value * 1000 : value) as DateValue).isValid()
    : false;
}

export { isEnumField, isUnixTimestamp, isDateValue };
