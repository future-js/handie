import type { TextFieldWidgetState, TextFieldWidgetConfig } from '@handie/runtime-core';
import { TextFilterHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FilterStructuralWidget } from './Filter';

class TextFilterStructuralWidget<
  S extends TextFieldWidgetState = TextFieldWidgetState,
  CT extends TextFieldWidgetConfig = TextFieldWidgetConfig
> extends FilterStructuralWidget<string, CT, TextFilterHeadlessWidget<CT>, S> {
  public componentWillMount(): void {
    this.setHeadlessWidget(new TextFilterHeadlessWidget(this.props, this.$$view));
  }
}

export { TextFilterStructuralWidget };
