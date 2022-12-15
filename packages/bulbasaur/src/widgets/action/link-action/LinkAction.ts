import type { VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { LinkActionStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class LinkActionWidget extends LinkActionStructuralWidget {
  public render(): VNode {
    return this.renderLink({
      className: this.resolveClassNames('ActionWidget LinkActionWidget'),
      click: () => this.onExecute(),
    });
  }
}
