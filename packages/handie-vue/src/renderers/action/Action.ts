import type { CreateElement, VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { ActionRendererProps, ClientAction, resolveActionWidgetCtor } from '@handie/runtime-core';

import BaseRenderer from '../base';

@Component({
  // @ts-ignore
  abstract: true,
})
export default class ActionRenderer extends BaseRenderer<ActionRendererProps> {
  @Prop({ type: Object, default: null })
  public readonly action!: ClientAction;

  public render(h: CreateElement): VNode | null {
    return this.action
      ? h(
          resolveActionWidgetCtor(
            this.$$view.getModuleContext(),
            this.$props as ActionRendererProps,
          ),
          { props: { action: this.action } },
        )
      : null;
  }
}
