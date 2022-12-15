import { Component } from 'vue-property-decorator';

import type {
  FloatFilterWidgetState,
  FloatFilterWidgetConfig,
  IFilterWidget,
} from '@handie/runtime-core';
import { FloatFilterHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FilterStructuralWidget } from './Filter';

@Component
class FloatFilterStructuralWidget<
  S extends FloatFilterWidgetState = FloatFilterWidgetState,
  CT extends FloatFilterWidgetConfig = FloatFilterWidgetConfig
> extends FilterStructuralWidget<number, CT, FloatFilterHeadlessWidget<CT>, S> {
  public created(): void {
    this.setHeadlessWidget(
      new FloatFilterHeadlessWidget(this.$props as IFilterWidget<number>, this.$$view),
    );
  }
}

export { FloatFilterStructuralWidget };
