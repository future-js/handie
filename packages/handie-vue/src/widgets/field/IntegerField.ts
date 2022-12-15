import { Component, Prop } from 'vue-property-decorator';

import type {
  IntegerFieldWidgetState,
  IntegerFieldWidgetConfig,
  IFieldWidget,
} from '@handie/runtime-core';
import { IntegerFieldHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FieldStructuralWidget } from './Field';

@Component
class IntegerFieldStructuralWidget<
  S extends IntegerFieldWidgetState = IntegerFieldWidgetState,
  CT extends IntegerFieldWidgetConfig = IntegerFieldWidgetConfig
> extends FieldStructuralWidget<number, CT, IntegerFieldHeadlessWidget<CT>, S> {
  @Prop({ type: Number })
  public readonly value!: number;

  public created(): void {
    this.setHeadlessWidget(
      new IntegerFieldHeadlessWidget(this.$props as IFieldWidget<number>, this.$$view),
    );
  }
}

export { IntegerFieldStructuralWidget };
