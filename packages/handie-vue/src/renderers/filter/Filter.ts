import { CreateElement, VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { FilterRendererProps, resolveFilterWidgetCtor } from '@handie/runtime-core';
import type { FilterDescriptor } from '@handie/runtime-core/dist/types/input';

import BaseRenderer from '../base';

@Component({
  // @ts-ignore
  abstract: true,
})
export default class FilterRenderer extends BaseRenderer<FilterRendererProps> {
  @Prop({ type: Object, default: () => ({}) })
  public readonly filter!: FilterDescriptor;

  @Prop()
  public readonly value!: any;

  public render(h: CreateElement): VNode | null {
    const widgetCtor = resolveFilterWidgetCtor(
      this.$$view.getModuleContext(),
      this.$props as FilterRendererProps,
    );

    return widgetCtor
      ? h(widgetCtor, {
          props: { filter: this.filter, value: this.value },
          on: { change: changed => this.$emit('change', this.filter.name, changed) },
        })
      : null;
  }
}
