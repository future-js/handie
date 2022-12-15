import type { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { EnumFieldWidgetState, getControl } from 'handie-vue';
import { EnumFieldStructuralWidget } from 'handie-vue/dist/widgets';

import type { RadioEnumFieldWidgetConfig } from './typing';

@Component
export default class RadioEditEnumFieldWidget extends EnumFieldStructuralWidget<
  EnumFieldWidgetState,
  RadioEnumFieldWidgetConfig
> {
  public render(h: CreateElement): VNode {
    return h(
      getControl('RadioGroup'),
      { props: { value: this.value, disabled: this.disabled }, on: { change: this.onChange } },
      this.options.map(opt =>
        h(
          getControl('Radio'),
          {
            props: { value: opt.value, disabled: opt.disabled },
            key: `Option${opt.value}OfRadioEditEnumFieldWidget`,
          },
          opt.hint
            ? [
                opt.label,
                h(getControl('Tooltip'), { props: { content: opt.hint } }, [
                  h(getControl('Icon'), {
                    props: {
                      refs: this.config.hintIcon || this.getCommonBehavior('field.hintIcon'),
                    },
                  }),
                ]),
              ]
            : opt.label,
        ),
      ),
    );
  }
}
