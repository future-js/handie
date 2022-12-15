import type { ReactNode } from 'react';

import {
  ComponentCtor,
  ObjectViewWidgetState,
  isBoolean,
  capitalize,
  getControl,
  normalizeClassName,
} from 'handie-react';
import { FormViewStructuralWidget } from 'handie-react/dist/widgets/class';

import type { FormViewWidgetConfig } from './typing';
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

  public render(): ReactNode {
    const outside = this.isActionBarOutside();
    const actionBar = this.renderActionBar(style['FormViewWidget-actionBar']);
    const Wait = getControl('Wait') as ComponentCtor;

    return Wait ? (
      <Wait
        className={normalizeClassName(
          style.FormViewWidget,
          style[
            `FormViewWidget--actionBar${capitalize(
              this.resolveActionBarAlignment(),
            )}`
          ],
          { [style['FormViewWidget--actionBarOutside']]: outside },
          this.config.className,
        )}
        busy={this.state.loading}
      >
        {outside ? (
          <>
            <div className={style['FormViewWidget-formContainer']}>
              {this.renderForm({ className: style['FormViewWidget-form'] })}
            </div>
            {actionBar}
          </>
        ) : (
          this.renderForm({
            className: style['FormViewWidget-form'],
            children: actionBar,
          })
        )}
      </Wait>
    ) : null;
  }

  public componentWillMount(): void {
    super.componentWillMount();
    this.setBehaviors('view.form', defaultBehaviors);
  }

  public componentDidMount(): void {
    this.fetchData();
  }
}
