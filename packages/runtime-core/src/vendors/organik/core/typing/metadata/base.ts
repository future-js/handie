import type { ComponentCtor } from '../component';
import type { DataValue } from '../value';
import type { DataType } from '../data-type';
import type { RenderType } from '../render-type';

type ConfigType = Record<string, any>;

type ComponentRenderer<Identifier extends string = string> = Identifier | ComponentCtor;

type ContextExpression = string;

interface InputDescriptor<WT extends any = ComponentRenderer, CT extends ConfigType = ConfigType> {
  name: string;
  dataType?: DataType;
  label?: string;
  required?: boolean | ContextExpression;
  defaultValue?: DataValue;
  renderType?: RenderType;
  widget?: WT;
  config?: CT;
}

export type { ConfigType, ComponentRenderer, ContextExpression, InputDescriptor };
