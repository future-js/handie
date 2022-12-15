import type { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { ObjectValue, getControl, createNode } from 'handie-vue';
import { RelationFieldStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class SelectEditM2oFieldWidget extends RelationFieldStructuralWidget<ObjectValue> {
  private options: any[] = [];

  public render(h: CreateElement): VNode {
    return h(
      getControl('Select'),
      {
        props: { value: this.internalValue, placeholder: this.getPlaceholder() },
        on: { change: this.onChange },
      },
      this.options.map(opt =>
        createNode(h, 'Option', {
          props: { label: opt[this.labelKey], value: opt[this.valueKey] },
        }),
      ),
    );
  }

  public created(): void {
    this.fetchRelatedList({}, data => (this.options = data));
  }
}
