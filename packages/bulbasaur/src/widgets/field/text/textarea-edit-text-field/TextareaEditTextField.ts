import type { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import type { StringField } from '@handie/runtime-core/dist/types/input';
import { TextFieldWidgetState, isNumber, getControl } from 'handie-vue';
import { TextFieldStructuralWidget } from 'handie-vue/dist/widgets';

import { getStringInputtableControlProps } from '../../../../utils';
import type { TextareaTextFieldWidgetConfig } from './typing';
import defaultBehaviors from './behavior';

@Component
export default class TextareaEditTextFieldWidget extends TextFieldStructuralWidget<
  TextFieldWidgetState,
  TextareaTextFieldWidgetConfig
> {
  public render(h: CreateElement): VNode {
    let showWordLimit = this.config.showWordLimit;

    if (showWordLimit === undefined) {
      showWordLimit = this.getBehavior('showWordLimit');
    }

    const props: Record<string, any> = {
      ...getStringInputtableControlProps(this),
      rows: this.config.rows || this.getBehavior('rows'),
      resize: 'none',
    };

    if (this.showValidationRulesAsNative && isNumber((this.field as StringField).max)) {
      props.showWordage = showWordLimit;
    }

    return h(getControl('TextArea'), { props, on: { input: this.onChange } });
  }

  public created(): void {
    this.setBehaviors('field.textarea', defaultBehaviors);
  }
}
