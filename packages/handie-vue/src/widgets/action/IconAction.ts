import type { VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import {
  ActionWidgetState,
  getControl,
  resolveIconProps,
  resolveControlPropsAndEvents,
} from '@handie/runtime-core';

import { ActionStructuralWidget } from './Action';

@Component
class IconActionStructuralWidget<
  S extends ActionWidgetState = ActionWidgetState
> extends ActionStructuralWidget<S> {
  protected resolveProps(): Record<string, any> {
    return resolveIconProps(this.config);
  }

  protected renderIcon(props: Record<string, any> = {}): VNode {
    const { className, ...others } = props;
    const resolved = resolveControlPropsAndEvents(this.resolveProps(), others);

    return this.$createElement('div', { staticClass: className }, [
      this.$createElement(getControl('Icon'), { props: resolved.props, on: resolved.events }),
      this.renderView(),
    ]);
  }
}

export { IconActionStructuralWidget };
