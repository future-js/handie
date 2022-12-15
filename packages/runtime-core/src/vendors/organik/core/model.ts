import { FieldDescriptor } from './typing';

type FieldMap = Record<string, FieldDescriptor>;

function resolveFieldMap(fields: FieldDescriptor[]): FieldMap {
  return fields.reduce((prev, field) => ({ ...prev, [field.name]: field }), {}) as FieldMap;
}

export { resolveFieldMap };
