import type { ReactNode } from 'react';

import { ComponentCtor, StringFieldWidgetState, getControl } from 'handie-react';
import { StringFieldStructuralWidget } from 'handie-react/dist/widgets/class';

import { getStringInputtableControlProps } from '../../../../utils';
import type { UrlStringFieldWidgetConfig } from '../typing';

export default class UrlEditStringFieldWidget extends StringFieldStructuralWidget<
  StringFieldWidgetState,
  UrlStringFieldWidgetConfig
> {
  public render(): ReactNode {
    const props: Record<string, any> = {
      ...getStringInputtableControlProps(this),
      scheme: this.config.scheme || 'http',
      noAuthority: this.config.noAuthority,
    };
    const UrlInput = getControl('UrlInput') as ComponentCtor;

    return UrlInput ? <UrlInput {...props} onChange={value => this.onChange(value)} /> : null;
  }
}
