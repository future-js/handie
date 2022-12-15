import type { ReactNode } from 'react';

import { ComponentCtor, DateValue, getControl } from 'handie-react';
import { DateFieldStructuralWidget } from 'handie-react/dist/widgets/class';

import { getPickerOption } from '../../../../utils';

export default class DateEditDateFieldWidget extends DateFieldStructuralWidget<DateValue> {
  public render(): ReactNode {
    const DatePicker = getControl('DatePicker') as ComponentCtor;

    return DatePicker ? (
      <DatePicker
        value={this.getDateValue()}
        placeholder={this.getPlaceholder()}
        disabled={this.state.disabled}
        format={this.getDisplayFormat()}
        pickerOption={getPickerOption(
          this.getDateValue(),
          this.config,
          this.$$view.getValue(),
        )}
        onChange={(_, date) => this.onDateChange(date)}
      />
    ) : null;
  }

  public componentWillMount(): void {
    super.componentWillMount();
    this.setDefaultFormat(this.getCommonBehavior('field.dateFormat'));
  }
}
