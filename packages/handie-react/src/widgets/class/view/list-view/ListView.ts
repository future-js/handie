import {
  ListValue,
  ListViewContext,
  SearchContext,
  ListViewWidgetConfig,
  ListViewWidgetState,
  isConditionPersisted,
  persistsInUrl,
} from '@handie/runtime-core';
import { ListViewHeadlessWidget } from '@handie/runtime-core/dist/widgets';

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
  } as any;

  /**
   * Access the injected search context
   */
  protected get $$search(): SearchContext {
    return this.context.searchContext;
  }

  private initContextEvents(): void {
    this.on({
      dataChange: dataSource => this.setState({ dataSource }),
      totalChange: total => this.setState({ total }),
      currentPageChange: pageNum => this.setState({ pageNum }),
      pageSizeChange: pageSize => this.setState({ pageSize }),
    });

    if (isConditionPersisted(this.$$view)) {
      const persists = persistsInUrl.bind(null, this.$$app.history);

      this.on({
        currentPageChange: pageNum => persists({ pageSize: this.state.pageSize, pageNum }),
        pageSizeChange: pageSize => persists({ pageSize, pageNum: this.state.pageNum }),
      });
    }
  }

  private fetchData(): void {
    const searchContext = this.$$search;

    if (searchContext && !searchContext.isReady()) {
      searchContext.on(getEventWithNamespace(this, 'ready'), () => this.$$_h.loadData());
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

    const searchContext = this.$$search;

    if (searchContext) {
      searchContext.off(getEventWithNamespace(this, 'ready'));
    }
  }
}

export { ListViewStructuralWidget };
