import type { EnumFieldWidgetConfig, EnumFieldWidgetState } from '@handie/runtime-core';

import { BaseEnumFieldStructuralWidget } from './BaseEnumField';

class EnumFieldStructuralWidget<
  S extends EnumFieldWidgetState = EnumFieldWidgetState,
  CT extends EnumFieldWidgetConfig = EnumFieldWidgetConfig
> extends BaseEnumFieldStructuralWidget<number | string, S, CT> {
  protected get displayText(): string {
    return this.$$_h.getSingleDisplayText(this.props.value, this.state.options);
  }
}

export { EnumFieldStructuralWidget };
