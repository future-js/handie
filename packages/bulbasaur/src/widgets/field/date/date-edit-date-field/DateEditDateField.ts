import type { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { DateValue, getControl } from 'handie-vue';
import { DateFieldStructuralWidget } from 'handie-vue/dist/widgets';

import { getPickerOption } from '../../../../utils';

@Component
export default class DateEditDateFieldWidget extends DateFieldStructuralWidget<DateValue> {
  public render(h: CreateElement): VNode {
    return h(getControl('DatePicker'), {
      props: {
        value: this.getDateValue(),
        placeholder: this.getPlaceholder(),
        disabled: this.disabled,
        format: this.getDisplayFormat(),
        pickerOption: getPickerOption(this.getDateValue(), this.config, this.$$view.getValue()),
      },
      on: { change: (_, date) => this.onDateChange(date) },
    });
  }

  public created(): void {
    this.setDefaultFormat(this.getCommonBehavior('field.dateFormat'));
  }
}
