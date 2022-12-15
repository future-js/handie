import type { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { DateValue, getControl } from 'handie-vue';
import { DateFieldStructuralWidget } from 'handie-vue/dist/widgets';

import { getPickerOption } from '../../../../utils';

@Component
export default class DateTimeRangeEditDateFieldWidget extends DateFieldStructuralWidget<
  DateValue[]
> {
  public render(h: CreateElement): VNode {
    return h(getControl('DateTimeRangePicker'), {
      props: {
        value: this.getRangeValue(),
        placeholder: this.getRangePlaceholders(),
        disabled: this.disabled,
        format: this.getDisplayFormat(),
        separator: this.getSeparator(),
        pickerOption: getPickerOption(this.getRangeValue(), this.config, this.$$view.getValue()),
      },
      on: { change: (_, dates) => this.onRangeChange(dates) },
    });
  }

  public created(): void {
    this.setDefaultFormat(this.getCommonBehavior('field.dateTimeFormat'));
  }
}
