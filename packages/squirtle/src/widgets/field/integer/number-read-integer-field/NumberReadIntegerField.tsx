import { ReactNode } from 'react';

import { IntegerFieldStructuralWidget } from 'handie-react/dist/widgets/class';

export default class NumberReadIntegerFieldWidget extends IntegerFieldStructuralWidget {
  public render(): ReactNode {
    return <span>{this.formatValue()}</span>;
  }
}
