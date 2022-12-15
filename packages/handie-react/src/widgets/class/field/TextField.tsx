import type { TextFieldWidgetState, TextFieldWidgetConfig } from '@handie/runtime-core';
import { TextFieldHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FieldStructuralWidget } from './Field';

class TextFieldStructuralWidget<
  S extends TextFieldWidgetState = TextFieldWidgetState,
  CT extends TextFieldWidgetConfig = TextFieldWidgetConfig
> extends FieldStructuralWidget<string, CT, TextFieldHeadlessWidget<CT>, S> {
  public componentWillMount(): void {
    super.componentWillMount();
    this.setHeadlessWidget(new TextFieldHeadlessWidget(this.props, this.$$view));
  }
}

export { TextFieldStructuralWidget };
