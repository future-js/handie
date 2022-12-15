import { Component, Prop } from 'vue-property-decorator';

import type {
  TextFieldWidgetState,
  TextFieldWidgetConfig,
  IFieldWidget,
} from '@handie/runtime-core';
import { TextFieldHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FieldStructuralWidget } from './Field';

@Component
class TextFieldStructuralWidget<
  S extends TextFieldWidgetState = TextFieldWidgetState,
  CT extends TextFieldWidgetConfig = TextFieldWidgetConfig
> extends FieldStructuralWidget<string, CT, TextFieldHeadlessWidget<CT>, S> {
  @Prop({ type: String, default: '' })
  public readonly value!: string;

  public created(): void {
    this.setHeadlessWidget(
      new TextFieldHeadlessWidget(this.$props as IFieldWidget<string>, this.$$view),
    );
  }
}

export { TextFieldStructuralWidget };
