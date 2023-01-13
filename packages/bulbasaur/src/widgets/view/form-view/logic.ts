import type { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { ObjectViewWidgetState, isBoolean, isFunction, capitalize, getControl } from 'handie-vue';
import { FormViewStructuralWidget } from 'handie-vue/dist/widgets';

import type { SuccessMessageGetter, FormViewWidgetConfig } from './typing';
import defaultBehaviors from './behavior';

@Component
export default class FormViewWidget extends FormViewStructuralWidget<
  ObjectViewWidgetState,
  FormViewWidgetConfig
> {
  private isActionBarOutside(): boolean {
    if (isBoolean(this.config.actionBarOutside)) {
      return this.config.actionBarOutside!;
    }

    return isBoolean(this.getBehavior('actionBarOutside'))
      ? this.getBehavior('actionBarOutside')
      : this.getCommonBehavior('view.objectViewActionBarOutside', false);
  }

  private resolveActionBarAlignment(): 'left' | 'center' | 'right' {
    if (this.config.actionBarAlignment) {
      return this.config.actionBarAlignment;
    }

    return (
      this.getBehavior('actionBarAlignment') ||
      this.getCommonBehavior('view.objectViewActionBarAlignment', 'left')
    );
  }

  private initFormViewContextEvents(): void {
    if (this.config.readonly === true) {
      return;
    }

    const newOne = this.isNewOne();
    const {
      gotoListView,
      listViewRouteName = `${this.$$module.getModuleName()}List`,
      successMessage = `${newOne ? '添加' : '修改'}成功`,
    } = this.config;

    const callback =
      gotoListView !== false
        ? () => this.$$history.push({ name: listViewRouteName, params: this.$$route.params })
        : () =>
            this.$$app.success(
              isFunction(successMessage)
                ? (successMessage as SuccessMessageGetter)(this.value)
                : (successMessage as string),
            );

    this.on('submit', () => {
      this.$$view.setBusy(true);

      if (newOne) {
        this.$$view
          .insert(this.value, callback, message => this.$$app.error(message))
          .finally(() => this.$$view.setBusy(false));
      } else {
        this.$$view
          .update(this.value, callback, message => this.$$app.error(message))
          .finally(() => this.$$view.setBusy(false));
      }
    });
  }

  public render(h: CreateElement): VNode {
    const outside = this.isActionBarOutside();
    const readonly = this.config.readonly === true;
    const actionBar = this.renderActionBar({
      className: this.$style['FormViewWidget-actionBar'],
      executors: {
        [this.getCommonBehavior('action.cancelAction')]: () =>
          this.$$history.push({
            name: this.config.listViewRouteName || `${this.$$module.getModuleName()}List`,
            params: this.$$route.params,
          }),
      },
      readonly,
    });

    return h(
      getControl('Wait'),
      {
        props: {
          className: [
            this.$style.FormViewWidget,
            this.$style[`FormViewWidget--actionBar${capitalize(this.resolveActionBarAlignment())}`],
            { [this.$style['FormViewWidget--actionBarOutside']]: outside },
            this.config.className,
          ],
          nativeStyle: this.getStyle(),
          busy: this.loading,
        },
      },
      outside
        ? [
            h('div', { class: this.$style['FormViewWidget-formContainer'] }, [
              this.renderForm({ className: this.$style['FormViewWidget-form'], readonly }),
            ]),
            actionBar,
          ]
        : [
            this.renderForm({
              className: this.$style['FormViewWidget-form'],
              readonly,
              children: [actionBar],
            }),
          ],
    );
  }

  public created(): void {
    this.setBehaviors('view.form', defaultBehaviors);
    this.initFormViewContextEvents();
    this.fetchData();
  }
}
