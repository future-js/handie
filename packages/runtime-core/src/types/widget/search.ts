import type { SearchCondition } from '../../vendors/organik';

import type { BaseWidgetConfig, BaseWidgetState } from './base';

interface SearchWidgetConfig extends BaseWidgetConfig {
  readonly conditionPersists?: boolean;
  readonly searchWhenSelectableFilterChange?: boolean;
}

interface SearchWidgetState extends BaseWidgetState {
  condition: SearchCondition;
}

interface ISearchWidget {}

export type { SearchWidgetConfig, SearchWidgetState, ISearchWidget };
