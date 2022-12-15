import type { DataValue, BaseWidgetState, FilterWidgetConfig } from '@handie/runtime-core';
import { FilterHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FilterStructuralWidget } from './Filter';

class UntypedFilterStructuralWidget<
  VT extends DataValue = DataValue,
  S extends BaseWidgetState = BaseWidgetState,
  CT extends FilterWidgetConfig = FilterWidgetConfig
> extends FilterStructuralWidget<VT, CT, FilterHeadlessWidget<VT, CT>, S> {
  public componentWillMount(): void {
    this.setHeadlessWidget(new FilterHeadlessWidget(this.props, this.$$view));
  }
}

export { UntypedFilterStructuralWidget };
