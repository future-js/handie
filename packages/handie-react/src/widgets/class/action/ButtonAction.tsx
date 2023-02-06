import type { ReactNode } from 'react';

import {
  ActionWidgetState,
  getControl,
  resolveButtonProps,
  resolveControlPropsAndEvents,
} from '@handie/runtime-core';

import type { ComponentCtor } from '../../../types/component';
import { ButtonActionWidgetConfig } from '../../../types/widget';

import { ActionStructuralWidget } from './Action';

class ButtonActionStructuralWidget<
  S extends ActionWidgetState = ActionWidgetState,
  C extends ButtonActionWidgetConfig = ButtonActionWidgetConfig
> extends ActionStructuralWidget<S, C> {
  protected resolveProps(): Record<string, any> {
    return resolveButtonProps(this.props.action, this.config, this.state.disabled);
  }

  protected renderButton(props: Record<string, any> = {}): ReactNode {
    const Button = getControl('Button') as ComponentCtor;
    const { className, ...others } = props;
    const resolved = resolveControlPropsAndEvents(this.resolveProps(), others);

    return (
      <div className={className}>
        {Button ? (
          <Button {...{ ...resolved.props, ...resolved.events }}>{this.renderContent()}</Button>
        ) : null}
        {this.renderView()}
      </div>
    );
  }
}

export { ButtonActionStructuralWidget };
