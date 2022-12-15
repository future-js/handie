import type { SearchCondition, SearchEvents } from '../../vendors/organik';

interface SearchSettings {
  condition: SearchCondition;
  events?: Partial<Record<SearchEvents, (...args: any[]) => any>>;
}

export type { SearchSettings };
