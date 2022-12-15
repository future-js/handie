import type {
  DataValue,
  SearchDescriptor,
  SearchContext,
  ListViewContext,
} from '../../vendors/organik';

import type { UnknownFilter, FilterDescriptor } from '../../types/input';
import type { FilterWidgetConfig, IFilterWidget } from '../../types/widget/filter';
import type { SearchWidgetConfig } from '../../types/widget/search';

import { isBoolean, isPlainObject } from '../../utils';
import { resolvePlaceholder } from '../../utils/widget';

import { BaseHeadlessWidget } from '../base';

class FilterHeadlessWidget<
  VT extends DataValue = DataValue,
  CT extends FilterWidgetConfig = FilterWidgetConfig,
  FT extends UnknownFilter = FilterDescriptor
> extends BaseHeadlessWidget<IFilterWidget<VT>, CT> {
  protected getFilter(): FT {
    return this.getProp('filter') as FT;
  }

  protected getFilterValue(): VT | undefined {
    return this.getSearchContext().getFilterValue<VT>(this.getFilter().name);
  }

  protected getSearchContext(): SearchContext {
    return this.getViewContext<ListViewContext>().getSearchContext()!;
  }

  public getConfig(): CT {
    return (this.getFilter().config || {}) as CT;
  }

  public getPlaceholder(): string {
    return resolvePlaceholder(
      this.getFilter(),
      this.getConfig().showHintAsPlaceholder,
      this.getCommonBehavior('filter.showHintAsPlaceholder'),
    );
  }

  public isValidationRulesShownAsNative(): boolean {
    return this.getCommonBehavior('filter.showValidationRulesAsNative', false);
  }

  public isImmediate(): boolean {
    const { searchImmediately } = this.getConfig();

    if (isBoolean(searchImmediately)) {
      return searchImmediately!;
    }

    const searchDescriptor = this.getViewContext<ListViewContext>().getSearch();

    if (isPlainObject(searchDescriptor)) {
      const { searchWhenSelectableFilterChange } =
        (searchDescriptor as SearchDescriptor<SearchWidgetConfig>).config || {};

      if (isBoolean(searchWhenSelectableFilterChange)) {
        return searchWhenSelectableFilterChange!;
      }
    }

    return this.getCommonBehavior('search.searchWhenSelectableFilterChange', false);
  }
}

export { FilterHeadlessWidget };
