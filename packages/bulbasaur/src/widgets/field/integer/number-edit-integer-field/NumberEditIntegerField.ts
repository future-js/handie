import type { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { IntegerFieldWidgetState, isNumeric, getControl } from 'handie-vue';
import { IntegerFieldStructuralWidget } from 'handie-vue/dist/widgets';

import { getNumberInputProps } from '../../../../utils';
import type { NumberIntegerFieldWidgetConfig } from './typing';

@Component
export default class NumberEditIntegerFieldWidget extends IntegerFieldStructuralWidget<
  IntegerFieldWidgetState,
  NumberIntegerFieldWidgetConfig
> {
  public render(h: CreateElement): VNode {
    return h(getControl('NumberInput'), {
      props: getNumberInputProps(this),
      on: { change: value => this.onChange(isNumeric(value) ? parseFloat(value) : value) },
    });
  }
}
