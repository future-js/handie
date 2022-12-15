import { isBoolean, isString } from '../vendors/toolbox';
import {
  DataValue,
  DataType,
  RenderType,
  ContextExpression,
  runExpression,
} from '../vendors/organik';

import type { ObjectValue } from '../types/value';
import { BuiltInDataType } from '../types/data-type';
import type { ViewFieldDescriptor, FilterDescriptor } from '../types/input';
import { getBehaviorByKey } from './theme';

function getDefaultRenderTypeMapOfField(): Record<DataType, RenderType> {
  return {
    [BuiltInDataType.Boolean]: getBehaviorByKey('common.field.booleanFieldRenderType'),
    [BuiltInDataType.Integer]: 'number',
    [BuiltInDataType.Float]: 'number',
    [BuiltInDataType.String]: 'input',
    [BuiltInDataType.Text]: 'textarea',
    [BuiltInDataType.Enum]: getBehaviorByKey('common.field.enumFieldRenderType'),
    [BuiltInDataType.MultiEnum]: 'select',
    [BuiltInDataType.Date]: getBehaviorByKey('common.field.dateFieldRenderType'),
    [BuiltInDataType.OneToOne]: 'select',
    [BuiltInDataType.OneToMany]: 'select',
    [BuiltInDataType.ManyToMany]: 'select',
    [BuiltInDataType.ManyToOne]: 'select',
  };
}

function resolveFieldRenderType({ renderType, dataType = '' }: ViewFieldDescriptor): string {
  return renderType || getDefaultRenderTypeMapOfField()[dataType] || '';
}

function getDefaultRenderTypeMapOfFilter(): Record<DataType, RenderType> {
  return {
    [BuiltInDataType.Boolean]: 'select',
    [BuiltInDataType.String]: 'input',
    [BuiltInDataType.Text]: 'input',
    [BuiltInDataType.Integer]: 'number',
    [BuiltInDataType.Float]: 'number',
    [BuiltInDataType.Enum]: 'select',
    [BuiltInDataType.MultiEnum]: 'select',
    [BuiltInDataType.Date]: getBehaviorByKey('common.filter.dateFilterRenderType'),
    [BuiltInDataType.OneToOne]: 'select',
    [BuiltInDataType.OneToMany]: 'select',
    [BuiltInDataType.ManyToMany]: 'select',
    [BuiltInDataType.ManyToOne]: 'select',
  };
}

function resolveFilterRenderType({ renderType, dataType = '' }: FilterDescriptor): string {
  return renderType || getDefaultRenderTypeMapOfFilter()[dataType] || '';
}

function isBoolOrExprTrue(
  value: ObjectValue,
  boolOrExpr?: boolean | ContextExpression,
  defaultReturnValue?: DataValue,
): boolean {
  return isString(boolOrExpr)
    ? !!runExpression({ value }, boolOrExpr as ContextExpression, defaultReturnValue)
    : (boolOrExpr as boolean) === true;
}

function resolveFieldRequired(
  value: ObjectValue,
  readonly?: boolean,
  required?: boolean | ContextExpression,
): boolean {
  return readonly ? false : isBoolOrExprTrue(value, required);
}

export { resolveFieldRenderType, resolveFilterRenderType, isBoolOrExprTrue, resolveFieldRequired };
