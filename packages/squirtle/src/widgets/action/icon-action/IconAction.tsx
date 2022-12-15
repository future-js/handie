import type { ReactNode } from 'react';

import { IconActionStructuralWidget } from 'handie-react/dist/widgets/class';

export default class IconActionWidget extends IconActionStructuralWidget {
  public render(): ReactNode {
    const { primary, danger } = this.props.action;
    const classNames: string[] = ['IconActionWidget'];

    if (primary) {
      classNames.push('IconActionWidget--primary');
    }

    if (danger) {
      classNames.push('IconActionWidget--danger');
    }

    return this.renderIcon({
      className: this.resolveClassNames(classNames.join(' ')),
      onClick: () => this.onExecute(),
    });
  }
}
