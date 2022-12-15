import { Component } from 'vue-property-decorator';

import type {
  EnumFieldOption,
  FilterWidgetConfig,
  EnumFilterWidgetState,
  IFilterWidget,
} from '@handie/runtime-core';
import { EnumFilterHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FilterStructuralWidget } from './Filter';

@Component
class BaseEnumFilterStructuralWidget<
  ValueType,
  S extends EnumFilterWidgetState = EnumFilterWidgetState,
  CT extends FilterWidgetConfig = FilterWidgetConfig
> extends FilterStructuralWidget<ValueType, CT, EnumFilterHeadlessWidget<ValueType, CT>, S> {
  protected options: EnumFieldOption[] = [];

  protected optionMap: Record<string, EnumFieldOption> = {};

  protected created(): void {
    this.setHeadlessWidget(
      new EnumFilterHeadlessWidget(this.$props as IFilterWidget<ValueType>, this.$$view),
    );

    this.$$_h.initOptions(this.$$view, options => {
      this.options = options;
      this.optionMap = options.reduce((prev, opt) => ({ ...prev, [opt.value]: opt }), {});
    });
  }
}

export { BaseEnumFilterStructuralWidget };
