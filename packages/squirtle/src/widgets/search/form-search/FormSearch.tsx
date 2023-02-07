import type { ReactNode } from 'react';

import { ComponentCtor, getControl } from 'handie-react';
import { FormSearchStructuralWidget } from 'handie-react/dist/widgets/class';

export default class FormSearchWidget extends FormSearchStructuralWidget {
  public render(): ReactNode {
    const formChildren = this.renderFilters();
    const standalone = this.isStandalone();
    const buttonGroup = this.renderButtonGroup();

    if (!standalone) {
      formChildren.push(buttonGroup);
    }

    const Form = getControl('Form') as ComponentCtor;

    const form = Form ? (
      <Form key='FormOfFormSearchWidget' {...this.resolveProps()}>
        {formChildren}
      </Form>
    ) : null;

    return (
      <div className={this.getStyleClassName('FormSearch')}>
        {standalone ? [form, buttonGroup] : [form]}
      </div>
    );
  }
}
