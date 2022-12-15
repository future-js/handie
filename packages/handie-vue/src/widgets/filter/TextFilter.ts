import { Component, Prop } from 'vue-property-decorator';

import type {
  TextFieldWidgetState,
  TextFieldWidgetConfig,
  IFilterWidget,
} from '@handie/runtime-core';
import { TextFilterHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FilterStructuralWidget } from './Filter';

@Component
class TextFilterStructuralWidget<
  S extends TextFieldWidgetState = TextFieldWidgetState,
  CT extends TextFieldWidgetConfig = TextFieldWidgetConfig
> extends FilterStructuralWidget<string, CT, TextFilterHeadlessWidget<CT>, S> {
  @Prop({ type: String, default: '' })
  public readonly value!: string;

  public created(): void {
    this.setHeadlessWidget(
      new TextFilterHeadlessWidget(this.$props as IFilterWidget<string>, this.$$view),
    );
  }
}

export { TextFilterStructuralWidget };
