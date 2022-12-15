import type { VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import {
  ActionWidgetState,
  ButtonProps,
  getControl,
  resolveButtonProps,
  resolveControlPropsAndEvents,
} from '@handie/runtime-core';

import { ButtonActionWidgetConfig } from '../../types/widget';

import { ActionStructuralWidget } from './Action';

@Component
class ButtonActionStructuralWidget<
  S extends ActionWidgetState = ActionWidgetState,
  C extends ButtonActionWidgetConfig = ButtonActionWidgetConfig
> extends ActionStructuralWidget<S, C> {
  protected resolveProps(): Partial<ButtonProps> {
    return resolveButtonProps(this.action, this.config, this.disabled);
  }

  protected renderButton(props: Record<string, any> = {}): VNode {
    const { className, ...others } = props;
    const resolved = resolveControlPropsAndEvents(this.resolveProps(), others);

    return this.$createElement('div', { staticClass: className }, [
      this.$createElement(
        getControl('Button'),
        { props: resolved.props, on: resolved.events },
        this.renderContent(),
      ),
      this.renderView(),
    ]);
  }
}

export { ButtonActionStructuralWidget };
