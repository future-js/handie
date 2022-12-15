import { Component, Prop } from 'vue-property-decorator';

import type {
  StringFilterWidgetState,
  StringFilterWidgetConfig,
  IFilterWidget,
} from '@handie/runtime-core';
import { StringFilterHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FilterStructuralWidget } from './Filter';

@Component
class StringFilterStructuralWidget<
  S extends StringFilterWidgetState = StringFilterWidgetState,
  CT extends StringFilterWidgetConfig = StringFilterWidgetConfig
> extends FilterStructuralWidget<string, CT, StringFilterHeadlessWidget<CT>, S> {
  @Prop({ type: String, default: '' })
  public readonly value!: string;

  public created(): void {
    this.setHeadlessWidget(
      new StringFilterHeadlessWidget(this.$props as IFilterWidget<string>, this.$$view),
    );
  }
}

export { StringFilterStructuralWidget };
