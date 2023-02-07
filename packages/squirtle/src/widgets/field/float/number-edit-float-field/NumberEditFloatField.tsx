import type { ReactNode } from 'react';

import { ComponentCtor, FloatFieldWidgetState, isNumeric, getControl } from 'handie-react';
import { FloatFieldStructuralWidget } from 'handie-react/dist/widgets/class';

import { getNumberInputProps } from '../../../../utils';
import type { NumberFloatFieldWidgetConfig } from './typing';

export default class NumberEditFloatFieldWidget extends FloatFieldStructuralWidget<
  FloatFieldWidgetState,
  NumberFloatFieldWidgetConfig
> {
  public render(): ReactNode {
    const NumberInput = getControl('NumberInput') as ComponentCtor;

    return NumberInput ? (
      <NumberInput
        {...getNumberInputProps(this)}
        onChange={value => this.onChange(isNumeric(value) ? parseFloat(value) : value)}
      />
    ) : null;
  }
}
