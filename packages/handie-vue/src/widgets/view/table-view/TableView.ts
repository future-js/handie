import type { VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import {
  TableViewWidgetConfig,
  ListViewWidgetState,
  DataTableProps,
  getControl,
  resolveTableProps,
} from '@handie/runtime-core';

import { ListViewStructuralWidget } from '../list-view';

import defaultBehaviors from './behavior';
import { resolveCellRenderer, resolveOperationColumn } from './helper';

@Component
class TableViewStructuralWidget<
  S extends ListViewWidgetState = ListViewWidgetState,
  CT extends TableViewWidgetConfig = TableViewWidgetConfig
> extends ListViewStructuralWidget<S, CT> {
  private tableProps: DataTableProps = {} as any;

  protected renderDataTable(className?: string): VNode {
    return this.$createElement(getControl('DataTable'), {
      key: 'DataTableOfTableViewStructuralWidget',
      props: {
        ...this.tableProps,
        className,
        dataSource: this.dataSource,
        currentPage: this.pageNum,
        pageSize: this.pageSize,
        total: this.total,
        pageSizes: this.config.pageSizes || this.getCommonBehavior('view.listViewPageSizes'),
        loading: this.loading,
        autoHeight: this.config.autoHeight === true,
        density: this.config.density || this.getCommonBehavior('view.listViewDensity'),
      },
      on: {
        'selection-change': selected => this.$$view.setValue(selected),
        'current-change': currentPage => this.$$view.setCurrentPage(currentPage),
        'size-change': pageSize => this.$$view.setPageSize(pageSize),
      },
    });
  }

  public created(): void {
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
