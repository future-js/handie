import type { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { DateValue, getControl } from 'handie-vue';
import { DateFieldStructuralWidget } from 'handie-vue/dist/widgets';

import { getPickerOption } from '../../../../utils';

@Component
export default class DateTimeEditDateFieldWidget extends DateFieldStructuralWidget<DateValue> {
  public render(h: CreateElement): VNode {
    return h(getControl('DateTimePicker'), {
      props: {
        value: this.value,
        placeholder: this.getPlaceholder(),
        disabled: this.disabled,
        format: this.getDisplayFormat(),
        pickerOption: getPickerOption(this.value, this.config, this.$$view.getValue()),
      },
      on: { change: (_, date) => this.onDateChange(date) },
    });
  }

  public created(): void {
    this.setDefaultFormat(this.getCommonBehavior('field.dateTimeFormat'));
  }
}
