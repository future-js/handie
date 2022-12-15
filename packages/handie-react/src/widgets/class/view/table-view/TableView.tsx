import type { ReactNode } from 'react';

import {
  ClientAction,
  TableViewWidgetConfig,
  ListViewWidgetState,
  DataTableProps,
  getControl,
  getRenderer,
  getBehaviorByKey,
  resolveTopActions,
  resolveTableProps,
} from '@handie/runtime-core';

import type { ComponentCtor } from '../../../../types/component';
import { ListViewStructuralWidget } from '../list-view';

import defaultBehaviors from './behavior';
import { resolveCellRenderer, resolveOperationColumn } from './helper';

class TableViewStructuralWidget<
  S extends ListViewWidgetState = ListViewWidgetState,
  CT extends TableViewWidgetConfig = TableViewWidgetConfig
> extends ListViewStructuralWidget<S, CT> {
  private tableProps: DataTableProps = {} as any;

  protected get searchable(): boolean {
    return !!this.$$view.getSearch();
  }

  protected get accessible(): Record<string, boolean> | null {
    return {};
  }

  protected get topActions(): ClientAction[] {
    return resolveTopActions(this.$$view, this.accessible, this);
  }

  protected renderSearch(): ReactNode {
    const SearchRenderer = getRenderer('SearchRenderer') as ComponentCtor;

    return this.searchable ? (
      <div
        className={this.getStyleClassName('TableView-search')}
        key='SearchOfTableViewStructuralWidget'
      >
        {SearchRenderer ? <SearchRenderer /> : null}
      </div>
    ) : null;
  }

  protected renderActionBar(): ReactNode {
    return this.topActions.length > 0 ? (
      <div
        className={this.getStyleClassName('TableView-tableActions')}
        key='ActionBarOfTableViewStructuralWidget'
      >
        {this.topActions.map(({ config = {}, ...others }) => {
          const ActionRenderer = getRenderer('ActionRenderer') as ComponentCtor;

          return ActionRenderer ? (
            <ActionRenderer
              key={others.name || others.text}
              action={{
                ...others,
                config: { size: this.getBehavior('topButtonActionSize'), ...config },
              }}
            />
          ) : null;
        })}
      </div>
    ) : null;
  }

  protected renderDataTable(): ReactNode {
    const DataTable = getControl('DataTable') as ComponentCtor<Record<string, any>>;
    const state = this.state as Record<string, any>;

    return (
      <DataTable
        key='DataTableOfTableViewStructuralWidget'
        {...this.tableProps}
        className={this.getStyleClassName('TableView-dataTable')}
        dataSource={state.dataSource}
        currentPage={state.pageNum}
        pageSize={state.pageSize}
        total={state.total}
        pageSizes={this.config.pageSizes || getBehaviorByKey('common.view.listViewPageSizes')}
        loading={state.loading}
        autoHeight={this.config.autoHeight === true}
        density={this.config.density || getBehaviorByKey('common.view.listViewDensity')}
        onSelectionChange={selected => this.$$view.setValue(selected)}
        onCurrentChange={currentPage => this.$$view.setCurrentPage(currentPage)}
        onSizeChange={pageSize => this.$$view.setPageSize(pageSize)}
      />
    );
  }

  public componentWillMount(): void {
    super.componentWillMount();

    this.setBehaviors('view.table', defaultBehaviors);

    this.tableProps = resolveTableProps(
      this.$$view,
      this.accessible,
      this,
      this.getBehavior('inlineButtonActionSize'),
      this.getBehavior('inlineActionRenderType'),
      resolveCellRenderer,
      resolveOperationColumn,
    );
  }
}

export { TableViewStructuralWidget };
