import type { ComponentCtor } from '../component';
import type { LocationRoute } from '../app';
import type { ConfigType, InputDescriptor } from './base';

interface FilterDescriptor extends InputDescriptor {
  hidden?: boolean;
}

type SearchInitialValueGetter<VT extends Record<string, any> = Record<string, any>> = (
  route: LocationRoute,
) => VT;

interface SearchDescriptor<
  CT extends ConfigType = ConfigType,
  VT extends Record<string, any> = Record<string, any>
> {
  filters: (FilterDescriptor | string)[];
  config?: CT;
  initialValue?: VT | SearchInitialValueGetter<VT>;
}

type SearchComponentRenderer = SearchDescriptor | ComponentCtor;

export type {
  FilterDescriptor,
  SearchInitialValueGetter,
  SearchDescriptor,
  SearchComponentRenderer,
};
