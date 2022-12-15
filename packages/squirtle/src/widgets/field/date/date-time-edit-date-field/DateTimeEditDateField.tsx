import type { ReactNode } from 'react';

import { ComponentCtor, DateValue, getControl } from 'handie-react';
import { DateFieldStructuralWidget } from 'handie-react/dist/widgets/class';

import { getPickerOption } from '../../../../utils';

export default class DateTimeEditDateFieldWidget extends DateFieldStructuralWidget<DateValue> {
  public render(): ReactNode {
    const DateTimePicker = getControl('DateTimePicker') as ComponentCtor;

    return DateTimePicker ? (
      <DateTimePicker
        value={this.props.value}
        placeholder={this.getPlaceholder()}
        disabled={this.state.disabled}
        format={this.getDisplayFormat()}
        pickerOption={getPickerOption(
          this.props.value,
          this.config,
          this.$$view.getValue(),
        )}
        onChange={(_, date) => this.onDateChange(date)}
      />
    ) : null;
  }

  public componentWillMount(): void {
    super.componentWillMount();
    this.setDefaultFormat(this.getCommonBehavior('field.dateTimeFormat'));
  }
}
