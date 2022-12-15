import { Component, Prop } from 'vue-property-decorator';

import type { EnumFieldWidgetConfig, EnumFieldWidgetState } from '@handie/runtime-core';

import { BaseEnumFieldStructuralWidget } from './BaseEnumField';

@Component
class EnumFieldStructuralWidget<
  S extends EnumFieldWidgetState = EnumFieldWidgetState,
  CT extends EnumFieldWidgetConfig = EnumFieldWidgetConfig
> extends BaseEnumFieldStructuralWidget<number | string, S, CT> {
  @Prop({ type: [Number, String], default: '' })
  public readonly value!: number | string;

  protected get displayText(): string {
    return this.$$_h.getSingleDisplayText(this.value, this.options);
  }
}

export { EnumFieldStructuralWidget };
