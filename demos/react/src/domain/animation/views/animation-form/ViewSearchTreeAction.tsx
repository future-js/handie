import { ReactNode } from 'react';

import { ActionWidgetState } from '@/shared/types';
import { ButtonActionStructuralWidget } from '@/shared/components/widget/base';

interface ViewSearchTreeActionWidgetState extends ActionWidgetState {
  popoverVisible: boolean;
}

export default class ViewSearchTreeActionWidget extends ButtonActionStructuralWidget<ViewSearchTreeActionWidgetState> {
  public render(): ReactNode {
    const { Popover } = this.$$module.getComponents();

    return (
      <Popover
        className={this.resolveClassNames('ViewSearchTreeActionWidget')}
        content="abc"
        trigger="click"
        visible={this.state.popoverVisible}
        onVisibleChange={(visible) =>
          this.setState({ popoverVisible: visible })
        }
      >
        {this.renderButton()}
      </Popover>
    );
  }
}
