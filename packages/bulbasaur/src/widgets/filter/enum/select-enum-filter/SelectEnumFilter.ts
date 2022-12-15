import type { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { isNumber, pick, getControl, createNode } from 'handie-vue';
import { EnumFilterStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class SelectEditEnumFilterWidget extends EnumFilterStructuralWidget {
  private handleOptionChange(value: number | string): void {
    this.onChange(value == null ? '' : value);

    if (this.searchImmediately) {
      this.$$search.submit();
    }
  }

  public render(h: CreateElement): VNode {
    const children: VNode[] = this.options.map(opt =>
      createNode(h, 'Option', {
        props: pick(opt, ['label', 'value']),
        key: `Option${opt.value}OfSelectEditEnumFilterWidget`,
      }),
    );

    const showEmptyValueOption = this.getCommonBehavior('filter.showEmptyValueOption', false);

    if (showEmptyValueOption) {
      children.unshift(
        createNode(h, 'Option', {
          props: { label: this.getCommonBehavior('filter.emptyValueOptionLabel'), value: '' },
          key: 'OptionAllOfSelectEditEnumFilterWidget',
        }),
      );
    }

    const props: Record<string, any> = {
      value: this.value,
      placeholder: this.getPlaceholder(),
      clearable: !showEmptyValueOption,
    };

    const { className, width } = this.config;

    if (className) {
      props.className = className;
    }

    if (width) {
      props.style = { width: isNumber(width) ? `${width}px` : width };
    }

    return h(getControl('Select'), { props, on: { change: this.handleOptionChange } }, children);
  }
}
