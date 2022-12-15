import type { ReactNode } from 'react';

import { ComponentCtor, DateValue, getControl } from 'handie-react';
import { DateFieldStructuralWidget } from 'handie-react/dist/widgets/class';

import { getPickerOption } from '../../../../utils';

export default class DateTimeRangeEditDateFieldWidget extends DateFieldStructuralWidget<
  DateValue[]
> {
  public render(): ReactNode {
    const DateTimeRangePicker = getControl(
      'DateTimeRangePicker',
    ) as ComponentCtor;
    return DateTimeRangePicker ? (
      <DateTimeRangePicker
        value={this.getRangeValue()}
        placeholder={this.getRangePlaceholders()}
        disabled={this.state.disabled}
        format={this.getDisplayFormat()}
        separator={this.getSeparator()}
        pickerOption={getPickerOption(
          this.getRangeValue(),
          this.config,
          this.$$view.getValue(),
        )}
        onChange={(_, dates) => this.onRangeChange(dates)}
      />
    ) : null;
  }

  public componentWillMount(): void {
    super.componentWillMount();
    this.setDefaultFormat(this.getCommonBehavior('field.dateTimeFormat'));
  }
}
