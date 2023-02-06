import type { ReactNode } from 'react';

import { ViewRendererProps, resolveViewWidgetCtor } from '@handie/runtime-core';

import type { ComponentCtor } from '../../types/component';
import { isComponentCtor } from '../../utils';
import BaseRenderer from '../base';

export default class ViewRenderer extends BaseRenderer<ViewRendererProps> {
  public render(): ReactNode {
    const ViewWidget = resolveViewWidgetCtor<ComponentCtor>(
      this.props,
      /* isComponentCtor */ () => false,
    );

    return ViewWidget ? <ViewWidget /> : null;
  }
}
