import type { ReactNode } from 'react';

import { FloatFieldStructuralWidget } from 'handie-react/dist/widgets/class';

export default class NumberReadFloatFieldWidget extends FloatFieldStructuralWidget {
  public render(): ReactNode {
    return <span>{this.formatValue()}</span>;
  }
}
