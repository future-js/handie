import type { DateValue, DateFieldWidgetState, DateFieldWidgetConfig } from '@handie/runtime-core';
import { DateFieldHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { FieldStructuralWidget } from './Field';

class DateFieldStructuralWidget<
  VT extends DateValue | DateValue[],
  S extends DateFieldWidgetState = DateFieldWidgetState,
  CT extends DateFieldWidgetConfig = DateFieldWidgetConfig
> extends FieldStructuralWidget<VT, CT, DateFieldHeadlessWidget<VT, CT>, S> {
  protected getDateValue(): DateValue {
    return this.$$_h.getDateValue();
  }

  protected getRangeValue(): DateValue[] {
    return this.$$_h.getRangeValue();
  }

  protected getRangePlaceholders(): string[] {
    return this.$$_h.getRangePlaceholders();
  }

  protected setDefaultFormat(format: string = ''): void {
    this.$$_h.setDefaultFormat(format);
  }

  protected getDisplayFormat(): string {
    return this.$$_h.getDisplayFormat();
  }

  protected getSeparator(): string {
    return this.$$_h.getSeparator();
  }

  protected onDateChange(date: Date | null): void {
    this.onChange(this.$$_h.resolveDateValue(date) as VT);
  }

  protected onRangeChange(dates: (Date | null)[] | null): void {
    this.$$_h.setRangeValue(dates, this.onChange);
  }

  public componentWillMount(): void {
    super.componentWillMount();
    this.setHeadlessWidget(new DateFieldHeadlessWidget(this.props, this.$$view));
  }
}

export { DateFieldStructuralWidget };
