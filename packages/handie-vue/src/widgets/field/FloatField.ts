import { Component, Prop } from 'vue-property-decorator';

import type {
  FloatFieldWidgetState,
  FloatFieldWidgetConfig,
  IFieldWidget,
} from '@handie/runtime-core';
import { FloatFieldHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FieldStructuralWidget } from './Field';

@Component
class FloatFieldStructuralWidget<
  S extends FloatFieldWidgetState = FloatFieldWidgetState,
  CT extends FloatFieldWidgetConfig = FloatFieldWidgetConfig
> extends FieldStructuralWidget<number, CT, FloatFieldHeadlessWidget<CT>, S> {
  @Prop({ type: Number })
  public readonly value!: number;

  public created(): void {
    this.setHeadlessWidget(
      new FloatFieldHeadlessWidget(this.$props as IFieldWidget<number>, this.$$view),
    );
  }

  public mounted(): void {
    const { rule, message } = this.config;

    if (rule) {
      this.setValueChecker(value => ({
        success: rule.test(`${value}`),
        message,
      }));
    }
  }
}

export { FloatFieldStructuralWidget };
