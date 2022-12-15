import type { CreateElement, VNode, VueConstructor, VNodeChildren } from 'vue';
import { Component } from 'vue-property-decorator';

import {
  ObjectViewWidgetState,
  DialogViewWidgetConfig,
  isString,
  isComponentCtor,
} from 'handie-vue';
import { DialogViewStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class DialogViewWidget extends DialogViewStructuralWidget<
  ObjectViewWidgetState,
  DialogViewWidgetConfig
> {
  public render(h: CreateElement): VNode {
    const { $$child } = this.config;

    let resolvedChildren: VNodeChildren;

    if ($$child === undefined) {
      resolvedChildren = this.$slots.default;
    } else if (isComponentCtor($$child)) {
      resolvedChildren = [h($$child as VueConstructor)];
    } else if (isString($$child)) {
      // TODO: use `ViewRenderer`
    }

    return this.renderDialog({
      className: this.getStyleClassName('DialogViewWidget'),
      actionBarClassName: this.getStyleClassName('DialogViewWidget-actionBar'),
      children: resolvedChildren,
    });
  }

  public created(): void {
    this.setStyleClassNames(this.$style);
  }
}
