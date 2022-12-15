import type { VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import {
  ActionWidgetState,
  getControl,
  resolveLinkProps,
  resolveControlPropsAndEvents,
} from '@handie/runtime-core';

import { ActionStructuralWidget } from './Action';

@Component
class LinkActionStructuralWidget<
  S extends ActionWidgetState = ActionWidgetState
> extends ActionStructuralWidget<S> {
  protected resolveProps(): Record<string, any> {
    return resolveLinkProps(this.config);
  }

  protected renderLink(props: Record<string, any> = {}): VNode {
    const { className, ...others } = props;
    const resolved = resolveControlPropsAndEvents(this.resolveProps(), others);

    return this.$createElement('div', { staticClass: className }, [
      this.$createElement(
        getControl('Link'),
        { props: resolved.props, on: resolved.events },
        this.renderContent(),
      ),
      this.renderView(),
    ]);
  }
}

export { LinkActionStructuralWidget };
