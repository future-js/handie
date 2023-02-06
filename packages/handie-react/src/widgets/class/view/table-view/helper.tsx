import { ReactNode, Component } from 'react';

import {
  ClientAction,
  ViewFieldDescriptor,
  ListViewContext,
  ObjectViewContext,
  ColumnContext,
  CellComponentRenderer,
  TableColumn,
  TableViewWidgetConfig,
  ActionRenderType,
  isNumber,
  isFunction,
  getControl,
  getRenderer,
  isActionsAuthorized,
  resolveActionsAuthority,
  resolveAuthorizedActions,
  resolveItemActions,
} from '@handie/runtime-core';

import type { ComponentCtor } from '../../../../types/component';
import { isComponentCtor } from '../../../../utils';
import ViewReactContext from '../../../../contexts/view';

function createCellRenderer(
  viewContext: ObjectViewContext,
  renderFunc: () => ReactNode,
): ComponentCtor {
  return class CellRenderer extends Component {
    render() {
      return (
        <ViewReactContext.Provider value={{ viewContext }}>
          {renderFunc()}
        </ViewReactContext.Provider>
      );
    }
  };
}

function resolveCellRenderer(
  field: ViewFieldDescriptor,
  context: ListViewContext,
): CellComponentRenderer<TableColumn> | undefined {
  const widget = field.widget;

  return !isFunction(widget) || isComponentCtor(widget)
    ? (_, data: ColumnContext<TableColumn>) => {
        const CellRenderer = createCellRenderer(context.getChildren()[data.index], () => {
          const FieldRenderer = getRenderer('FieldRenderer') as ComponentCtor;
          const props = { ...data, field, value: data.row[data.column.key!], readonly: true };

          return FieldRenderer ? <FieldRenderer {...props} /> : null;
        });

        return <CellRenderer />;
      }
    : (widget as CellComponentRenderer<TableColumn>);
}

function resolveOperationColumn(
  context: ListViewContext,
  inlineButtonSize: string,
  inlineActionRenderType: ActionRenderType,
): TableColumn | null {
  if (resolveItemActions(context).length === 0) {
    return null;
  }

  const actionsAuthority = resolveActionsAuthority(context);

  const allSingleActions = resolveAuthorizedActions(
    context.getActionsByContextType('single') as ClientAction[],
    actionsAuthority,
  );

  const col: TableColumn = {
    title: '操作',
    render: (_, { index }) => {
      const ctx = context.getChildren()[index];
      const CellRenderer = createCellRenderer(ctx, () => (
        <div>
          {resolveAuthorizedActions(ctx.getActions() as ClientAction[], actionsAuthority).map(
            action => {
              const { renderType = inlineActionRenderType, config = {}, ...others } = action;
              const ActionRenderer = getRenderer('ActionRenderer') as ComponentCtor;
              const actionNode = ActionRenderer ? (
                <ActionRenderer
                  action={{ ...others, renderType, config: { size: inlineButtonSize, ...config } }}
                  key={`${others.name || others.text}InlineActionOfTableViewWidget`}
                />
              ) : null;
              const Tooltip = getControl('Tooltip') as ComponentCtor;

              return config.showTooltip === true && Tooltip ? (
                <Tooltip
                  className='ActionWidgetTooltip'
                  content={action.text || ''}
                  key={`${others.name || others.text}InlineActionTooltipOfTableViewWidget`}
                >
                  {actionNode}
                </Tooltip>
              ) : (
                actionNode
              );
            },
          )}
        </div>
      ));

      return <CellRenderer />;
    },
  };

  const {
    operationColumnWidth,
    operationColumnAlignment,
  } = context.getConfig() as TableViewWidgetConfig;

  if (operationColumnWidth) {
    col.width = isNumber(operationColumnWidth)
      ? `${operationColumnWidth}px`
      : (operationColumnWidth as string);
  }

  if (operationColumnAlignment) {
    col.align = operationColumnAlignment;
  }

  return isActionsAuthorized(actionsAuthority) && allSingleActions.length > 0 ? col : null;
}

export { resolveCellRenderer, resolveOperationColumn };
