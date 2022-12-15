import type { ObjectViewContext } from '../../vendors/organik';

import type { DateValue } from '../../types/value';
import type { DateFieldWidgetConfig } from '../../types/widget/field';
import {
  isFunction,
  isUnixTimestamp,
  isDateValue,
  createMoment,
  resolveDateValue,
  resolveRangePlaceholders,
} from '../../utils';

import { FieldHeadlessWidget } from './Field';

class DateFieldHeadlessWidget<
  VT extends DateValue | DateValue[],
  CT extends DateFieldWidgetConfig = DateFieldWidgetConfig
> extends FieldHeadlessWidget<VT, CT> {
  private __defaultFormat: string = '';

  public setDefaultFormat(format: string): void {
    this.__defaultFormat = format;
  }

  public getDisplayFormat(): string {
    return this.getConfig().format || this.__defaultFormat;
  }

  private getValueFormat(): string {
    return this.getConfig().valueFormat || this.getDisplayFormat();
  }

  private formatDate(value: DateValue): DateValue {
    const resolved = isUnixTimestamp(value) ? (value as number) * 1000 : value;

    return isFunction(this.getField().formatter)
      ? this.getField().formatter!(resolved, this.getViewContext().getValue())
      : createMoment(resolved).format(this.getDisplayFormat());
  }

  public resolveDateValue(date: Date | null): DateValue {
    return resolveDateValue(date, this.getValueFormat());
  }

  /**
   * Get display date value
   *
   * @returns date value for display
   */
  public getDateValue(): DateValue {
    const value = this.getFieldValue() as DateValue;

    return isDateValue(value) ? this.formatDate(value) : value;
  }

  /**
   * Get display date range
   *
   * @returns date range for display
   */
  public getRangeValue(): DateValue[] {
    const { fromField, toField } = this.getConfig();

    let range: DateValue[];

    if (!fromField && !toField) {
      range = (this.getFieldValue() || []) as DateValue[];
    } else {
      range = ['', ''];

      const context = this.getViewContext<ObjectViewContext>();

      if (fromField) {
        range[0] = context.getFieldValue(fromField) || '';
      }

      if (toField) {
        range[1] = context.getFieldValue(toField) || '';
      }
    }

    return range.map(date => (date ? this.formatDate(date) : date));
  }

  public setRangeValue(dates: (Date | null)[] | null, onChange: (value: VT) => void): void {
    const { fromField, toField } = this.getConfig();
    const range = dates ? dates.map(date => this.resolveDateValue(date)) : [];

    if (!fromField && !toField) {
      onChange(range as VT);
    }

    const context = this.getViewContext<ObjectViewContext>();

    context.setFieldValue(fromField!, range[0]);
    context.setFieldValue(toField!, range[1]);
  }

  public getRangePlaceholders(): string[] {
    return resolveRangePlaceholders(this.getViewContext().getFields(), this.getConfig());
  }

  public getSeparator(): string {
    return this.getConfig().separator || '-';
  }
}

export { DateFieldHeadlessWidget };
