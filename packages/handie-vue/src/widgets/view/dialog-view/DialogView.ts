import type { VNode, VNodeChildren } from 'vue';
import { Component } from 'vue-property-decorator';

import {
  ObjectViewContextDescriptor,
  ListViewContext,
  ObjectViewContext,
  ObjectViewWidgetState,
  DialogViewWidgetConfig,
  isNumeric,
  getControl,
  resolveSafeDialogProps,
} from '@handie/runtime-core';

import { ObjectViewStructuralWidget } from '../object-view';

@Component
class DialogViewStructuralWidget<
  S extends ObjectViewWidgetState = ObjectViewWidgetState,
  CT extends DialogViewWidgetConfig = DialogViewWidgetConfig
> extends ObjectViewStructuralWidget<S, CT> {
  private dialogVisible: boolean = false;

  // TODO: 解决初始值被重置掉的临时方案，需要底层框架支持后移除
  private initialValueCache!: Record<string, any>;

  private get opener(): ListViewContext | ObjectViewContext {
    return this.$$view.getOpener()!;
  }

  protected get dialogTitle(): string {
    return this.config.title || '';
  }

  protected closeDialog(): void {
    this.dialogVisible = false;
    this.$$view.reset();
  }

  private fetchData(): void {
    const ctx = this.$$view;

    if (this.opener.getView().category === 'object' && ctx.getOne) {
      ctx.setBusy(true);

      ctx
        .getOne((this.opener as ObjectViewContext).getValue(), data => ctx.setDataSource(data))
        .finally(() => ctx.setBusy(false));
    } else if (this.initialValueCache) {
      ctx.setValue(this.initialValueCache);
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
      this.dialogVisible = true;
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
      children?: VNodeChildren;
    } = {},
  ): VNode {
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
    const h = this.$createElement;

    return h(
      getControl('Dialog'),
      {
        props: {
          className: [className, this.config.className],
          title: this.dialogTitle,
          width: isNumeric(width) ? `${width}px` : width,
          visible: this.dialogVisible,
          appendToBody: true,
          destroyOnClose: true,
          disableMask: true,
          ...resolveSafeDialogProps(this.config),
        },
        on: { close: this.closeDialog },
      },
      [
        h(getControl('Wait'), { props: { busy: this.loading } }, children),
        this.renderActionBar({
          className: actionBarClassName,
          slotName: 'footer',
          executors,
          actionText,
        }),
      ],
    );
  }

  public created(): void {
    this.initDialogViewCommonContextEvents();
    this.setInitialValueCache();
  }
}

export { DialogViewStructuralWidget };
