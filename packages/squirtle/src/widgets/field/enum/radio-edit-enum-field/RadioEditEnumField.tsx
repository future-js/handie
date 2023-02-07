import type { ReactNode } from 'react';

import { ComponentCtor, EnumFieldWidgetState, getControl } from 'handie-react';
import { EnumFieldStructuralWidget } from 'handie-react/dist/widgets/class';

import type { RadioEnumFieldWidgetConfig } from './typing';

export default class RadioEditEnumFieldWidget extends EnumFieldStructuralWidget<
  EnumFieldWidgetState,
  RadioEnumFieldWidgetConfig
> {
  public render(): ReactNode {
    const RadioGroup = getControl('RadioGroup') as ComponentCtor;
    const Radio = getControl('Radio') as ComponentCtor;
    const Tooltip = getControl('Tooltip') as ComponentCtor;
    const Icon = getControl('Icon') as ComponentCtor;

    return RadioGroup ? (
      <RadioGroup
        value={this.props.value}
        disabled={this.state.disabled}
        onChange={value => this.onChange(value)}
      >
        {this.state.options.map(opt =>
          Radio ? (
            <Radio
              key={`Option${opt.value}OfRadioEditEnumFieldWidget`}
              value={opt.value}
              disabled={opt.disabled}
            >
              {opt.hint ? (
                <>
                  {opt.label}
                  {Tooltip ? (
                    <Tooltip content={opt.hint}>
                      {Icon ? (
                        <Icon
                          refs={this.config.hintIcon || this.getCommonBehavior('field.hintIcon')}
                        />
                      ) : null}
                    </Tooltip>
                  ) : null}
                </>
              ) : (
                opt.label
              )}
            </Radio>
          ) : null,
        )}
      </RadioGroup>
    ) : null;
  }
}
