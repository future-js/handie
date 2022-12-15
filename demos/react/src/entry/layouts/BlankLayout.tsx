import { ReactNode, Component } from 'react';

export default class BlankLayout extends Component {
  public render(): ReactNode {
    return this.props.children;
  }
}
