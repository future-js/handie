import type { ReactNode } from 'react';

import { ComponentCtor, DateValue, getControl } from 'handie-react';
import { DateFilterStructuralWidget } from 'handie-react/dist/widgets/class';

import { getPickerOption } from '../../../../utils';

export default class DateTimeRangeDateFilterWidget extends DateFilterStructuralWidget<
  DateValue[]
> {
  private handleRangeChange(_, dates: (Date | null)[] | null): void {
    this.onRangeChange(dates);

    if (this.searchImmediately) {
      this.$$search.submit();
    }
  }

  public render(): ReactNode {
    const DateTimeRangePicker = getControl(
      'DateTimeRangePicker',
    ) as ComponentCtor;

    return DateTimeRangePicker ? (
      <DateTimeRangePicker
        value={this.getRangeValue()}
        placeholder={this.getRangePlaceholders()}
        format={this.getDisplayFormat()}
        separator={this.getSeparator()}
        pickerOption={getPickerOption(
          this.getRangeValue(),
          this.config,
          this.$$search.getValue(),
        )}
        onChange={this.handleRangeChange.bind(this)}
      />
    ) : null;
  }

  public componentWillMount(): void {
    super.componentWillMount();
    this.setDefaultFormat(this.getCommonBehavior('filter.dateTimeFormat'));
  }
}
