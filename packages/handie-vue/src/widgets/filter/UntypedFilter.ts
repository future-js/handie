import { Component } from 'vue-property-decorator';

import type {
  DataValue,
  BaseWidgetState,
  FilterWidgetConfig,
  IFilterWidget,
} from '@handie/runtime-core';
import { FilterHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FilterStructuralWidget } from './Filter';

@Component
class UntypedFilterStructuralWidget<
  VT extends DataValue = DataValue,
  S extends BaseWidgetState = BaseWidgetState,
  CT extends FilterWidgetConfig = FilterWidgetConfig
> extends FilterStructuralWidget<VT, CT, FilterHeadlessWidget<VT, CT>, S> {
  public created(): void {
    this.setHeadlessWidget(new FilterHeadlessWidget(this.$props as IFilterWidget<VT>, this.$$view));
  }
}

export { UntypedFilterStructuralWidget };
