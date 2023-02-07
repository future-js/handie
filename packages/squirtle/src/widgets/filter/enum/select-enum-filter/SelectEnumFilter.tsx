import type { ReactNode } from 'react';

import { ComponentCtor, isNumber, pick, getControl } from 'handie-react';
import { EnumFilterStructuralWidget } from 'handie-react/dist/widgets/class';

export default class SelectEditEnumFilterWidget extends EnumFilterStructuralWidget {
  private handleOptionChange(value: number | string): void {
    this.onChange(value == null ? '' : value);

    if (this.searchImmediately) {
      this.$$search.submit();
    }
  }

  public render(): ReactNode {
    const Select = getControl('Select') as ComponentCtor;
    const Option = getControl('Option') as ComponentCtor;

    const children: ReactNode[] = this.state.options.map(opt =>
      Option ? (
        <Option
          key={`Option${opt.value}OfSelectEditEnumFilterWidget`}
          {...pick(opt, ['label', 'value'])}
        />
      ) : null,
    );

    const showEmptyValueOption = this.getCommonBehavior('filter.showEmptyValueOption', false);

    if (showEmptyValueOption && Option) {
      children.unshift(
        <Option
          label={this.getCommonBehavior('filter.emptyValueOptionLabel')}
          value=''
          key='OptionAllOfSelectEditEnumFilterWidget'
        />,
      );
    }

    const props: Record<string, any> = {
      value: this.props.value,
      placeholder: this.getPlaceholder(),
      clearable: !showEmptyValueOption,
    };

    const { className, width } = this.config;

    if (className) {
      props.className = className;
    }

    if (width) {
      props.style = { width: isNumber(width) ? `${width}px` : width };
    }

    return Select ? (
      <Select {...props} onChange={this.handleOptionChange.bind(this)}>
        {children}
      </Select>
    ) : null;
  }
}
