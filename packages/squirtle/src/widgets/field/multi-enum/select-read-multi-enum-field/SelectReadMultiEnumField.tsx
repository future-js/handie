import type { ReactNode } from 'react';

import { MultiEnumFieldStructuralWidget } from 'handie-react/dist/widgets/class';

export default class SelectReadMultiEnumFieldWidget extends MultiEnumFieldStructuralWidget {
  public render(): ReactNode {
    return <span>{this.displayText}</span>;
  }
}
