import { BaseWidgetConfig } from '../../types/widget/base';
import { BaseHeadlessWidget } from '../base';

class AdminLayoutHeadlessWidget<
  CT extends BaseWidgetConfig = BaseWidgetConfig
> extends BaseHeadlessWidget<Record<string, any>, CT> {
  public getConfig(): CT {
    return {} as CT;
  }

  /**
   * Get menu status flags
   *
   * @returns active and open menu route names
   */
  public getMenuFlags(): { active: string; open: string[] } {
    const { name, ancestors } = this.getAppHelper().history.getLocation();

    return { active: name, open: ancestors.length > 0 ? ancestors.map(a => a.name) : [name] };
  }
}

export { AdminLayoutHeadlessWidget };
