import type { EnumFilterWidgetConfig, EnumFilterWidgetState } from '@handie/runtime-core';

import { BaseEnumFilterStructuralWidget } from './BaseEnumFilter';

class EnumFilterStructuralWidget<
  S extends EnumFilterWidgetState = EnumFilterWidgetState,
  CT extends EnumFilterWidgetConfig = EnumFilterWidgetConfig
> extends BaseEnumFilterStructuralWidget<number | string, S, CT> {
  protected get displayText(): string {
    return this.$$_h.getSingleDisplayText(this.props.value, this.state.options);
  }
}

export { EnumFilterStructuralWidget };
