import type { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { isNumber, pick, getControl, createNode } from 'handie-vue';
import { MultiEnumFilterStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class SelectEditMultiEnumFilterWidget extends MultiEnumFilterStructuralWidget {
  private handleOptionChange(value: number[] | string[]): void {
    this.onChange(value);

    if (this.searchImmediately) {
      this.$$search.submit();
    }
  }

  public render(h: CreateElement): VNode {
    const props: Record<string, any> = {
      value: this.value,
      placeholder: this.getPlaceholder(),
      multiple: true,
    };

    const { className, width } = this.config;

    if (className) {
      props.className = className;
    }

    if (width) {
      props.style = { width: isNumber(width) ? `${width}px` : width };
    }

    return h(
      getControl('Select'),
      { props, on: { change: this.handleOptionChange } },
      this.options.map(opt =>
        createNode(h, 'Option', {
          props: pick(opt, ['label', 'value']),
          key: `Option${opt.value}OfSelectEditMultiEnumFilterWidget`,
        }),
      ),
    );
  }
}
