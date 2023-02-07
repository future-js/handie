import type { ReactNode } from 'react';

import {
  ComponentCtor,
  ObjectViewWidgetState,
  isBoolean,
  isFunction,
  capitalize,
  getControl,
  normalizeClassName,
} from 'handie-react';
import { FormViewStructuralWidget } from 'handie-react/dist/widgets/class';

import type { SuccessMessageGetter, FormViewWidgetConfig } from './typing';
import defaultBehaviors from './behavior';
import style from './style.scss';

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
                ? (successMessage as SuccessMessageGetter)(this.state.value)
                : (successMessage as string),
            );

    this.on('submit', () => {
      this.$$view.setBusy(true);

      if (newOne) {
        this.$$view
          .insert(this.state.value, callback, message => this.$$app.error(message))
          .finally(() => this.$$view.setBusy(false));
      } else {
        this.$$view
          .update(this.state.value, callback, message => this.$$app.error(message))
          .finally(() => this.$$view.setBusy(false));
      }
    });
  }

  public render(): ReactNode {
    const outside = this.isActionBarOutside();
    const readonly = this.config.readonly === true;
    const actionBar = this.renderActionBar({
      className: style['FormViewWidget-actionBar'],
      executors: {
        [this.getCommonBehavior('action.cancelAction')]: () =>
          this.$$history.push({
            name: this.config.listViewRouteName || `${this.$$module.getModuleName()}List`,
            params: this.$$route.params,
          }),
      },
      readonly,
    });
    const Wait = getControl('Wait') as ComponentCtor;

    return Wait ? (
      <Wait
        className={normalizeClassName(
          style.FormViewWidget,
          style[`FormViewWidget--actionBar${capitalize(this.resolveActionBarAlignment())}`],
          { [style['FormViewWidget--actionBarOutside']]: outside },
          this.config.className,
        )}
        nativeStyle={this.getStyle()}
        busy={this.state.loading}
      >
        {outside ? (
          <>
            <div className={style['FormViewWidget-formContainer']}>
              {this.renderForm({ className: style['FormViewWidget-form'], readonly })}
            </div>
            {actionBar}
          </>
        ) : (
          this.renderForm({
            className: style['FormViewWidget-form'],
            readonly,
            children: actionBar,
          })
        )}
      </Wait>
    ) : null;
  }

  public componentWillMount(): void {
    super.componentWillMount();
    this.setBehaviors('view.form', defaultBehaviors);
    this.initFormViewContextEvents();
  }

  public componentDidMount(): void {
    this.fetchData();
  }
}
