import { Component } from 'vue-property-decorator';

import type { ListValue } from 'handie-vue';
import { RelationFieldStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class SelectReadM2mFieldWidget extends RelationFieldStructuralWidget<ListValue> {
  private optionMap: Record<string, any> = {};

  private get displayText(): string {
    return this.internalValue.map(val => this.optionMap[val]).join('、');
  }

  public created(): void {
    this.fetchRelatedList(
      {},
      data =>
        (this.optionMap = data.reduce(
          (prev, opt) => ({ ...prev, [opt[this.valueKey]]: opt[this.labelKey] }),
          {},
        )),
    );
  }
}
