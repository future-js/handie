import { Component, Prop } from 'vue-property-decorator';

import type { EnumFilterWidgetState, EnumFilterWidgetConfig } from '@handie/runtime-core';

import { BaseEnumFilterStructuralWidget } from './BaseEnumFilter';

@Component
class MultiEnumFilterStructuralWidget<
  S extends EnumFilterWidgetState = EnumFilterWidgetState,
  CT extends EnumFilterWidgetConfig = EnumFilterWidgetConfig
> extends BaseEnumFilterStructuralWidget<number[] | string[], S, CT> {
  @Prop({ type: Array, default: () => [] })
  public readonly value!: number[] | string[];

  protected get displayText(): string {
    return this.$$_h.getMultipleDisplayText(this.value, this.optionMap);
  }
}

export { MultiEnumFilterStructuralWidget };
