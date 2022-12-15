import type { ReactNode } from 'react';

import { ComponentCtor, getControl } from 'handie-react';
import { StringFieldStructuralWidget } from 'handie-react/dist/widgets/class';

import { getStringInputtableControlProps } from '../../../../utils';

export default class PasswordEditStringFieldWidget extends StringFieldStructuralWidget {
  public render(): ReactNode {
    const Password = getControl('Password') as ComponentCtor;

    return Password ? (
      <Password
        {...getStringInputtableControlProps(this)}
        onInput={(value) => this.onChange(value)}
      />
    ) : null;
  }
}
