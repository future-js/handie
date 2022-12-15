import type { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { DateValue, getControl } from 'handie-vue';
import { DateFilterStructuralWidget } from 'handie-vue/dist/widgets';

import { getPickerOption } from '../../../../utils';

@Component
export default class DateRangeDateFilterWidget extends DateFilterStructuralWidget<DateValue[]> {
  private handleRangeChange(_, dates: (Date | null)[] | null): void {
    this.onRangeChange(dates);

    if (this.searchImmediately) {
      this.$$search.submit();
    }
  }

  public render(h: CreateElement): VNode {
    return h(getControl('DateRangePicker'), {
      props: {
        value: this.getRangeValue(),
        placeholder: this.getRangePlaceholders(),
        format: this.getDisplayFormat(),
        separator: this.getSeparator(),
        pickerOption: getPickerOption(this.getRangeValue(), this.config, this.$$search.getValue()),
      },
      on: { change: this.handleRangeChange },
    });
  }

  public created(): void {
    this.setDefaultFormat(this.getCommonBehavior('filter.dateFormat'));
  }
}
