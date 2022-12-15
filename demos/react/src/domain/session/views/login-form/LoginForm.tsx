import { ReactNode } from 'react';

import { FormRenderer } from '@/shared/components/renderer';
import { ObjectViewStructuralWidget } from '@/shared/components/widget/base';

import style from './style.scss';

export default class LoginFormViewWidget extends ObjectViewStructuralWidget {
  public componentDidMount(): void {
    this.on('submit', () =>
      this.$$module.execute(
        'login',
        this.$$view.getValue(),
        () => this.$$app.history.push({ name: 'otaku' }),
        (message) => this.$$app.alert(message),
      ),
    );
  }

  public render(): ReactNode {
    const { XButton } = this.$$module.getComponents();

    return (
      <div className={style.LoginFormViewWidget}>
        <div className={style['LoginFormViewWidget-header']}>
          <h1>Handie</h1>
        </div>
        <div className={style['LoginFormViewWidget-body']}>
          <FormRenderer
            fields={this.fields}
            value={this.state.value}
            validation={this.state.validation}
            config={this.config}
            onChange={this.onFieldValueChange.bind(this)}
          />
          <div className={style['LoginFormViewWidget-buttonWrapper']}>
            <XButton
              className={style['LoginFormViewWidget-button']}
              color="primary"
              onClick={() => this.$$view.submit()}
            >
              登录
            </XButton>
          </div>
        </div>
      </div>
    );
  }
}
