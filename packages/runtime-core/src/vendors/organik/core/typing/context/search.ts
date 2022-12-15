import type { DataValue } from '../value';
import type { FilterDescriptor, SearchDescriptor } from '../metadata';
import type { ValueContextDescriptor, ValueEvents, ValueContext } from './value';

type SearchCondition = Record<string, DataValue>;

type SearchEvents = ValueEvents | 'filterChange';

interface SearchContextDescriptor
  extends SearchDescriptor,
    Omit<ValueContextDescriptor<SearchCondition>, 'initialValue'> {}

interface SearchContext extends ValueContext<SearchCondition, SearchEvents> {
  getFilters: () => FilterDescriptor[];
  getFilterValue: <FV>(name: string) => FV | undefined;
  setFilterValue: <FV>(name: string, value: FV) => void;
}

export type { SearchCondition, SearchEvents, SearchContextDescriptor, SearchContext };
