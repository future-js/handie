import type { ReactNode } from 'react';

import {
  ComponentCtor,
  IntegerFieldWidgetState,
  isNumeric,
  getControl,
} from 'handie-react';
import { IntegerFieldStructuralWidget } from 'handie-react/dist/widgets/class';

import { getNumberInputProps } from '../../../../utils';
import type { NumberIntegerFieldWidgetConfig } from './typing';

export default class NumberEditIntegerFieldWidget extends IntegerFieldStructuralWidget<
  IntegerFieldWidgetState,
  NumberIntegerFieldWidgetConfig
> {
  public render(): ReactNode {
    const NumberInput = getControl('NumberInput') as ComponentCtor;

    return NumberInput ? (
      <NumberInput
        {...getNumberInputProps(this)}
        onChange={(value) =>
          this.onChange(isNumeric(value) ? parseFloat(value) : value)
        }
      />
    ) : null;
  }
}
