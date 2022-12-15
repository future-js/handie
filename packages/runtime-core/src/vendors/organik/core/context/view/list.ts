import {
  Pagination,
  ModuleContext,
  SearchCondition,
  ListViewContextDescriptor,
  ListViewContext,
} from '../../typing';
import { createCreator } from '../../creator';

const [getListViewContextCreator, setListViewContextCreator] = createCreator(
  (moduleContext: ModuleContext, options: ListViewContextDescriptor) => ({} as ListViewContext), // eslint-disable-line @typescript-eslint/no-unused-vars
);

function resolveListRequestParams(
  condition: SearchCondition,
  currentPage: number | undefined,
  currentPageSize: number | undefined,
): SearchCondition & Pagination {
  const params = { ...condition } as SearchCondition & Pagination;

  if (currentPage) {
    params.pageNum = currentPage;
  }

  if (currentPageSize) {
    params.pageSize = currentPageSize;
  }

  return params;
}

function createListViewContext<VT, CT>(
  moduleContext: ModuleContext,
  options: ListViewContextDescriptor<VT, CT>,
): ListViewContext<VT, CT> {
  return getListViewContextCreator()(moduleContext, options) as ListViewContext<VT, CT>;
}

export { setListViewContextCreator, resolveListRequestParams, createListViewContext };
