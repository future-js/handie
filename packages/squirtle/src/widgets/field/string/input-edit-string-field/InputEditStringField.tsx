import type { ReactNode } from 'react';

import { ComponentCtor, StringFieldWidgetState, getControl } from 'handie-react';
import { StringFieldStructuralWidget } from 'handie-react/dist/widgets/class';

import { getStringInputtableControlProps } from '../../../../utils';
import type { InputStringFieldWidgetConfig } from '../typing';

export default class InputEditStringFieldWidget extends StringFieldStructuralWidget<
  StringFieldWidgetState,
  InputStringFieldWidgetConfig
> {
  public render(): ReactNode {
    const TextInput = getControl('TextInput') as ComponentCtor;

    return TextInput ? (
      <TextInput
        {...getStringInputtableControlProps(this)}
        prefix={this.config.prefix}
        suffix={this.config.suffix}
        onInput={value => this.onChange(value)}
      />
    ) : null;
  }
}
