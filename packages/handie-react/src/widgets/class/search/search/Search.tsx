import {
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
  noop,
} from '@handie/runtime-core';
import { SearchHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { getEventWithNamespace, resolveBindEvent } from '../../../../utils';
import { BaseStructuralWidget } from '../../base';

class SearchStructuralWidget<
  S extends SearchWidgetState = SearchWidgetState,
  CT extends SearchWidgetConfig = SearchWidgetConfig
> extends BaseStructuralWidget<ISearchWidget, S, CT, SearchHeadlessWidget<CT>, ListViewContext> {
  public readonly state = { condition: {} } as S;

  private conditionStateInited: boolean = false;
  private conditionStateCallback: () => void = noop;

  protected get $$search(): SearchContext {
    return this.context.searchContext;
  }

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
    const callback = () => this.$$search.setValue({ ...this.state.condition, ...condition });

    if (this.conditionStateInited) {
      callback();
    } else {
      this.conditionStateCallback = callback;
    }
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

  public componentWillMount(): void {
    this.setHeadlessWidget(new SearchHeadlessWidget(this.props, this.$$view));

    const { condition, events } = this.$$_h.resolveInitialSettings();

    this.setState({ condition }, () => {
      if (this.conditionStateInited) {
        return;
      }

      this.conditionStateCallback();

      this.conditionStateInited = true;
      this.conditionStateCallback = noop;
    });

    this.on({
      change: value => this.setState({ condition: { ...value } }),
      filterChange: ({ name, value }) =>
        this.setState(state => ({ condition: { ...state.condition, [name]: value } })),
      ...events,
    });
  }
}

export { SearchStructuralWidget };
