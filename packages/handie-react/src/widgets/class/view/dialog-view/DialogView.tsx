import type { ReactNode } from 'react';

import {
  ObjectViewContextDescriptor,
  ClientAction,
  ListViewContext,
  ObjectViewContext,
  DialogViewWidgetState,
  DialogViewWidgetConfig,
  isNumeric,
  getControl,
  resolveSafeDialogProps,
} from '@handie/runtime-core';

import { ObjectViewStructuralWidget } from '../object-view';

class DialogViewStructuralWidget<
  S extends DialogViewWidgetState = DialogViewWidgetState,
  CT extends DialogViewWidgetConfig = DialogViewWidgetConfig
> extends ObjectViewStructuralWidget<S, CT> {
  public readonly state = {
    loading: false,
    topActions: [] as ClientAction[],
    itemActions: [] as ClientAction[],
    dataSource: {},
    value: {},
    validation: {},
    dialogVisible: false,
  } as S;

  // TODO: 解决初始值被重置掉的临时方案，需要底层框架支持后移除
  private initialValueCache!: Record<string, any>;

  private get opener(): ListViewContext | ObjectViewContext {
    return this.$$view.getOpener()!;
  }

  protected get dialogTitle(): string {
    return this.config.title || '';
  }

  protected closeDialog(): void {
    this.setState({ dialogVisible: false });
    this.$$view.reset();
  }

  private fetchData(): void {
    // @ts-ignore
    if (this.opener.getView().category === 'object' && this.$$view.getOne) {
      this.$$_h.fetchData(this.opener);
    } else if (this.initialValueCache) {
      this.$$view.setValue(this.initialValueCache);
    }
  }

  private initDialogViewCommonContextEvents(): void {
    const namespace = `${this.opener.getId()}:${[
      this.$$module.getModuleName(),
      this.$$view.getView().name,
    ].join('-')}`;

    const showEventName = `dialog-view-show.${namespace}`;

    this.opener.off(showEventName);
    this.opener.on(showEventName, () => {
      this.setState({ dialogVisible: true });
      this.fetchData();
    });

    const hideEventName = `dialog-view-hide.${namespace}`;

    this.opener.off(hideEventName);
    this.opener.on(hideEventName, () => this.closeDialog());
  }

  private setInitialValueCache(): void {
    const { initialValue } = this.$$view.getView() as ObjectViewContextDescriptor;

    if (initialValue) {
      this.initialValueCache = { ...initialValue };
    }
  }

  protected renderDialog(
    options: {
      className?: string;
      actionBarClassName?: string;
      executors?: Record<string, (...args: any[]) => any>;
      actionText?: Record<string, string>;
      children?: ReactNode;
    } = {},
  ): ReactNode {
    const {
      className,
      actionBarClassName,
      executors = {
        [this.getCommonBehavior('action.cancelAction')]: this.closeDialog.bind(this),
      },
      actionText,
      children,
    } = options;
    const { width = 520 } = this.config;

    const Dialog = getControl('Dialog');
    const Wait = getControl('Wait');

    const props = {
      className: [className, this.config.className],
      title: this.dialogTitle,
      width: isNumeric(width) ? `${width}px` : width,
      visible: this.state.dialogVisible,
      appendToBody: true,
      destroyOnClose: true,
      disableMask: true,
      ...resolveSafeDialogProps(this.config),
      onClose: this.closeDialog.bind(this),
    };

    return Dialog ? (
      <Dialog
        {...props}
        footer={this.renderActionBar({
          className: actionBarClassName,
          // slotName: 'footer',
          executors,
          actionText,
        })}
      >
        {Wait ? <Wait busy={this.state.loading}>{children}</Wait> : null}
      </Dialog>
    ) : null;
  }

  public componentWillMount(): void {
    super.componentWillMount();
    this.initDialogViewCommonContextEvents();
    this.setInitialValueCache();
  }
}

export { DialogViewStructuralWidget };
