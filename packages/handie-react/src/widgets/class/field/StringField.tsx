import type { StringFieldWidgetState, StringFieldWidgetConfig } from '@handie/runtime-core';
import { StringFieldHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FieldStructuralWidget } from './Field';

class StringFieldStructuralWidget<
  S extends StringFieldWidgetState = StringFieldWidgetState,
  CT extends StringFieldWidgetConfig = StringFieldWidgetConfig
> extends FieldStructuralWidget<string, CT, StringFieldHeadlessWidget<CT>, S> {
  public componentWillMount(): void {
    super.componentWillMount();
    this.setHeadlessWidget(new StringFieldHeadlessWidget(this.props, this.$$view));
  }
}

export { StringFieldStructuralWidget };
