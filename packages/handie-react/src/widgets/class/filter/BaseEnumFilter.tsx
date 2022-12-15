import type {
  EnumFieldOption,
  FilterWidgetConfig,
  EnumFilterWidgetState,
} from '@handie/runtime-core';
import { EnumFilterHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FilterStructuralWidget } from './Filter';

class BaseEnumFilterStructuralWidget<
  ValueType,
  S extends EnumFilterWidgetState = EnumFilterWidgetState,
  CT extends FilterWidgetConfig = FilterWidgetConfig
> extends FilterStructuralWidget<ValueType, CT, EnumFilterHeadlessWidget<ValueType, CT>, S> {
  public readonly state = { options: [] as EnumFieldOption[], optionMap: {} } as S;

  public componentWillMount(): void {
    this.setHeadlessWidget(new EnumFilterHeadlessWidget(this.props, this.$$view));

    this.$$_h.initOptions(this.$$view, options =>
      this.setState({
        options,
        optionMap: options.reduce((prev, opt) => ({ ...prev, [opt.value]: opt }), {}),
      }),
    );
  }
}

export { BaseEnumFilterStructuralWidget };
