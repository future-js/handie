import type { ComponentCtor, ComponentGetter } from '../component';
import type { RenderType } from '../render-type';
import type { ConfigType, ComponentRenderer, ContextExpression, InputDescriptor } from './base';
import type { FieldDescriptor } from './model';
import type { ActionAuthorityGetter, ActionDescriptor } from './action';
import type { SearchDescriptor } from './search';

interface ViewFieldDescriptor<
  RT extends any = ComponentRenderer,
  CT extends ConfigType = ConfigType
> extends Omit<FieldDescriptor, 'dataType' | 'required' | 'readonly'>,
    InputDescriptor<RT, CT> {
  required?: boolean | ContextExpression;
  readonly?: boolean | ContextExpression;
  disabled?: boolean | ContextExpression;
  hidden?: boolean;
}

type ViewCategory = 'list' | 'object';

interface ViewDescriptor<CT extends ConfigType = ConfigType> {
  name: string;
  category?: ViewCategory;
  renderType?: RenderType;
  widget?: ComponentRenderer;
  fields?: (ViewFieldDescriptor | string)[];
  actions?: (ActionDescriptor | string)[];
  actionsAuthority?: string | ActionAuthorityGetter;
  search?: SearchDescriptor | ComponentCtor;
  config?: CT;
}

type ViewComponentRenderer<CT extends ConfigType = ConfigType> =
  | ViewDescriptor<CT>
  | ComponentCtor
  | ComponentGetter;

export type { ViewFieldDescriptor, ViewCategory, ViewDescriptor, ViewComponentRenderer };
