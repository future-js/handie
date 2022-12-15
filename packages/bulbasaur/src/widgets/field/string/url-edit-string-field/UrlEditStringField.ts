import type { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { StringFieldWidgetState, getControl } from 'handie-vue';
import { StringFieldStructuralWidget } from 'handie-vue/dist/widgets';

import { getStringInputtableControlProps } from '../../../../utils';
import type { UrlStringFieldWidgetConfig } from '../typing';

@Component
export default class UrlEditStringFieldWidget extends StringFieldStructuralWidget<
  StringFieldWidgetState,
  UrlStringFieldWidgetConfig
> {
  public render(h: CreateElement): VNode {
    return h(getControl('UrlInput'), {
      props: {
        ...getStringInputtableControlProps(this),
        scheme: this.config.scheme || 'http',
        noAuthority: this.config.noAuthority,
      },
      on: { change: this.onChange },
    });
  }
}
