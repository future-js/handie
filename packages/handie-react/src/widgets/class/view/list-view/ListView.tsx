import type { ReactNode } from 'react';

import {
  FormControlSize,
  ListValue,
  ListViewContext,
  SearchContext,
  ListViewWidgetConfig,
  ListViewWidgetState,
  getRenderer,
  isConditionPersisted,
  persistsInUrl,
} from '@handie/runtime-core';
import { ListViewHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import type { ComponentCtor } from '../../../../types/component';
import { getEventWithNamespace } from '../../../../utils';
import { ViewStructuralWidget } from '../view';

class ListViewStructuralWidget<
  S extends ListViewWidgetState = ListViewWidgetState,
  CT extends ListViewWidgetConfig = ListViewWidgetConfig,
  VT extends ListValue = ListValue
> extends ViewStructuralWidget<ListViewContext<VT, CT>, S, CT, ListViewHeadlessWidget<CT>> {
  public readonly state = {
    loading: false,
    dataSource: [],
    pageNum: 1,
    pageSize: 20,
    total: 0,
    topActions: [],
    itemActions: [],
  } as any;

  /**
   * Access the injected search context
   */
  protected get $$search(): SearchContext {
    return this.context.searchContext;
  }

  protected get searchable(): boolean {
    return !!this.$$view.getSearch();
  }

  private get searchEventName(): string {
    if (this.$$search) {
      return this.$$search.isReady()
        ? `mount.${this.$$view.getId()}`
        : getEventWithNamespace(this, 'ready');
    }

    return '';
  }

  protected renderSearch(className?: string): ReactNode {
    const SearchRenderer = getRenderer('SearchRenderer') as ComponentCtor;

    return this.searchable ? (
      <div className={className} key='SearchOfListViewStructuralWidget'>
        {SearchRenderer ? <SearchRenderer /> : null}
      </div>
    ) : null;
  }

  protected renderActionBar(className?: string, defaultSize?: FormControlSize): ReactNode {
    return this.config.hideActionBar !== true && this.state.topActions.length > 0 ? (
      <div className={className} key='ActionBarOfListViewStructuralWidget'>
        {this.state.topActions.map(({ config = {}, ...others }) => {
          const ActionRenderer = getRenderer('ActionRenderer') as ComponentCtor;

          return ActionRenderer ? (
            <ActionRenderer
              key={others.name || others.text}
              action={{
                ...others,
                config: defaultSize ? { size: defaultSize, ...config } : config,
              }}
            />
          ) : null;
        })}
      </div>
    ) : null;
  }

  private initContextEvents(): void {
    this.on({
      dataChange: dataSource => this.setState({ dataSource }),
      totalChange: total => this.setState({ total }),
      currentPageChange: pageNum => this.setState({ pageNum }),
      pageSizeChange: pageSize => this.setState({ pageSize }),
    });

    if (isConditionPersisted(this.$$view)) {
      const persists = persistsInUrl.bind(null, this.$$history);

      this.on({
        currentPageChange: pageNum => persists({ pageSize: this.state.pageSize, pageNum }),
        pageSizeChange: pageSize => persists({ pageSize, pageNum: this.state.pageNum }),
      });
    }
  }

  private fetchData(): void {
    if (this.$$search) {
      this.$$search.on(this.searchEventName, () => this.$$_h.loadData());
    } else {
      this.$$_h.loadData();
    }
  }

  public componentWillMount(): void {
    super.componentWillMount();

    this.setHeadlessWidget(new ListViewHeadlessWidget(this.props, this.$$view));

    this.$$_h.initPagination(this.state.pageNum, this.setState.bind(this));

    this.initContextEvents();
    this.fetchData();
  }

  public componentWillUnmount(): void {
    super.componentWillUnmount();

    if (this.$$search) {
      this.$$search.off(this.searchEventName);
    }
  }
}

export { ListViewStructuralWidget };
