import { DataValue, DataTypeDescriptor, registerDataType } from '../vendors/organik';

import { BuiltInDataType } from '../types/data-type';
import {
  isBoolean,
  isNumber,
  isInteger,
  isString,
  isArray,
  isPlainObject,
  isDateValue,
} from '../utils';

type PartialDataTypeDescriptor = Omit<DataTypeDescriptor, 'name'>;

const stringDescriptor: PartialDataTypeDescriptor = {
  validator: isString,
  defaultValueGetter: () => '',
};

const listDescriptor: PartialDataTypeDescriptor = {
  validator: isArray,
  defaultValueGetter: () => [],
};

const objectDescriptor: PartialDataTypeDescriptor = {
  validator: isPlainObject,
  defaultValueGetter: () => ({}),
};

function isEnumValue(value: DataValue): boolean {
  return isNumber(value) || isString(value);
}

function isDateValueValid(value: DataValue): boolean {
  return value === '' || isDateValue(value);
}

([
  { name: BuiltInDataType.Boolean, validator: isBoolean, defaultValueGetter: () => false },
  { name: BuiltInDataType.Integer, validator: isInteger, defaultValueGetter: () => 0 },
  { name: BuiltInDataType.Float, validator: isNumber, defaultValueGetter: () => 0 },
  { name: BuiltInDataType.String, ...stringDescriptor },
  { name: BuiltInDataType.Text, ...stringDescriptor },
  { name: BuiltInDataType.Enum, validator: isEnumValue, defaultValueGetter: () => '' },
  {
    name: BuiltInDataType.MultiEnum,
    validator: value => isArray(value) && (value as DataValue[]).every(isEnumValue),
    defaultValueGetter: () => [],
  },
  {
    name: BuiltInDataType.Date,
    validator: value =>
      isDateValueValid(value) ||
      (isArray(value) && (value.length === 0 || value.every(isDateValueValid))),
    defaultValueGetter: () => '',
  },
  { name: BuiltInDataType.OneToOne, ...objectDescriptor },
  { name: BuiltInDataType.OneToMany, ...listDescriptor },
  { name: BuiltInDataType.ManyToMany, ...listDescriptor },
  { name: BuiltInDataType.ManyToOne, ...objectDescriptor },
] as DataTypeDescriptor[]).forEach(registerDataType);
