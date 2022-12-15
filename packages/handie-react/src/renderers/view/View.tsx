import { ViewRendererProps, resolveViewWidgetCtor } from '@handie/runtime-core';

import { ReactNode, Component } from 'react';

import type { ComponentCtor } from '../../types/component';
import { isComponentCtor } from '../../utils';

export default class ViewRenderer extends Component<ViewRendererProps> {
  public render(): ReactNode {
    const ViewWidget = resolveViewWidgetCtor<ComponentCtor>(
      this.props,
      /* isComponentCtor */ () => false,
    );

    return ViewWidget ? <ViewWidget /> : null;
  }
}
