import type { ReactNode } from 'react';

import { LinkActionStructuralWidget } from 'handie-react/dist/widgets/class';

export default class LinkActionWidget extends LinkActionStructuralWidget {
  public render(): ReactNode {
    return this.renderLink({
      className: this.resolveClassNames('ActionWidget LinkActionWidget'),
      onClick: () => this.onExecute(),
    });
  }
}
