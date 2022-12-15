import type { ReactNode } from 'react';

import type { StringField } from '@handie/runtime-core/dist/types/input';
import {
  ComponentCtor,
  TextFieldWidgetState,
  isNumber,
  getControl,
} from 'handie-react';
import { TextFieldStructuralWidget } from 'handie-react/dist/widgets/class';

import { getStringInputtableControlProps } from '../../../../utils';
import type { TextareaTextFieldWidgetConfig } from './typing';
import defaultBehaviors from './behavior';

export default class TextareaEditTextFieldWidget extends TextFieldStructuralWidget<
  TextFieldWidgetState,
  TextareaTextFieldWidgetConfig
> {
  public render(): ReactNode {
    let showWordLimit = this.config.showWordLimit;

    if (showWordLimit === undefined) {
      showWordLimit = this.getBehavior('showWordLimit');
    }

    const props: Record<string, any> = {
      ...getStringInputtableControlProps(this),
      rows: this.config.rows || this.getBehavior('rows'),
      resize: 'none',
    };

    if (
      this.showValidationRulesAsNative &&
      isNumber((this.props.field as StringField).max)
    ) {
      props.showWordage = showWordLimit;
    }

    const TextArea = getControl('TextArea') as ComponentCtor;

    return TextArea ? (
      <TextArea {...props} onInput={(value) => this.onChange(value)} />
    ) : null;
  }

  public componentWillMount(): void {
    super.componentWillMount();
    this.setBehaviors('field.textarea', defaultBehaviors);
  }
}
