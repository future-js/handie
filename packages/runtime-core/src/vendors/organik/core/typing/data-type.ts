import { DataValue } from './value';

type DataType = string;

interface DataTypeDescriptor {
  name: DataType;
  validator: (value: DataValue) => boolean;
  defaultValueGetter: () => DataValue;
}

type ResolvedDataType = Omit<DataTypeDescriptor, 'name'>;

export type { DataType, DataTypeDescriptor, ResolvedDataType };
