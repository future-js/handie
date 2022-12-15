import type { EnumFilterWidgetState, EnumFilterWidgetConfig } from '@handie/runtime-core';

import { BaseEnumFilterStructuralWidget } from './BaseEnumFilter';

class MultiEnumFilterStructuralWidget<
  S extends EnumFilterWidgetState = EnumFilterWidgetState,
  CT extends EnumFilterWidgetConfig = EnumFilterWidgetConfig
> extends BaseEnumFilterStructuralWidget<number[] | string[], S, CT> {
  protected get displayText(): string {
    return this.$$_h.getMultipleDisplayText(this.props.value, this.state.optionMap);
  }
}

export { MultiEnumFilterStructuralWidget };
