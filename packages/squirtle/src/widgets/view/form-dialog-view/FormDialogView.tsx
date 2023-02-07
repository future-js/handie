import type { ReactNode } from 'react';

import {
  ComponentCtor,
  ListViewContext,
  ObjectViewContext,
  DialogViewWidgetState,
  getRenderer,
  resolveSafePropsFromConfig,
} from 'handie-react';
import { DialogViewStructuralWidget } from 'handie-react/dist/widgets/class';

import type { FormDialogViewWidgetConfig } from './typing';
import { isOpenerInlineObjectView } from './helper';
import style from './style.scss';

export default class FormDialogViewWidget extends DialogViewStructuralWidget<
  DialogViewWidgetState,
  FormDialogViewWidgetConfig
> {
  protected get dialogTitle(): string {
    const { title, moduleLabel } = this.config;

    if (title) {
      return title;
    }

    return moduleLabel
      ? `${isOpenerInlineObjectView(this.$$view.getOpener()!) ? '修改' : '新增'}${moduleLabel}`
      : '';
  }

  private initFormDialogViewContextEvents(): void {
    const opener = this.$$view.getOpener()!;

    const callback = () => {
      if (opener.getView().category === 'list') {
        (opener as ListViewContext).reload();
      } else if (isOpenerInlineObjectView(opener)) {
        (opener as ObjectViewContext).getParent()!.reload();
      } else {
        opener.emit(
          `dialog-view-submit.${`${opener.getId()}:${[
            this.$$module.getModuleName(),
            this.$$view.getView().name,
          ].join('-')}`}`,
          this.state.value,
        );
      }

      this.closeDialog();
    };

    this.on('submit', () => {
      this.$$view.setBusy(true);

      if (isOpenerInlineObjectView(opener)) {
        this.$$view
          .update(this.state.value, callback, message => this.$$app.error(message))
          .finally(() => this.$$view.setBusy(false));
      } else {
        this.$$view
          .insert(this.state.value, callback, message => this.$$app.error(message))
          .finally(() => this.$$view.setBusy(false));
      }
    });
  }

  public render(): ReactNode {
    const FormRenderer = getRenderer('FormRenderer') as ComponentCtor;

    const props = {
      fields: this.fields,
      value: this.state.value,
      validation: this.state.validation,
      config: {
        formControlLabelWidth: 90,
        formControlSize: 'small',
        ...resolveSafePropsFromConfig(this.config, ['moduleLabel']),
      },
      onChange: this.onFieldValueChange,
    };

    return this.renderDialog({
      className: this.getStyleClassName('FormDialogViewWidget'),
      actionBarClassName: this.getStyleClassName('FormDialogViewWidget-actionBar'),
      actionText: { submitActionText: '确定' },
      children: FormRenderer ? <FormRenderer {...props}>{this.props.children}</FormRenderer> : null,
    });
  }

  public componentWillMount(): void {
    super.componentWillMount();
    this.setStyleClassNames(style);
    this.initFormDialogViewContextEvents();
  }
}
