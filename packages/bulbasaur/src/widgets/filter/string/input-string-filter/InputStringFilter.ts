import type { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { getControl } from 'handie-vue';
import { StringFilterStructuralWidget } from 'handie-vue/dist/widgets';

import { getStringInputtableControlProps } from '../../../../utils';

@Component
export default class InputStringFilterWidget extends StringFilterStructuralWidget {
  public render(h: CreateElement): VNode {
    const props: Record<string, any> = getStringInputtableControlProps(this, true);

    if (this.config.className) {
      props.className = this.config.className;
    }

    return h(getControl('TextInput'), { props, on: { input: this.onChange } });
  }
}
