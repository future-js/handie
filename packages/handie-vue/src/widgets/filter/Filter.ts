import { Component, Prop, Inject } from 'vue-property-decorator';

import type {
  DataValue,
  ListViewContext,
  SearchContext,
  BaseWidgetState,
  FilterWidgetConfig,
  IFilterWidget,
} from '@handie/runtime-core';
import type { FilterDescriptor } from '@handie/runtime-core/dist/types/input';
import { FilterHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { BaseStructuralWidget } from '../base';

@Component
class FilterStructuralWidget<
  ValueType = DataValue,
  CT extends FilterWidgetConfig = FilterWidgetConfig,
  HW extends FilterHeadlessWidget<ValueType, CT> = FilterHeadlessWidget<ValueType, CT>,
  S extends BaseWidgetState = BaseWidgetState
> extends BaseStructuralWidget<IFilterWidget<ValueType>, S, CT, HW, ListViewContext> {
  @Prop({ type: Object, default: () => ({}) })
  public readonly filter!: FilterDescriptor;

  /**
   * Access the injected search context
   */
  @Inject({ from: 'searchContext', default: null })
  protected readonly $$search!: SearchContext;

  /**
   * Access the injected view context
   *
   * @deprecated use `$$view` instead, will remove in next major release
   */
  protected readonly viewContext: ListViewContext = this.$$view;

  protected get showValidationRulesAsNative(): boolean {
    return this.$$_h.isValidationRulesShownAsNative();
  }

  protected get searchImmediately(): boolean {
    return this.$$_h.isImmediate();
  }

  protected getPlaceholder(): string {
    return this.$$_h.getPlaceholder();
  }

  protected onChange(value: ValueType): void {
    this.$emit('change', value);
  }
}

export { FilterStructuralWidget };
