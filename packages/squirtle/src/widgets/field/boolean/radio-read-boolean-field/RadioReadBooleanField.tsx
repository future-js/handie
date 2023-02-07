import { ReactNode } from 'react';

import { BooleanFieldStructuralWidget } from 'handie-react/dist/widgets/class';

export default class RadioReadBooleanFieldWidget extends BooleanFieldStructuralWidget {
  public render(): ReactNode {
    return <span>{this.props.value ? this.positiveLabel : this.negativeLabel}</span>;
  }
}
