import type { DataValue } from '../value';
import type { ValueChecker } from '../validator';
import type { RequestParams, ResponseResult, ResponseSuccess, ResponseFail } from '../http';
import type {
  ConfigType,
  ViewFieldDescriptor,
  ActionContextType,
  ActionAuthorityGetter,
  ActionDescriptor,
  SearchComponentRenderer,
  ViewDescriptor,
} from '../metadata';

import type { ValueContextDescriptor, ValueContext } from './value';
import type { ModuleContext } from './module';
import type { SearchContext } from './search';

type ShorthandRequest<ParamsType = RequestParams> = (
  params: ParamsType,
  success?: ResponseSuccess,
  fail?: ResponseFail,
) => Promise<ResponseResult>;

interface ViewContext<VT = any, CT extends ConfigType = ConfigType>
  extends Pick<ModuleContext, 'getComponents'>,
    ValueContext<VT> {
  getId(): string;
  getModuleContext: () => ModuleContext;
  getOpener(): ListViewContext | ObjectViewContext | undefined; // eslint-disable-line no-use-before-define
  getView(): ViewDescriptor<CT>;
  getFields(): ViewFieldDescriptor[];
  getActions(): ActionDescriptor[];
  getActionsByContextType(contextType: ActionContextType): ActionDescriptor[];
  getActionsAuthority(): string | ActionAuthorityGetter | undefined;
  getConfig(): CT;
  getDataSource(): VT;
  setDataSource(data: VT): void;
  getBusy(): boolean;
  setBusy(busy: boolean): void;
}

interface InternalListViewContext<Child, VT = any, CT extends ConfigType = ConfigType>
  extends ViewContext<VT, CT> {
  getChildren: () => Child[];
  getSearch: () => SearchComponentRenderer | undefined;
  getSearchContext: () => SearchContext | undefined;
  getTotal: () => number;
  getCurrentPage: () => number;
  setCurrentPage: (current: number, silent?: boolean) => void;
  getPageSize: () => number;
  setPageSize: (size: number, silent?: boolean) => void;
  load: () => Promise<any>;
  reload: () => Promise<any>;
  getList: ShorthandRequest;
  deleteOne: ShorthandRequest<string | number | Record<string, any>>;
  deleteList: ShorthandRequest<string[] | number[] | Record<string, any>>;
}

interface InternalObjectViewContext<Parent, VT = any, CT extends ConfigType = ConfigType>
  extends ViewContext<VT, CT> {
  getParent: () => Parent | undefined;
  getIndexInParent: () => number;
  getFieldValue: <FV>(name: string) => FV | undefined;
  setFieldValue: <FV>(name: string, value: FV) => void;
  setFieldChecker: (name: string, checker: ValueChecker) => void;
  isModified: () => boolean;
  getOne: ShorthandRequest<string | number | Record<string, any>>;
  insert: ShorthandRequest;
  update: ShorthandRequest;
}

interface ListViewContext<VT = any, CT extends ConfigType = ConfigType>
  extends InternalListViewContext<
    InternalObjectViewContext<ListViewContext<VT, CT>, VT, CT>,
    VT,
    CT
  > {}

interface ObjectViewContext<VT = any, CT extends ConfigType = ConfigType>
  extends InternalObjectViewContext<
    InternalListViewContext<ObjectViewContext<VT, CT>, VT, CT>,
    VT,
    CT
  > {}

interface ViewContextDescriptor<
  VT extends DataValue = DataValue,
  CT extends ConfigType = ConfigType
> extends ViewDescriptor<CT>,
    ValueContextDescriptor<VT> {
  opener?: ListViewContext<VT, CT> | ObjectViewContext<VT, CT>;
}

interface ListShorthandRequest {
  getList?: string;
  deleteOne?: string;
  deleteList?: string;
}

interface ListViewContextDescriptor<
  VT extends DataValue = DataValue,
  CT extends ConfigType = ConfigType
> extends Omit<ViewContextDescriptor<VT, CT>, 'defaultValue'>,
    ListShorthandRequest {}

interface ObjectShorthandRequest {
  insert?: string;
  update?: string;
  getOne?: string;
}

type ValidationTiming = 'immediate' | 'submit' | 'none';

interface ObjectViewContextDescriptor<
  VT extends DataValue = DataValue,
  CT extends ConfigType = ConfigType
> extends Omit<ViewContextDescriptor<VT, CT>, 'defaultValue'>,
    ObjectShorthandRequest {
  parent?: ListViewContext<VT, CT>;
  indexInParent?: number;
  validate?: ValidationTiming;
}

interface ExpressionContext<VT extends DataValue = DataValue> {
  value: VT;
  dataSource?: VT;
}

export type {
  ViewContextDescriptor,
  ListShorthandRequest,
  ListViewContextDescriptor,
  ObjectShorthandRequest,
  ValidationTiming,
  ObjectViewContextDescriptor,
  ViewContext,
  ListViewContext,
  ObjectViewContext,
  ExpressionContext,
};
