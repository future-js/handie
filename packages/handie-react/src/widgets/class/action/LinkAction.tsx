import type { ReactNode } from 'react';

import {
  ActionWidgetState,
  getControl,
  resolveLinkProps,
  resolveControlPropsAndEvents,
} from '@handie/runtime-core';

import type { ComponentCtor } from '../../../types/component';

import { ActionStructuralWidget } from './Action';

class LinkActionStructuralWidget<
  S extends ActionWidgetState = ActionWidgetState
> extends ActionStructuralWidget<S> {
  protected resolveProps(): Record<string, any> {
    return resolveLinkProps(this.config);
  }

  protected renderLink(props: Record<string, any> = {}): ReactNode {
    const Link = getControl('Link') as ComponentCtor;
    const resolved = resolveControlPropsAndEvents(this.resolveProps(), props);

    return (
      <>
        {Link ? (
          <Link {...{ ...resolved.props, ...resolved.events }}>{this.renderContent()}</Link>
        ) : null}
        {this.renderView()}
      </>
    );
  }
}

export { LinkActionStructuralWidget };
