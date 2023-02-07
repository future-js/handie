import type { DensityType } from 'petals-ui/dist/data-table';

import type { ValidationResult, ClientAction } from '../../vendors/organik';

import type { ObjectValue } from '../value';
import type { BaseWidgetConfig, BaseWidgetState } from './base';

interface ViewWidgetConfig extends BaseWidgetConfig {
  readonly title?: any | (() => Promise<any> | any);
  readonly hideActionBar?: boolean;
}

interface ListViewWidgetConfig extends ViewWidgetConfig {
  readonly defaultPageSize?: number;
  readonly pageSizes?: number[];
  readonly checkable?: boolean;
  readonly showSerialNumber?: boolean;
  readonly density?: DensityType;
  readonly autoHeight?: boolean;
  readonly hidePagination?: boolean;
}

interface ObjectViewWidgetConfig extends ViewWidgetConfig {
  readonly submitActionText?: string;
  readonly resetActionText?: string;
  readonly cancelActionText?: string;
  readonly recordGetterRouteParams?: string | string[] | Record<string, string>;
}

interface TableViewWidgetConfig extends ListViewWidgetConfig {
  readonly showTooltipWhenContentOverflow?: boolean;
  readonly selectionColumnWidth?: number | string;
  readonly selectionColumnAlignment?: 'left' | 'center' | 'right';
  readonly serialNumberColumnWidth?: number | string;
  readonly serialNumberColumnAlignment?: 'left' | 'center' | 'right';
  readonly operationColumnWidth?: number | string;
  readonly operationColumnAlignment?: 'left' | 'center' | 'right';
}

interface DialogViewWidgetConfig extends ObjectViewWidgetConfig {
  readonly width?: number | string;
}

interface ViewWidgetState extends BaseWidgetState {
  loading: boolean;
  topActions: ClientAction[];
  itemActions: ClientAction[];
}

interface ListViewWidgetState<VT extends ObjectValue[] = ObjectValue[]> extends ViewWidgetState {
  dataSource: VT;
  pageNum: number;
  pageSize: number;
  total: number;
}

interface ObjectViewWidgetState<VT extends ObjectValue = ObjectValue> extends ViewWidgetState {
  dataSource: VT;
  value: VT;
  validation: Record<string, ValidationResult>;
}

interface DialogViewWidgetState<VT extends ObjectValue = ObjectValue>
  extends ObjectViewWidgetState<VT> {
  dialogVisible: boolean;
}

interface IViewWidget {}

export type {
  ViewWidgetConfig,
  ListViewWidgetConfig,
  ObjectViewWidgetConfig,
  TableViewWidgetConfig,
  DialogViewWidgetConfig,
  ViewWidgetState,
  ListViewWidgetState,
  ObjectViewWidgetState,
  DialogViewWidgetState,
  IViewWidget,
};
