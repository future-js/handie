import type { ReactNode } from 'react';

import { ActionRendererProps, IActionWidget, resolveActionWidgetCtor } from '@handie/runtime-core';

import type { ComponentCtor } from '../../types/component';
import BaseRenderer from '../base';

export default class ActionRenderer extends BaseRenderer<ActionRendererProps> {
  public render(): ReactNode {
    const { action } = this.props;

    if (!action) {
      return null;
    }

    const ActionWidget = resolveActionWidgetCtor<ComponentCtor<IActionWidget>>(
      this.$$view.getModuleContext(),
      this.props,
    );

    return ActionWidget ? <ActionWidget action={action} /> : null;
  }
}
