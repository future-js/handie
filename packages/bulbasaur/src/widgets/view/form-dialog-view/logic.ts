import type { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import {
  ListViewContext,
  ObjectViewContext,
  DialogViewWidgetState,
  getRenderer,
  resolveSafePropsFromConfig,
} from 'handie-vue';
import { DialogViewStructuralWidget } from 'handie-vue/dist/widgets';

import type { FormDialogViewWidgetConfig } from './typing';
import { isOpenerInlineObjectView } from './helper';

@Component
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
          this.value,
        );
      }

      this.closeDialog();
    };

    this.on('submit', () => {
      this.$$view.setBusy(true);

      if (isOpenerInlineObjectView(opener)) {
        this.$$view
          .update(this.value, callback, message => this.$$app.error(message))
          .finally(() => this.$$view.setBusy(false));
      } else {
        this.$$view
          .insert(this.value, callback, message => this.$$app.error(message))
          .finally(() => this.$$view.setBusy(false));
      }
    });
  }

  public render(h: CreateElement): VNode {
    return this.renderDialog({
      className: this.getStyleClassName('FormDialogViewWidget'),
      actionBarClassName: this.getStyleClassName('FormDialogViewWidget-actionBar'),
      actionText: { submitActionText: '确定' },
      children: [
        h(
          getRenderer('FormRenderer'),
          {
            props: {
              fields: this.fields,
              value: this.value,
              validation: this.validation,
              config: {
                formControlLabelWidth: 90,
                formControlSize: 'small',
                ...resolveSafePropsFromConfig(this.config, ['moduleLabel']),
              },
            },
            on: { change: this.onFieldValueChange },
          },
          this.$slots.default,
        ),
      ],
    });
  }

  public created(): void {
    this.setStyleClassNames(this.$style);
    this.initFormDialogViewContextEvents();
  }
}
