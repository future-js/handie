import type { BooleanFilterWidgetState, BooleanFilterWidgetConfig } from '@handie/runtime-core';
import { BooleanFilterHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FilterStructuralWidget } from './Filter';

class BooleanFilterStructuralWidget<
  S extends BooleanFilterWidgetState = BooleanFilterWidgetState,
  CT extends BooleanFilterWidgetConfig = BooleanFilterWidgetConfig
> extends FilterStructuralWidget<boolean, CT, BooleanFilterHeadlessWidget<CT>, S> {
  public componentWillMount(): void {
    this.setHeadlessWidget(new BooleanFilterHeadlessWidget(this.props, this.$$view));
  }
}

export { BooleanFilterStructuralWidget };
