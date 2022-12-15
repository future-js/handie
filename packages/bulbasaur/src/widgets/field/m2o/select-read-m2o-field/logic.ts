import { Component } from 'vue-property-decorator';

import type { ObjectValue } from 'handie-vue';
import { RelationFieldStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class SelectReadM2oFieldWidget extends RelationFieldStructuralWidget<ObjectValue> {
  private optionMap: Record<string, any> = {};

  private get displayText(): string {
    return this.optionMap[this.internalValue as any] || '';
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
