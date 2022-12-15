import type { StringFilterWidgetState, StringFilterWidgetConfig } from '@handie/runtime-core';
import { StringFilterHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FilterStructuralWidget } from './Filter';

class StringFilterStructuralWidget<
  S extends StringFilterWidgetState = StringFilterWidgetState,
  CT extends StringFilterWidgetConfig = StringFilterWidgetConfig
> extends FilterStructuralWidget<string, CT, StringFilterHeadlessWidget<CT>, S> {
  public componentWillMount(): void {
    this.setHeadlessWidget(new StringFilterHeadlessWidget(this.props, this.$$view));
  }
}

export { StringFilterStructuralWidget };
