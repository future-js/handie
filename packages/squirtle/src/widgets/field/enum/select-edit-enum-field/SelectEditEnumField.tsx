import type { ReactNode } from 'react';

import { ComponentCtor, pick, getControl } from 'handie-react';
import { EnumFieldStructuralWidget } from 'handie-react/dist/widgets/class';

export default class SelectEditEnumFieldWidget extends EnumFieldStructuralWidget {
  public render(): ReactNode {
    const Select = getControl('Select') as ComponentCtor;
    const Option = getControl('Option') as ComponentCtor;

    return Select ? (
      <Select
        value={this.props.value}
        placeholder={this.getPlaceholder()}
        clearable={!this.props.field.required}
        disabled={this.state.disabled}
        onChange={value => this.onChange(value)}
      >
        {this.state.options.map(opt =>
          Option ? (
            <Option
              key={`Option${opt.value}OfSelectEditEnumFieldWidget`}
              {...pick(opt, ['label', 'value', 'disabled'])}
            />
          ) : null,
        )}
      </Select>
    ) : null;
  }
}
