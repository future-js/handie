import type { FloatFilterWidgetState, FloatFilterWidgetConfig } from '@handie/runtime-core';
import { FloatFilterHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FilterStructuralWidget } from './Filter';

class FloatFilterStructuralWidget<
  S extends FloatFilterWidgetState = FloatFilterWidgetState,
  CT extends FloatFilterWidgetConfig = FloatFilterWidgetConfig
> extends FilterStructuralWidget<number, CT, FloatFilterHeadlessWidget<CT>, S> {
  public componentWillMount(): void {
    this.setHeadlessWidget(new FloatFilterHeadlessWidget(this.props, this.$$view));
  }
}

export { FloatFilterStructuralWidget };
