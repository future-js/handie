import type { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { FloatFieldWidgetState, isNumeric, getControl } from 'handie-vue';
import { FloatFieldStructuralWidget } from 'handie-vue/dist/widgets';

import { getNumberInputProps } from '../../../../utils';
import type { NumberFloatFieldWidgetConfig } from './typing';

@Component
export default class NumberEditFloatFieldWidget extends FloatFieldStructuralWidget<
  FloatFieldWidgetState,
  NumberFloatFieldWidgetConfig
> {
  public render(h: CreateElement): VNode {
    return h(getControl('NumberInput'), {
      props: getNumberInputProps(this),
      on: { change: value => this.onChange(isNumeric(value) ? parseFloat(value) : value) },
    });
  }
}
