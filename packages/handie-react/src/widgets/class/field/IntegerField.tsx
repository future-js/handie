import type { IntegerFieldWidgetState, IntegerFieldWidgetConfig } from '@handie/runtime-core';
import { IntegerFieldHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FieldStructuralWidget } from './Field';

class IntegerFieldStructuralWidget<
  S extends IntegerFieldWidgetState = IntegerFieldWidgetState,
  CT extends IntegerFieldWidgetConfig = IntegerFieldWidgetConfig
> extends FieldStructuralWidget<number, CT, IntegerFieldHeadlessWidget<CT>, S> {
  public componentWillMount(): void {
    super.componentWillMount();
    this.setHeadlessWidget(new IntegerFieldHeadlessWidget(this.props, this.$$view));
  }
}

export { IntegerFieldStructuralWidget };
