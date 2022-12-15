import type { ReactNode } from 'react';

import { EnumFieldStructuralWidget } from 'handie-react/dist/widgets/class';

export default class SelectReadEnumFieldWidget extends EnumFieldStructuralWidget {
  public render(): ReactNode {
    return <span>{this.displayText}</span>;
  }
}
