import { Component, Prop } from 'vue-property-decorator';

import type {
  BooleanFieldWidgetState,
  BooleanFieldWidgetConfig,
  IFieldWidget,
} from '@handie/runtime-core';
import { BooleanFieldHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FieldStructuralWidget } from './Field';

@Component
class BooleanFieldStructuralWidget<
  S extends BooleanFieldWidgetState = BooleanFieldWidgetState,
  CT extends BooleanFieldWidgetConfig = BooleanFieldWidgetConfig
> extends FieldStructuralWidget<boolean, CT, BooleanFieldHeadlessWidget<CT>, S> {
  @Prop({ type: Boolean, default: false })
  public readonly value!: boolean;

  protected get positiveLabel(): string {
    return this.$$_h.getPositiveLabel();
  }

  protected get negativeLabel(): string {
    return this.$$_h.getNegativeLabel();
  }

  protected get negativeFirst(): boolean {
    return this.$$_h.isNegativeFirst();
  }

  public created(): void {
    this.setHeadlessWidget(
      new BooleanFieldHeadlessWidget(this.$props as IFieldWidget<boolean>, this.$$view),
    );
  }
}

export { BooleanFieldStructuralWidget };
