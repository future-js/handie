import type { ReactNode } from 'react';

import { ComponentCtor, getControl } from 'handie-react';
import { BooleanFieldStructuralWidget } from 'handie-react/dist/widgets/class';

export default class RadioEditBooleanFieldWidget extends BooleanFieldStructuralWidget {
  public render(): ReactNode {
    const Radio = getControl('Radio') as ComponentCtor;
    const RadioGroup = getControl('RadioGroup') as ComponentCtor;

    const positiveOption: ReactNode = Radio ? (
      <Radio value={true}>{this.positiveLabel}</Radio>
    ) : null;

    const negativeOption: ReactNode = Radio ? (
      <Radio value={false}>{this.negativeLabel}</Radio>
    ) : null;

    return RadioGroup ? (
      <RadioGroup
        value={this.props.value}
        disabled={this.state.disabled}
        onChange={value => this.onChange(value)}
      >
        {this.negativeFirst ? [negativeOption, positiveOption] : [positiveOption, negativeOption]}
      </RadioGroup>
    ) : null;
  }
}
