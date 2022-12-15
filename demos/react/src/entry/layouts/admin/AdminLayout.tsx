import { ReactNode } from 'react';
import { Link } from 'umi';

import {
  App as AppContainer,
  LayoutContainer,
  LayoutHeader,
  LayoutMain,
  LayoutAside,
} from '@/shared/components/control';
import { AdminLayoutStructuralWidget } from '@/shared/components/widget/base';

import style from './style.scss';

export default class AdminLayoutWidget extends AdminLayoutStructuralWidget {
  private renderNavLink(text: string, location: string): ReactNode {
    return <Link to={location}>{text}</Link>;
  }

  constructor(props) {
    super(props);
    this.setStyleClassNames(style);
  }

  public render(): ReactNode {
    return (
      <AppContainer className={style.AdminLayoutWidget}>
        <LayoutContainer>
          <LayoutAside className={style['AdminLayoutWidget-aside']} width={266}>
            <Link className={style['AdminLayoutWidget-brand']} to="/">
              Handie for React
            </Link>
            {this.renderSubNav(this.renderNavLink)}
          </LayoutAside>
          <LayoutContainer className={style['AdminLayoutWidget-content']}>
            <LayoutHeader className={style['AdminLayoutWidget-header']}>
              {this.renderNavMenu(this.renderNavLink)}
            </LayoutHeader>
            <LayoutMain className={style['AdminLayoutWidget-main']}>
              {this.props.children}
            </LayoutMain>
          </LayoutContainer>
        </LayoutContainer>
      </AppContainer>
    );
  }
}
