import { Component, Prop } from 'vue-property-decorator';

import type {
  StringFieldWidgetState,
  StringFieldWidgetConfig,
  IFieldWidget,
} from '@handie/runtime-core';
import { StringFieldHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FieldStructuralWidget } from './Field';

@Component
class StringFieldStructuralWidget<
  S extends StringFieldWidgetState = StringFieldWidgetState,
  CT extends StringFieldWidgetConfig = StringFieldWidgetConfig
> extends FieldStructuralWidget<string, CT, StringFieldHeadlessWidget<CT>, S> {
  @Prop({ type: String, default: '' })
  public readonly value!: string;

  public created(): void {
    this.setHeadlessWidget(
      new StringFieldHeadlessWidget(this.$props as IFieldWidget<string>, this.$$view),
    );
  }
}

export { StringFieldStructuralWidget };
