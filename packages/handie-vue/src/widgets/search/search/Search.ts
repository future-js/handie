import { Component, Inject } from 'vue-property-decorator';

import type {
  EventHandlers,
  EventHandler,
  DataValue,
  FilterDescriptor,
  SearchCondition,
  SearchContext,
  ListViewContext,
  SearchWidgetConfig,
  SearchWidgetState,
  ISearchWidget,
} from '@handie/runtime-core';
import { SearchHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { getEventWithNamespace, resolveBindEvent } from '../../../utils';
import { BaseStructuralWidget } from '../../base';

@Component
class SearchStructuralWidget<
  S extends SearchWidgetState = SearchWidgetState,
  CT extends SearchWidgetConfig = SearchWidgetConfig
> extends BaseStructuralWidget<ISearchWidget, S, CT, SearchHeadlessWidget<CT>, ListViewContext> {
  @Inject({ from: 'searchContext', default: null })
  protected readonly $$search!: SearchContext;

  /**
   * Access the injected view context
   *
   * @deprecated use `$$view` instead, will remove in next major release
   */
  protected readonly viewContext: ListViewContext = this.$$view;

  /**
   * Access the injected search context
   *
   * @deprecated use `$$search` instead, will remove in next major release
   */
  protected readonly context: SearchContext = this.$$search;

  protected condition: SearchCondition = {};

  protected get filters(): FilterDescriptor[] {
    return this.$$search ? this.$$search.getFilters() : [];
  }

  protected on(event: string | EventHandlers, handler?: EventHandler): void {
    this.$$search.on(resolveBindEvent(this, event), handler);
  }

  protected off(event?: string, handler?: EventHandler): void {
    this.$$search.off(getEventWithNamespace(this, event), handler);
  }

  protected initCondition(condition: SearchCondition = {}): void {
    this.$$search.setValue({ ...this.condition, ...condition });
  }

  protected setFilterValue(name: string, value: DataValue): void {
    this.$$search.setFilterValue(name, value);
  }

  protected submit(): void {
    this.$$search.submit();
  }

  protected reset(): void {
    this.$$search.reset();
  }

  public created(): void {
    this.setHeadlessWidget(new SearchHeadlessWidget(this.$props, this.$$view));

    const { condition, events } = this.$$_h.resolveInitialSettings();

    this.condition = condition;

    this.on({
      change: value => (this.condition = { ...value }),
      filterChange: ({ name, value }) => (this.condition[name] = value),
      ...events,
    });
  }

  public mounted(): void {
    // TODO:
    // 为解决搜索上下文已实例化状态下视图部件重新创建时搜索条件值初始化与列表数据加载顺序颠倒的问题而采取的临时方案，
    // 待上下文随部件销毁而销毁时可以考虑去掉
    this.$$search.emit(`mount.${this.$$view.getId()}`);
  }
}

export { SearchStructuralWidget };
