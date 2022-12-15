import { Component } from 'vue-property-decorator';

import type { DateValue } from 'handie-vue';
import { DateFieldStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class DateTimeRangeReadDateFieldWidget extends DateFieldStructuralWidget<
  DateValue[]
> {
  public created(): void {
    this.setDefaultFormat(this.getCommonBehavior('field.dateTimeFormat'));
  }
}
