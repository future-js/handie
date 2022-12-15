import { Component, Prop } from 'vue-property-decorator';

import type { EnumFieldWidgetState, EnumFieldWidgetConfig } from '@handie/runtime-core';

import { BaseEnumFieldStructuralWidget } from './BaseEnumField';

@Component
class MultiEnumFieldStructuralWidget<
  S extends EnumFieldWidgetState = EnumFieldWidgetState,
  CT extends EnumFieldWidgetConfig = EnumFieldWidgetConfig
> extends BaseEnumFieldStructuralWidget<number[] | string[], S, CT> {
  @Prop({ type: Array, default: () => [] })
  public readonly value!: number[] | string[];

  protected get displayText(): string {
    return this.$$_h.getMultipleDisplayText(this.value, this.optionMap);
  }
}

export { MultiEnumFieldStructuralWidget };
