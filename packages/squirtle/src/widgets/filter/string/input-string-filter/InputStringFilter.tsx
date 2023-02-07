import type { ReactNode } from 'react';

import { ComponentCtor, getControl } from 'handie-react';
import { StringFilterStructuralWidget } from 'handie-react/dist/widgets/class';

import { getStringInputtableControlProps } from '../../../../utils';

export default class InputStringFilterWidget extends StringFilterStructuralWidget {
  public render(): ReactNode {
    const props: Record<string, any> = getStringInputtableControlProps(this, true);

    if (this.config.className) {
      props.className = this.config.className;
    }

    const TextInput = getControl('TextInput') as ComponentCtor;

    return TextInput ? <TextInput {...props} onInput={value => this.onChange(value)} /> : null;
  }
}
