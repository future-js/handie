import type { ReactNode } from 'react';

import {
  ActionWidgetState,
  getControl,
  resolveIconProps,
  resolveControlPropsAndEvents,
} from '@handie/runtime-core';

import type { ComponentCtor } from '../../../types/component';

import { ActionStructuralWidget } from './Action';

class IconActionStructuralWidget<
  S extends ActionWidgetState = ActionWidgetState
> extends ActionStructuralWidget<S> {
  protected resolveProps(): Record<string, any> {
    return resolveIconProps(this.config);
  }

  protected renderIcon(props: Record<string, any> = {}): ReactNode {
    const Icon = getControl('Icon') as ComponentCtor;
    const { className, ...others } = props;
    const resolved = resolveControlPropsAndEvents(this.resolveProps(), others);

    return (
      <div className={className}>
        {Icon ? <Icon {...{ ...resolved.props, ...resolved.events }} /> : null}
        {this.renderView()}
      </div>
    );
  }
}

export { IconActionStructuralWidget };
