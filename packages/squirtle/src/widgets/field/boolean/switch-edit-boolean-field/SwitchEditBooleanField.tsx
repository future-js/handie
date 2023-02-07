import type { ReactNode } from 'react';

import { ComponentCtor, getControl } from 'handie-react';
import { BooleanFieldStructuralWidget } from 'handie-react/dist/widgets/class';

export default class SwitchEditBooleanFieldWidget extends BooleanFieldStructuralWidget {
  public render(): ReactNode {
    const Switch = getControl('Switch') as ComponentCtor;

    return Switch ? (
      <Switch
        value={this.props.value}
        disabled={this.state.disabled}
        onChange={value => this.onChange(value)}
      />
    ) : null;
  }
}
