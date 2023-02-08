import type { VNode } from 'vue';
import { Component, Inject } from 'vue-property-decorator';

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

import { getEventWithNamespace } from '../../../utils';
import { ViewStructuralWidget } from '../view';

@Component
class ListViewStructuralWidget<
  S extends ListViewWidgetState = ListViewWidgetState,
  CT extends ListViewWidgetConfig = ListViewWidgetConfig,
  VT extends ListValue = ListValue
> extends ViewStructuralWidget<ListViewContext<VT, CT>, S, CT, ListViewHeadlessWidget<CT>> {
  /**
   * Access the injected search context
   */
  @Inject({ from: 'searchContext', default: null })
  protected readonly $$search!: SearchContext;

  protected dataSource: Pick<ListViewWidgetState, 'dataSource'>['dataSource'] = [];
  protected pageNum: number = 1;
  protected pageSize: number = 20;
  protected total: number = 0;

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

  protected renderSearch(className?: string): VNode | null {
    const h = this.$createElement;

    return this.searchable
      ? h('div', { staticClass: className, key: 'SearchOfListViewStructuralWidget' }, [
          h(getRenderer('SearchRenderer')),
        ])
      : null;
  }

  protected renderActionBar(className?: string, defaultSize?: FormControlSize): VNode | null {
    const h = this.$createElement;

    return this.config.hideActionBar !== true && this.topActions.length > 0
      ? h(
          'div',
          { staticClass: className, key: 'ActionBarOfListViewStructuralWidget' },
          this.topActions.map(({ config = {}, ...others }, idx) =>
            h(getRenderer('ActionRenderer'), {
              key: `${others.name || others.text}${idx}`,
              props: {
                action: {
                  ...others,
                  config: defaultSize ? { size: defaultSize, ...config } : config,
                },
              },
            }),
          ),
        )
      : null;
  }

  private initContextEvents(): void {
    this.on({
      dataChange: dataSource => (this.dataSource = dataSource),
      totalChange: total => (this.total = total),
      currentPageChange: pageNum => (this.pageNum = pageNum),
      pageSizeChange: pageSize => (this.pageSize = pageSize),
    });

    if (isConditionPersisted(this.$$view)) {
      const persists = persistsInUrl.bind(null, this.$$history);

      this.on({
        currentPageChange: pageNum => persists({ pageSize: this.pageSize, pageNum }),
        pageSizeChange: pageSize => persists({ pageSize, pageNum: this.pageNum }),
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

  public created(): void {
    this.setHeadlessWidget(new ListViewHeadlessWidget(this.$props, this.$$view));

    this.$$_h.initPagination(this.pageNum, ({ pageSize, pageNum }) => {
      this.pageSize = pageSize;
      this.pageNum = pageNum;
    });

    this.initContextEvents();
    this.fetchData();
  }

  public beforeDestroy(): void {
    if (this.$$search) {
      this.$$search.off(this.searchEventName);
    }
  }
}

export { ListViewStructuralWidget };
