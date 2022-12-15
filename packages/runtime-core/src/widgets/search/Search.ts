import type {
  ListViewContext,
  SearchInitialValueGetter,
  SearchDescriptor,
} from '../../vendors/organik';

import type { SearchWidgetConfig, ISearchWidget } from '../../types/widget/search';
import { isFunction, isConditionPersisted, persistsInUrl, restoreFromUrl } from '../../utils';
import { BaseHeadlessWidget } from '../base';
import type { SearchSettings } from './typing';

class SearchHeadlessWidget<
  CT extends SearchWidgetConfig = SearchWidgetConfig
> extends BaseHeadlessWidget<ISearchWidget, CT> {
  public getConfig(): CT {
    return ((this.getViewContext<ListViewContext>().getSearch() as SearchDescriptor).config ||
      {}) as CT;
  }

  public resolveInitialSettings(): SearchSettings {
    const viewContext = this.getViewContext<ListViewContext>();
    const searchContext = viewContext.getSearchContext()!;

    const settings: SearchSettings = { condition: searchContext.getDefaultValue() };

    // FIXME: 临时做法
    const searchInitialValue = (viewContext.getSearch() as SearchDescriptor).initialValue;
    const { history } = this.getAppHelper();

    if (searchInitialValue) {
      settings.condition = {
        ...settings.condition,
        ...(isFunction(searchInitialValue)
          ? (searchInitialValue as SearchInitialValueGetter)(history.getLocation())
          : searchInitialValue),
      };
    }

    if (isConditionPersisted(viewContext)) {
      settings.condition = { ...settings.condition, ...restoreFromUrl(history) };

      const persists = () =>
        persistsInUrl(history, {
          ...searchContext.getValue(),
          pageNum: viewContext.getCurrentPage(),
        });

      settings.events = { submit: persists, reset: persists };
    }

    return settings;
  }
}

export { SearchHeadlessWidget };
