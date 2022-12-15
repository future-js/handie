import type { ColumnProps, IDataTableComponent } from 'petals-ui/dist/data-table';

import type {
  DataValue,
  ConfigType,
  ModelDescriptor as _ModelDescriptor,
  ClientAction,
  ViewDescriptor as _ViewDescriptor,
  ViewContextDescriptor as _ViewContextDescriptor,
  ListViewContextDescriptor as _ListViewContextDescriptor,
  ObjectViewContextDescriptor as _ObjectViewContextDescriptor,
} from '../vendors/organik';

import type { ActionWidgetConfig } from './config';
import type { ObjectValue } from './value';
import type { FieldDescriptor, ViewFieldDescriptor } from './input';

type ColumnContext<Column> = { row: ObjectValue; column: Column; index: number };

type CellComponentRenderer<Column> = (
  h: (...args: any[]) => any,
  data: ColumnContext<Column>,
) => any; // eslint-disable-line @typescript-eslint/ban-types

interface TableColumn extends Partial<ColumnProps> {}

interface DataTableProps extends Partial<IDataTableComponent> {}

interface ModelDescriptor extends Omit<_ModelDescriptor, 'fields'> {
  fields: FieldDescriptor[];
}

type OverrodeKeys = 'fields' | 'actions';

interface OverrideProperties {
  fields?: (ViewFieldDescriptor | string)[];
  actions?: (Omit<ClientAction<ActionWidgetConfig>, 'category'> | string)[];
}

interface ViewDescriptor<CT extends ConfigType = ConfigType>
  extends Omit<_ViewDescriptor<CT>, OverrodeKeys>,
    OverrideProperties {}

interface ViewContextDescriptor<
  VT extends DataValue = DataValue,
  CT extends ConfigType = ConfigType
> extends Omit<_ViewContextDescriptor<VT, CT>, OverrodeKeys>,
    OverrideProperties {}

interface ListViewContextDescriptor<
  VT extends DataValue = DataValue,
  CT extends ConfigType = ConfigType
> extends Omit<_ListViewContextDescriptor<VT, CT>, OverrodeKeys>,
    OverrideProperties {}

interface ObjectViewContextDescriptor<
  VT extends DataValue = DataValue,
  CT extends ConfigType = ConfigType
> extends Omit<_ObjectViewContextDescriptor<VT, CT>, OverrodeKeys>,
    OverrideProperties {}

export type {
  ColumnContext,
  CellComponentRenderer,
  TableColumn,
  DataTableProps,
  ModelDescriptor,
  ViewDescriptor,
  ViewContextDescriptor,
  ListViewContextDescriptor,
  ObjectViewContextDescriptor,
};
