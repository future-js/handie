import { isPlainObject, pick, clone } from '@ntks/toolbox';

import {
  DataValue,
  RequestParams,
  ResponseResult,
  ResponseSuccess,
  ResponseFail,
  ConfigType,
  SearchComponentRenderer,
  SearchDescriptor,
  ModuleContext,
  SearchCondition,
  SearchContext as ISearchContext,
  ObjectViewContext as IObjectViewContext,
  ListShorthandRequest,
  ListViewContextDescriptor,
  ListViewContext as IListViewContext,
  createSearchContext,
  resolveListRequestParams,
  createViewContext,
} from '../../core';
import { ViewContext } from './base';

type ChildrenCreator<ValueType> = (data: ValueType) => IObjectViewContext[];

class ListViewContext<
    ValueType extends DataValue = DataValue,
    Config extends ConfigType = ConfigType
  >
  extends ViewContext<ValueType, Config>
  implements IListViewContext<ValueType, Config> {
  private readonly search: SearchComponentRenderer | undefined;

  private readonly childrenCreator: ChildrenCreator<ValueType>;

  private readonly shorthandNames: ListShorthandRequest;

  private searchContext: ISearchContext | undefined;

  private searchCondition: SearchCondition = {};

  private conditionInited: boolean;

  private dataSourceInited: boolean = false;

  private children: IObjectViewContext[] = [];

  private totalPage: number = 0;

  private currentPage: number = 0;

  private currentPageSize: number = 0;

  constructor(moduleContext: ModuleContext, options: ListViewContextDescriptor<ValueType, Config>) {
    super(moduleContext, { ...options, defaultValue: [] as ValueType });

    const { search } = options;

    this.search = search;
    this.childrenCreator = (data: ValueType) =>
      (data as any).map(record =>
        createViewContext(moduleContext, {
          name: `ObjectViewIn${options.name}`,
          category: 'object',
          widget: '',
          fields: this.getFields(),
          actions: this.getActionsByContextType('single'),
          initialValue: record,
          parent: this,
        }),
      );

    this.conditionInited = !search;
    this.shorthandNames = pick(options, ['getList', 'deleteOne', 'deleteList']);

    if (isPlainObject(search)) {
      const searchContext = createSearchContext(
        search as SearchDescriptor,
        moduleContext.getModel(),
      );

      const loadData = () => this.setCurrentPage(1);

      searchContext.on({
        change: value => (this.searchCondition = value),
        filterChange: ({ name, value }) => (this.searchCondition[name] = value),
        ready: () => (this.conditionInited = true),
        submit: loadData,
        reset: loadData,
      });

      this.searchContext = searchContext;
    }
  }

  public getChildren(): any[] {
    return this.children;
  }

  public getSearch(): SearchComponentRenderer | undefined {
    return this.search;
  }

  public getSearchContext(): ISearchContext | undefined {
    return this.searchContext;
  }

  public getTotal(): number {
    return this.totalPage;
  }

  public getCurrentPage(): number {
    return this.currentPage;
  }

  public setCurrentPage(current: number, silent?: boolean): void {
    const changed = this.currentPage !== current;

    this.currentPage = current;

    if (silent !== true) {
      if (changed) {
        this.emit('currentPageChange', current);
      }

      this.load();
    }
  }

  public getPageSize(): number {
    return this.currentPageSize;
  }

  public setPageSize(size: number, silent?: boolean): void {
    const changed = this.currentPageSize !== size;

    this.currentPageSize = size;

    if (silent !== true) {
      if (changed) {
        this.emit('pageSizeChange', size);
      }

      this.load();
    }
  }

  public setDataSource(data: ValueType): void {
    const copy = clone(data);

    super.setDataSource(copy);

    this.children = this.childrenCreator(copy);

    if (!this.dataSourceInited) {
      this.dataSourceInited = true;
    }

    this.emit('dataChange', data);
  }

  public async load(): Promise<any> {
    if (!this.conditionInited) {
      return;
    }

    this.setBusy(true);

    this.getList(
      resolveListRequestParams(this.searchCondition, this.currentPage, this.currentPageSize),
      (data, { total }) => {
        this.setDataSource(data);
        this.totalPage = total;
        this.emit('totalChange', total);
      },
    ).finally(() => this.setBusy(false));
  }

  public async reload(): Promise<any> {
    await this.load();
  }

  public getList(
    params: RequestParams,
    success?: ResponseSuccess,
    fail?: ResponseFail,
  ): Promise<ResponseResult> {
    return this.getModuleContext().execute(
      this.shorthandNames.getList || 'getList',
      params,
      success,
      fail,
    );
  }

  public deleteOne(
    params: string | number | Record<string, any>,
    success?: ResponseSuccess,
    fail?: ResponseFail,
  ): Promise<ResponseResult> {
    return this.getModuleContext().execute(
      this.shorthandNames.deleteOne || 'deleteOne',
      params,
      success,
      fail,
    );
  }

  public deleteList(
    params: string[] | number[] | Record<string, any>,
    success?: ResponseSuccess,
    fail?: ResponseFail,
  ): Promise<ResponseResult> {
    return this.getModuleContext().execute(
      this.shorthandNames.deleteList || 'deleteList',
      params,
      success,
      fail,
    );
  }
}

export { ListViewContext };
