import type { ReactNode } from 'react';

import type { DateValue } from 'handie-react';
import { DateFieldStructuralWidget } from 'handie-react/dist/widgets/class';

export default class DateReadDateFieldWidget extends DateFieldStructuralWidget<DateValue> {
  public render(): ReactNode {
    return <span>{this.getDateValue()}</span>;
  }

  public componentWillMount(): void {
    super.componentWillMount();
    this.setDefaultFormat(this.getCommonBehavior('field.dateFormat'));
  }
}
