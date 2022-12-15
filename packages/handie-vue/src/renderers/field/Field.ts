import { CreateElement, VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import {
  DataValue,
  ViewFieldDescriptor,
  FieldRendererProps,
  resolveFieldWidgetCtor,
} from '@handie/runtime-core';

import BaseRenderer from '../base';

@Component({
  // @ts-ignore
  abstract: true,
})
export default class FieldRenderer extends BaseRenderer<FieldRendererProps> {
  @Prop({ type: Object, default: () => ({}) })
  public readonly field!: ViewFieldDescriptor;

  @Prop()
  public readonly value!: DataValue;

  @Prop({ type: Boolean, default: false })
  public readonly readonly!: boolean;

  public render(h: CreateElement): VNode | null {
    const widgetCtor = resolveFieldWidgetCtor(
      this.$$view.getModuleContext(),
      this.$props as FieldRendererProps,
    );

    return widgetCtor
      ? h(widgetCtor, {
          props: { field: this.field, value: this.value },
          on: { change: changed => this.$emit('change', this.field.name, changed) },
        })
      : null;
  }
}
