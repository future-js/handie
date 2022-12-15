import type { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { ListViewContext, resolveSearchWidgetCtor } from '@handie/runtime-core';

import BaseRenderer from '../base';

@Component({
  // @ts-ignore
  abstract: true,
})
export default class SearchRenderer extends BaseRenderer {
  public render(h: CreateElement): VNode | null {
    return h(resolveSearchWidgetCtor(this.$$view as ListViewContext));
  }
}
