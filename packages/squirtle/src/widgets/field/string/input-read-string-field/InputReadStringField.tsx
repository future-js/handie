import type { ReactNode } from 'react';

import { StringFieldStructuralWidget } from 'handie-react/dist/widgets/class';

export default class InputReadStringFieldWidget extends StringFieldStructuralWidget {
  public render(): ReactNode {
    return <span>{this.formatValue()}</span>;
  }
}
