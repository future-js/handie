import type { DataValue, FieldWidgetState, FieldWidgetConfig } from '@handie/runtime-core';
import { FieldHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FieldStructuralWidget } from './Field';

class UntypedFieldStructuralWidget<
  VT extends DataValue = DataValue,
  S extends FieldWidgetState = FieldWidgetState,
  CT extends FieldWidgetConfig = FieldWidgetConfig
> extends FieldStructuralWidget<VT, CT, FieldHeadlessWidget<VT, CT>, S> {
  public componentWillMount(): void {
    super.componentWillMount();
    this.setHeadlessWidget(new FieldHeadlessWidget(this.props, this.$$view));
  }
}

export { UntypedFieldStructuralWidget };
