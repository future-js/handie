import type { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { StringFieldWidgetState, getControl } from 'handie-vue';
import { StringFieldStructuralWidget } from 'handie-vue/dist/widgets';

import { getStringInputtableControlProps } from '../../../../utils';
import type { InputStringFieldWidgetConfig } from '../typing';

@Component
export default class InputEditStringFieldWidget extends StringFieldStructuralWidget<
  StringFieldWidgetState,
  InputStringFieldWidgetConfig
> {
  public render(h: CreateElement): VNode {
    return h(getControl('TextInput'), {
      props: {
        ...getStringInputtableControlProps(this),
        prefix: this.config.prefix,
        suffix: this.config.suffix,
      },
      on: { input: this.onChange },
    });
  }
}
