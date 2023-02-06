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
    const { className, ...others } = props;
    const resolved = resolveControlPropsAndEvents(this.resolveProps(), others);

    return (
      <div className={className}>
        {Link ? (
          <Link {...{ ...resolved.props, ...resolved.events }}>{this.renderContent()}</Link>
        ) : null}
        {this.renderView()}
      </div>
    );
  }
}

export { LinkActionStructuralWidget };
