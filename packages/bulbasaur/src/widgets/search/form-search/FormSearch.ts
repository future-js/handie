import type { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { getControl } from 'handie-vue';
import { FormSearchStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class FormSearchWidget extends FormSearchStructuralWidget {
  public render(h: CreateElement): VNode {
    const formChildren = this.renderFilters();
    const standalone = this.isStandalone();
    const buttonGroup = this.renderButtonGroup();

    if (!standalone) {
      formChildren.push(buttonGroup);
    }

    const form = h(
      getControl('Form'),
      { key: 'FormOfFormSearchWidget', props: this.resolveProps() },
      formChildren,
    );

    return h(
      'div',
      { staticClass: this.getStyleClassName('FormSearch') },
      standalone ? [form, buttonGroup] : [form],
    );
  }
}
