import type { DataType } from '../data-type';

interface FieldDescriptor {
  name: string;
  dataType: DataType;
  label?: string;
  required?: boolean;
  readonly?: boolean;
}

interface ModelDescriptor {
  name: string;
  fields: FieldDescriptor[];
}

export type { FieldDescriptor, ModelDescriptor };
