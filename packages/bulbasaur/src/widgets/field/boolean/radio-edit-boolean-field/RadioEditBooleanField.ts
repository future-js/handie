import type { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { getControl } from 'handie-vue';
import { BooleanFieldStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class RadioEditBooleanFieldWidget extends BooleanFieldStructuralWidget {
  public render(h: CreateElement): VNode {
    const positiveOption: VNode = h(
      getControl('Radio'),
      { props: { value: true } },
      this.positiveLabel,
    );

    const negativeOption: VNode = h(
      getControl('Radio'),
      { props: { value: false } },
      this.negativeLabel,
    );

    return h(
      getControl('RadioGroup'),
      { props: { value: this.value, disabled: this.disabled }, on: { change: this.onChange } },
      this.negativeFirst ? [negativeOption, positiveOption] : [positiveOption, negativeOption],
    );
  }
}
