import { Component } from 'vue-property-decorator';

import type {
  IntegerFilterWidgetState,
  IntegerFilterWidgetConfig,
  IFilterWidget,
} from '@handie/runtime-core';
import { IntegerFilterHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FilterStructuralWidget } from './Filter';

@Component
class IntegerFilterStructuralWidget<
  S extends IntegerFilterWidgetState = IntegerFilterWidgetState,
  CT extends IntegerFilterWidgetConfig = IntegerFilterWidgetConfig
> extends FilterStructuralWidget<number, CT, IntegerFilterHeadlessWidget<CT>, S> {
  public created(): void {
    this.setHeadlessWidget(
      new IntegerFilterHeadlessWidget(this.$props as IFilterWidget<number>, this.$$view),
    );
  }
}

export { IntegerFilterStructuralWidget };
