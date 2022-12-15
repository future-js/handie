import type { ReactNode } from 'react';

import { ListViewContext, ISearchWidget, resolveSearchWidgetCtor } from '@handie/runtime-core';

import type { ComponentCtor } from '../../types/component';
import BaseRenderer from '../base';

export default class SearchRenderer extends BaseRenderer {
  public render(): ReactNode {
    const SearchWidget = resolveSearchWidgetCtor<ComponentCtor<ISearchWidget>>(
      this.$$view as ListViewContext,
    );

    return SearchWidget ? <SearchWidget /> : null;
  }
}
