import type { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { getControl } from 'handie-vue';
import { BooleanFieldStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class SwitchEditBooleanFieldWidget extends BooleanFieldStructuralWidget {
  public render(h: CreateElement): VNode {
    return h(getControl('Switch'), {
      props: { value: this.value, disabled: this.disabled },
      on: { change: this.onChange },
    });
  }
}
