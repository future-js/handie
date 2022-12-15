import type { EnumFieldWidgetState, EnumFieldWidgetConfig } from '@handie/runtime-core';

import { BaseEnumFieldStructuralWidget } from './BaseEnumField';

class MultiEnumFieldStructuralWidget<
  S extends EnumFieldWidgetState = EnumFieldWidgetState,
  CT extends EnumFieldWidgetConfig = EnumFieldWidgetConfig
> extends BaseEnumFieldStructuralWidget<number[] | string[], S, CT> {
  protected get displayText(): string {
    return this.$$_h.getMultipleDisplayText(this.props.value, this.state.optionMap);
  }
}

export { MultiEnumFieldStructuralWidget };
