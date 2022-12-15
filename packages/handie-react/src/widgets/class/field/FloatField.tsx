import type { FloatFieldWidgetState, FloatFieldWidgetConfig } from '@handie/runtime-core';
import { FloatFieldHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FieldStructuralWidget } from './Field';

class FloatFieldStructuralWidget<
  S extends FloatFieldWidgetState = FloatFieldWidgetState,
  CT extends FloatFieldWidgetConfig = FloatFieldWidgetConfig
> extends FieldStructuralWidget<number, CT, FloatFieldHeadlessWidget<CT>, S> {
  public componentWillMount(): void {
    super.componentWillMount();
    this.setHeadlessWidget(new FloatFieldHeadlessWidget(this.props, this.$$view));
  }

  public componentDidMount(): void {
    const { rule, message } = this.config;

    if (rule) {
      this.setValueChecker(value => ({
        success: rule.test(`${value}`),
        message,
      }));
    }
  }
}

export { FloatFieldStructuralWidget };
