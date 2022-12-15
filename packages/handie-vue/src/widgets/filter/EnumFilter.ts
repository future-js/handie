import { Component, Prop } from 'vue-property-decorator';

import type { EnumFilterWidgetConfig, EnumFilterWidgetState } from '@handie/runtime-core';

import { BaseEnumFilterStructuralWidget } from './BaseEnumFilter';

@Component
class EnumFilterStructuralWidget<
  S extends EnumFilterWidgetState = EnumFilterWidgetState,
  CT extends EnumFilterWidgetConfig = EnumFilterWidgetConfig
> extends BaseEnumFilterStructuralWidget<number | string, S, CT> {
  @Prop({ type: [Number, String], default: '' })
  public readonly value!: number | string;

  protected get displayText(): string {
    return this.$$_h.getSingleDisplayText(this.value, this.options);
  }
}

export { EnumFilterStructuralWidget };
