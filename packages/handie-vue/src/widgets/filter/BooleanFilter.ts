import { Component } from 'vue-property-decorator';

import type {
  BooleanFilterWidgetState,
  BooleanFilterWidgetConfig,
  IFilterWidget,
} from '@handie/runtime-core';
import { BooleanFilterHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FilterStructuralWidget } from './Filter';

@Component
class BooleanFilterStructuralWidget<
  S extends BooleanFilterWidgetState = BooleanFilterWidgetState,
  CT extends BooleanFilterWidgetConfig = BooleanFilterWidgetConfig
> extends FilterStructuralWidget<boolean, CT, BooleanFilterHeadlessWidget<CT>, S> {
  public created(): void {
    this.setHeadlessWidget(
      new BooleanFilterHeadlessWidget(this.$props as IFilterWidget<boolean>, this.$$view),
    );
  }
}

export { BooleanFilterStructuralWidget };
