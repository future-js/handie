import { ReactNode } from 'react';

import { ComponentCtor, BaseWidgetConfig, BaseWidgetState, getControl } from '@handie/runtime-core';
import { AdminLayoutHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { BaseStructuralWidget } from '../../base';

import { NavLinkRenderer, NavMenuPosition } from './typing';
import defaultBehaviors from './behavior';

class AdminLayoutStructuralWidget<
  CT extends BaseWidgetConfig = BaseWidgetConfig
> extends BaseStructuralWidget<{}, BaseWidgetState, CT, AdminLayoutHeadlessWidget<CT>> {
  private getRoutes(): any[] {
    return ((this.props as any).routes || []) as any[];
  }

  private filterRoutes(routes: any[] = this.getRoutes()): any[] {
    return routes.filter(
      route =>
        !(
          ((route.meta && route.meta.hide) || (route.redirect && !route.name)) // FIXME: 适配 Umi 的 redirect 规则，路由配置统一后移出这个逻辑
        ),
    );
  }

  private getMenuPosition(): NavMenuPosition {
    return this.getBehavior('navMenuPosition');
  }

  private resolveMenuText(route: any): string {
    return (route.meta && route.meta.text) || route.name;
  }

  /**
   * Get menu status flags
   *
   * @returns active and open menu route names
   */
  protected getMenuFlags(): { active: string; open: string[] } {
    return this.$$_h.getMenuFlags();
  }

  private renderMenuItem(
    route,
    renderNavLink: NavLinkRenderer,
    mainOnly: boolean = false,
  ): ReactNode {
    const NavSubMenu = getControl('NavSubMenu') as ComponentCtor;
    const NavMenuItem = getControl('NavMenuItem') as ComponentCtor;

    if (!mainOnly && (route.routes || []).length > 0) {
      return NavSubMenu ? (
        <NavSubMenu
          key={`${route.name}-${route.routes.length}`}
          flag={`${route.name}`}
          title={this.resolveMenuText(route)}
        >
          {this.filterRoutes(route.routes).map(r => this.renderMenuItem(r, renderNavLink))}
        </NavSubMenu>
      ) : null;
    }

    return NavMenuItem ? (
      <NavMenuItem key={route.name} flag={route.name} title={route.name}>
        {renderNavLink(this.resolveMenuText(route), route.path)}
      </NavMenuItem>
    ) : null;
  }

  protected renderNavMenu(renderNavLink: NavLinkRenderer): ReactNode {
    const menuPosition = this.getMenuPosition();
    const { active, open } = this.getMenuFlags();

    const NavMenu = getControl('NavMenu') as ComponentCtor;

    const props: Record<string, any> = {
      className: this.getStyleClassName('AdminLayoutWidget-navMenu'),
    };

    if (menuPosition === 'aside') {
      props.direction = 'vertical';
      props.defaultActiveFlag = active;
      props.defaultOpenFlags = open;
    } else {
      props.direction = 'horizontal';
      props.defaultActiveFlag = open[0];
    }

    return NavMenu ? (
      <NavMenu {...props} key={active}>
        {this.filterRoutes().map(route =>
          this.renderMenuItem(route, renderNavLink, menuPosition === 'both'),
        )}
      </NavMenu>
    ) : null;
  }

  /**
   * Render sub nav menu, only available when `navMenuPosition` is `'both'`
   *
   * @param renderNavLink render function to render nav link
   * @returns sub nav menu
   */
  protected renderSubNav(renderNavLink: NavLinkRenderer): ReactNode {
    if (this.getMenuPosition() !== 'both') {
      return null;
    }

    const NavMenu = getControl('NavMenu') as ComponentCtor;

    const { active, open } = this.getMenuFlags();
    const { routes = [] } = this.getRoutes().find(route => route.name === open[0])!;

    return NavMenu ? (
      <NavMenu
        className={this.getStyleClassName('AdminLayoutWidget-subNav')}
        defaultActiveFlag={active}
        defaultOpenFlags={open}
        key={active}
      >
        {this.filterRoutes(routes).map(route => this.renderMenuItem(route, renderNavLink))}
      </NavMenu>
    ) : null;
  }

  public componentWillMount(): void {
    this.setHeadlessWidget(new AdminLayoutHeadlessWidget({}, this.$$view));
    this.setBehaviors('layout.admin', defaultBehaviors);
  }
}

export { AdminLayoutStructuralWidget };
