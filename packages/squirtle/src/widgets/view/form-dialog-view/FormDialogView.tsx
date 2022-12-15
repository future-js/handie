import type { ReactNode } from 'react';

import {
  ComponentCtor,
  ListViewContext,
  ObjectViewContext,
  getControl,
} from 'handie-react';
import { FormViewStructuralWidget } from 'handie-react/dist/widgets/class';

import type {
  FormDialogViewWidgetConfig,
  FormDialogViewWidgetState,
} from './typing';
import { isOpenerInlineObjectView } from './helper';

export default class FormDialogViewWidget extends FormViewStructuralWidget<
  FormDialogViewWidgetState,
  FormDialogViewWidgetConfig
> {
  public readonly state = {
    loading: false,
    dataSource: {},
    value: {},
    validation: {},
    dialogVisible: false,
  } as FormDialogViewWidgetState;

  private closeDialog(): void {
    this.setState({ dialogVisible: false }, () => this.$$view.reset());
  }

  private resolveDialogTitle(): string {
    const { title, moduleLabel } = this.config;

    if (title) {
      return title;
    }

    return moduleLabel
      ? `${
          isOpenerInlineObjectView(this.$$view.getOpener()!) ? '修改' : '新增'
        }${moduleLabel}`
      : '';
  }

  protected fetchData(): void {
    const ctx = this.$$view;
    const opener = ctx.getOpener()!;

    if (!isOpenerInlineObjectView(opener) || !ctx.getOne) {
      return;
    }

    ctx.setBusy(true);

    ctx
      .getOne((opener as ObjectViewContext).getValue(), (data) =>
        ctx.setDataSource(data),
      )
      .finally(() => ctx.setBusy(false));
  }

  public componentDidMount(): void {
    const opener = this.$$view.getOpener()!;

    opener.on(`dialog-view-show.${opener.getId()}`, () =>
      this.setState({ dialogVisible: true }, () => this.fetchData()),
    );

    const callback = () => {
      if (opener.getView().category === 'list') {
        (opener as ListViewContext).reload();
      } else if ((opener as ObjectViewContext).getParent()) {
        (opener as ObjectViewContext).getParent()!.reload();
      } else {
        opener.emit(`dialog-view-submit.${opener.getId()}`, this.state.value);
      }

      this.closeDialog();
    };

    this.on('submit', () => {
      if (isOpenerInlineObjectView(opener)) {
        this.$$view.update(this.state.value, callback, (message) =>
          this.$$app.error(message),
        );
      } else {
        this.$$view.insert(this.state.value, callback, (message) =>
          this.$$app.error(message),
        );
      }
    });
  }

  public componentWillUnmount(): void {
    const opener = this.$$view.getOpener()!;

    opener.off(`dialog-view-show.${opener.getId()}`);
  }

  public render(): ReactNode {
    const Dialog = getControl('Dialog') as ComponentCtor;
    const Button = getControl('Button') as ComponentCtor;
    const Wait = getControl('Wait') as ComponentCtor;

    const closeDialog = this.closeDialog.bind(this);

    return Dialog ? (
      <Dialog
        title={this.resolveDialogTitle()}
        width={this.config.dialogWidth || 520}
        footer={
          Button ? (
            <>
              <Button onClick={closeDialog}>取消</Button>
              <Button color="primary" onClick={() => this.$$view.submit()}>
                确认
              </Button>
            </>
          ) : null
        }
        visible={this.state.dialogVisible}
        centered
        disableMask
        onClose={closeDialog}
      >
        {Wait ? (
          <Wait busy={this.state.loading}>{this.renderForm()}</Wait>
        ) : null}
      </Dialog>
    ) : null;
  }
}
