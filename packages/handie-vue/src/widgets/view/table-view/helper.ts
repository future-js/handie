import Vue, { CreateElement, VNode } from 'vue';

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
  toPascalCase,
  getControl,
  getRenderer,
  isActionsAuthorized,
  resolveActionsAuthority,
  resolveAuthorizedActions,
  resolveItemActions,
} from '@handie/runtime-core';

import type { ComponentCtor } from '../../../types/component';
import { isComponentCtor } from '../../../utils';

function createCellRenderer(
  viewContext: ObjectViewContext,
  renderFunc: (h: CreateElement) => VNode,
): ComponentCtor {
  return Vue.extend({ name: 'CellRenderer', provide: { viewContext }, render: renderFunc });
}

function resolveCellRenderer(
  field: ViewFieldDescriptor,
  context: ListViewContext,
): CellComponentRenderer<TableColumn> | undefined {
  const widget = field.widget;

  return !isFunction(widget) || isComponentCtor(widget)
    ? (h: CreateElement, data: ColumnContext<TableColumn>) =>
        h(
          createCellRenderer(context.getChildren()[data.index], () =>
            h(getRenderer('FieldRenderer'), {
              props: { field, value: data.row[data.column.key!], readonly: true },
              attrs: data,
            }),
          ),
        )
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
    render: (h, { index }) => {
      const ctx = context.getChildren()[index];

      return h(
        createCellRenderer(ctx, () =>
          h(
            'div',
            resolveAuthorizedActions(ctx.getActions() as ClientAction[], actionsAuthority).map(
              (action, idx) => {
                const { renderType = inlineActionRenderType, config = {}, ...others } = action;
                const actionKey = `${toPascalCase((others.name || others.text) as string)}${idx}`;
                const rowKey = `TableViewWidgetRow${ctx.getId()}`;
                const actionNode = h(getRenderer('ActionRenderer'), {
                  props: {
                    action: {
                      ...others,
                      renderType,
                      config: { size: inlineButtonSize, ...config },
                    },
                  },
                  key: `${actionKey}InlineActionOf${rowKey}`,
                });
                const tooltipComponent = getControl('Tooltip');

                return config.showTooltip === true && tooltipComponent
                  ? h(
                      tooltipComponent,
                      {
                        props: { className: 'ActionWidgetTooltip', content: action.text || '' },
                        key: `${actionKey}InlineActionTooltipOf${rowKey}`,
                      },
                      [actionNode],
                    )
                  : actionNode;
              },
            ),
          ),
        ),
      );
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
