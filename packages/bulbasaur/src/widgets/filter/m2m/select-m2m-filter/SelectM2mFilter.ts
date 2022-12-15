import type { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { ListValue, isBoolean, getControl, createNode } from 'handie-vue';
import { RelationFieldStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class SelectEditM2mFilterWidget extends RelationFieldStructuralWidget<ListValue> {
  private options: any[] = [];

  public render(h: CreateElement): VNode {
    const children: VNode[] = this.options.map(opt =>
      createNode(h, 'Option', {
        props: { label: opt[this.labelKey], value: opt[this.valueKey] },
      }),
    );

    const showEmptyValueOption = this.getCommonBehavior('filter.showEmptyValueOption', false);
    const multiple = isBoolean((this.config as any).multiple)
      ? (this.config as any).multiple
      : true;

    if (showEmptyValueOption) {
      children.unshift(
        createNode(h, 'Option', {
          props: {
            label: this.getCommonBehavior('filter.emptyValueOptionLabel'),
            value: multiple ? [] : '',
          },
        }),
      );
    }

    return h(
      getControl('Select'),
      {
        props: {
          value: this.internalValue,
          placeholder: this.getPlaceholder(),
          multiple,
          clearable: !showEmptyValueOption,
        },
        on: {
          change: value => {
            if (value == null) {
              this.onChange((multiple ? [] : '') as any);
            } else {
              this.onChange(value);
            }
          },
        },
      },
      children,
    );
  }

  public created(): void {
    this.fetchRelatedList({}, data => (this.options = data));
  }
}
