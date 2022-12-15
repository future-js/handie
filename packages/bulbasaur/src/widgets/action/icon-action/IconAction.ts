import type { VNode } from 'vue';

import { Component } from 'vue-property-decorator';

import { IconActionStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class IconActionWidget extends IconActionStructuralWidget {
  public render(): VNode {
    const { primary, danger } = this.action;
    const classNames: string[] = ['IconActionWidget'];

    if (primary) {
      classNames.push('IconActionWidget--primary');
    }

    if (danger) {
      classNames.push('IconActionWidget--danger');
    }

    return this.renderIcon({
      className: this.resolveClassNames(classNames.join(' ')),
      click: () => this.onExecute(),
    });
  }
}
