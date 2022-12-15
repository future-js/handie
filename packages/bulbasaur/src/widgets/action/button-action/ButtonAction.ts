import type { VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { ButtonActionStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class ButtonActionWidget extends ButtonActionStructuralWidget {
  public render(): VNode {
    return this.renderButton({
      className: this.resolveClassNames('ButtonActionWidget'),
      click: () => this.onExecute(),
    });
  }
}
