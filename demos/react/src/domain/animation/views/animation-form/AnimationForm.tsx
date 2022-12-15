import { ReactNode } from 'react';

import { ObjectViewWidgetState } from '@/shared/types';
import { FormViewStructuralWidget } from '@/shared/components/widget/base';

import { getComponents } from '../../helper';
import style from './style.scss';

interface AnimationFormState extends ObjectViewWidgetState {
  popoverVisible: boolean;
  treeData: any[];
  checkedNodes: number[];
  expandedNodes: number[];
  selectedNodes: number[];
}

const treeData = [
  {
    id: 1,
    name: '节点 1',
    subList: [
      { id: 2, name: '节点 1-1' },
      { id: 3, name: '节点 1-2' },
    ],
  },
  {
    id: 4,
    name: '节点 2',
    subList: [
      { id: 5, name: '节点 2-1' },
      { id: 6, name: '节点 2-2' },
    ],
  },
];

export default class AnimationFormViewWidget extends FormViewStructuralWidget<AnimationFormState> {
  public readonly state = {
    loading: false,
    dataSource: {},
    value: {},
    validation: {},
    popoverVisible: false,
    treeData: [...treeData],
    checkedNodes: [3],
    expandedNodes: [treeData[0].id],
    selectedNodes: [2],
  };

  private filterTreeNode(keyword, data): boolean {
    return data.name.indexOf(keyword) > -1;
  }

  private handleTreeChange(checkedKeys: number[]): void {
    this.setState({ checkedNodes: checkedKeys });
  }

  private handleTreeSelect(selectedKeys: number[]): void {
    this.setState({ selectedNodes: selectedKeys });
  }

  private handleTreeExpand(expandedKeys: number[]): void {
    this.setState({ expandedNodes: expandedKeys });
  }

  private renderTreeNode(data, node) {
    return this.$createElement(
      'span',
      `${data.name} (key-${data.id}) (level-${node.level})`,
    );
  }

  private handleAlert(): void {
    (getComponents().Dialog as any).alert(
      <>
        <span style={{ color: '#f00' }}>Good</span> Job!!!
      </>,
      'Damn it!',
      { centered: true },
    );
  }

  private handleConfirm(): void {
    const { Dialog, Message } = getComponents();

    (Dialog as any).confirm(
      <p>
        想看第二个
        <br />
        弹窗吗？
      </p>,
      () => (Message as any).show('Good!', 1, { type: 'success' }),
      () =>
        (Message as any).show('oh no', () => alert('God!'), { type: 'error' }),
      { type: 'warning', closable: true },
    );
  }

  public componentDidMount(): void {
    this.on({
      fieldChange: ({ name, value }) => console.log(name, value),
      fieldValidate: ({ name, result }) => {
        if (!result.success) {
          console.log(
            `Validation result for field '${name}'`,
            result.success,
            result.message,
            result.type,
          );
        }
      },
      submit: () => {
        console.log('Form submitted!');
      },
    });

    this.$$view.on(`alert.${this.$$view.getId()}`, this.handleAlert.bind(this));
    this.$$view.on(
      `confirm.${this.$$view.getId()}`,
      this.handleConfirm.bind(this),
    );

    setTimeout(
      () => this.$$view.setFieldValue('ghost', 'You can not see me!'),
      3000,
    );

    this.fetchData();
  }

  public componentWillUnmount(): void {
    super.componentWillUnmount();

    const ctx = this.$$view;
    const id = ctx.getId();

    ctx.off(`alert.${id}`, this.handleAlert);
    ctx.off(`confirm.${id}`, this.handleConfirm);
  }

  public render(): ReactNode {
    const { Wait } = this.$$module.getComponents();

    return (
      <Wait className={style.AnimationFormViewWidget} busy={this.state.loading}>
        {this.renderForm({
          className: style['AnimationFormViewWidget-form'],
          children: this.renderActionBar(
            style['AnimationFormViewWidget-actionBar'],
          ),
        })}
      </Wait>
    );
  }
}
