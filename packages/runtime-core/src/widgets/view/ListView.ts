import type { ListViewContext } from '../../vendors/organik';

import type { EnumFieldOptionGetter, EnumField, MultiEnumField } from '../../types/input';
import type { ListViewWidgetConfig } from '../../types/widget/view';

import {
  isNumeric,
  isFunction,
  isEnumField,
  isConditionPersisted,
  restoreFromUrl,
  cacheDynamicEnumOptions,
  getCachedEnumOptions,
} from '../../utils';
import { ViewHeadlessWidget } from './View';

class ListViewHeadlessWidget<
  CT extends ListViewWidgetConfig = ListViewWidgetConfig
> extends ViewHeadlessWidget<CT> {
  public getDefaultPageSize(): number {
    return (
      this.getConfig().defaultPageSize || this.getCommonBehavior('view.listViewDefaultPageSize', 20)
    );
  }

  public initPagination(
    initialPageNum: number,
    stateUpdater: (pagination: { pageSize: number; pageNum: number }) => any,
  ): void {
    const context = this.getViewContext<ListViewContext>();

    let resolvedPageSize = this.getDefaultPageSize();
    let resolvedPageNum = initialPageNum;

    if (isConditionPersisted(context)) {
      const { pageSize, pageNum } = restoreFromUrl(this.getAppHelper().history);

      if (isNumeric(pageSize)) {
        resolvedPageSize = Number(pageSize);
      }

      if (isNumeric(pageNum)) {
        resolvedPageNum = Number(pageNum);
      }
    }

    stateUpdater({ pageSize: resolvedPageSize, pageNum: resolvedPageNum });

    context.setCurrentPage(resolvedPageNum, true);
    context.setPageSize(resolvedPageSize, true);
  }

  public loadData(): void {
    const context = this.getViewContext<ListViewContext>();
    const moduleName = context.getModuleContext().getModuleName();
    const needCacheDynamicEnumFields = context
      .getFields()
      .filter(
        field =>
          isEnumField(field) &&
          isFunction((field as EnumField | MultiEnumField).options) &&
          !getCachedEnumOptions(moduleName, field),
      );

    // 有动态选项的枚举字段时先发相关 HTTP 请求并将结果缓存，
    // 以避免列表渲染时发出很多相关 HTTP 请求
    if (needCacheDynamicEnumFields.length > 0) {
      Promise.all(
        needCacheDynamicEnumFields.map(field =>
          ((field as EnumField | MultiEnumField).options as EnumFieldOptionGetter)(),
        ),
      ).then(results => {
        results.forEach((result, idx) => {
          if (result.success) {
            cacheDynamicEnumOptions(moduleName, needCacheDynamicEnumFields[idx], result.data);
          }
        });

        context.load();
      });
    } else {
      context.load();
    }
  }
}

export { ListViewHeadlessWidget };
