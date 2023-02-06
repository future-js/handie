import type { ReactNode } from 'react';

import {
  TableViewWidgetConfig,
  ListViewWidgetState,
  DataTableProps,
  getControl,
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

  protected renderDataTable(className?: string): ReactNode {
    const DataTable = getControl('DataTable') as ComponentCtor<Record<string, any>>;
    const state = this.state as Record<string, any>;

    return (
      <DataTable
        key='DataTableOfTableViewStructuralWidget'
        {...this.tableProps}
        className={className}
        dataSource={state.dataSource}
        currentPage={state.pageNum}
        pageSize={state.pageSize}
        total={state.total}
        pageSizes={this.config.pageSizes || this.getCommonBehavior('view.listViewPageSizes')}
        loading={state.loading}
        autoHeight={this.config.autoHeight === true}
        density={this.config.density || this.getCommonBehavior('view.listViewDensity')}
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
      this.getBehavior('inlineButtonActionSize'),
      this.getBehavior('inlineActionRenderType'),
      resolveCellRenderer,
      resolveOperationColumn,
    );
  }
}

export { TableViewStructuralWidget };
