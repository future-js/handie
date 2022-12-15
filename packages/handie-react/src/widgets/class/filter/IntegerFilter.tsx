import type { IntegerFilterWidgetState, IntegerFilterWidgetConfig } from '@handie/runtime-core';
import { IntegerFilterHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FilterStructuralWidget } from './Filter';

class IntegerFilterStructuralWidget<
  S extends IntegerFilterWidgetState = IntegerFilterWidgetState,
  CT extends IntegerFilterWidgetConfig = IntegerFilterWidgetConfig
> extends FilterStructuralWidget<number, CT, IntegerFilterHeadlessWidget<CT>, S> {
  public componentWillMount(): void {
    this.setHeadlessWidget(new IntegerFilterHeadlessWidget(this.props, this.$$view));
  }
}

export { IntegerFilterStructuralWidget };
