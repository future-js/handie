import type { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { getControl } from 'handie-vue';
import { StringFieldStructuralWidget } from 'handie-vue/dist/widgets';

import { getStringInputtableControlProps } from '../../../../utils';

@Component
export default class PasswordEditStringFieldWidget extends StringFieldStructuralWidget {
  public render(h: CreateElement): VNode {
    return h(getControl('Password'), {
      props: getStringInputtableControlProps(this),
      on: { input: this.onChange },
    });
  }
}
