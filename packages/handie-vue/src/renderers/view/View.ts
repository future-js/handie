import type { CreateElement, VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { ViewRendererProps, resolveViewWidgetCtor } from '@handie/runtime-core';

import { isComponentCtor } from '../../utils';
import { createModuleContext } from '../../adapters/context';

import BaseRenderer from '../base';

@Component({
  // @ts-ignore
  abstract: true,
})
export default class ViewRenderer extends BaseRenderer<ViewRendererProps> {
  @Prop({ type: String, default: '' })
  public readonly view!: string;

  @Prop({ type: Array, default: () => [] })
  public readonly params!: any[];

  public render(h: CreateElement): VNode | null {
    const widgetCtor = resolveViewWidgetCtor(
      this.$props as ViewRendererProps,
      isComponentCtor,
      createModuleContext,
    );

    return widgetCtor ? h(widgetCtor) : null;
  }
}
