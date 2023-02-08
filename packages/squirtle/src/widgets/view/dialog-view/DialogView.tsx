import type { ReactNode } from 'react';

import {
  ComponentCtor,
  DialogViewWidgetState,
  DialogViewWidgetConfig,
  isString,
  isComponentCtor,
} from 'handie-react';
import { DialogViewStructuralWidget } from 'handie-react/dist/widgets/class';

import style from './style.scss';

export default class DialogViewWidget extends DialogViewStructuralWidget<
  DialogViewWidgetState,
  DialogViewWidgetConfig
> {
  public render(): ReactNode {
    const { $$child } = this.config;

    let resolvedChildren: ReactNode;

    if ($$child === undefined) {
      resolvedChildren = this.props.children;
    } else if (isComponentCtor($$child)) {
      const DialogContent = $$child as ComponentCtor;

      resolvedChildren = <DialogContent />;
    } else if (isString($$child)) {
      // TODO: use `ViewRenderer`
    }

    return this.renderDialog({
      className: this.getStyleClassName('DialogViewWidget'),
      actionBarClassName: this.getStyleClassName('DialogViewWidget-actionBar'),
      children: resolvedChildren,
    });
  }

  public created(): void {
    this.setStyleClassNames(style);
  }
}
