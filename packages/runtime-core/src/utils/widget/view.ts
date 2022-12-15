import type { IBaseComponent } from '@petals/basic';
import { FlexBreakpointListProp, normalizeClassName } from 'petals-ui/dist/basic';
import type { FormLayoutType, IFormComponent } from 'petals-ui/dist/form';
import type { IDialogComponent } from 'petals-ui/dist/dialog';

import {
  isBoolean,
  isNumber,
  isString,
  isNumeric,
  isFunction,
  isPlainObject,
  omit,
} from '../../vendors/toolbox';
import {
  HistoryHelper,
  ConfigType,
  ComponentCtor,
  InputDescriptor,
  SearchDescriptor,
  ActionDescriptor,
  ClientAction,
  ViewContext,
  ListViewContext,
  getControl,
  getViews,
  createModuleContext,
  createView,
} from '../../vendors/organik';
import { getAppHelperForInternalUse } from '../../vendors/organik/core/app';

import type { ActionRenderType } from '../../types/render-type';
import type { ViewFieldDescriptor } from '../../types/input';
import type { TableColumn, DataTableProps, ViewContextDescriptor } from '../../types/view';
import type { FormRendererProps, ViewRendererProps } from '../../types/renderer';
import type { SearchWidgetConfig, DialogViewWidgetConfig } from '../../types/widget';

import { isBoolOrExprTrue } from '../renderer';
import { getBehaviorByKey } from '../theme';
import { resolveSafePropsFromConfig } from './base';

const BREAKPOINT_PART = '(xs|sm|md|lg|xl)-[1-9]{1,2}';
const fullRegExp = new RegExp(`^([?${BREAKPOINT_PART}(/${BREAKPOINT_PART}){0,}]?,?)+$`);

function resolveBreakpoints(cols: string): FlexBreakpointListProp[] {
  return cols.split(',').map(col =>
    col
      .replace(/(\[|\])/g, '')
      .split('/')
      .reduce((prev, breakpoint) => {
        const [size, span] = breakpoint.split('-');

        return { ...prev, [size]: Number(span) };
      }, {}),
  );
}

function renderFormFieldNodes<
  DescriptorType extends InputDescriptor & { hidden?: boolean },
  NodeType
>(
  descriptors: DescriptorType[],
  arrangement: string | undefined,
  renderChild: (descriptor: DescriptorType) => NodeType,
  renderRow: (descriptors: DescriptorType[], cols: FlexBreakpointListProp[] | number) => NodeType,
): NodeType[] {
  const formFieldNodes: NodeType[] = [];
  const rows = (arrangement || '').split('|');

  const needLayout =
    rows.length > 0 &&
    rows.filter(row => (isNumeric(row) && Number(row) > 0) || fullRegExp.test(row)).length ===
      rows.length;

  if (needLayout) {
    const remainedFilters = descriptors.filter(({ hidden }) => hidden !== true);

    do {
      const cols = rows.shift()!;

      let breakpoints: FlexBreakpointListProp[] = [];
      let count: number;

      if (isNumeric(cols)) {
        count = Number(cols);
      } else {
        breakpoints = resolveBreakpoints(cols);
        count = breakpoints.length;
      }

      formFieldNodes.push(renderRow(remainedFilters.splice(0, count), breakpoints));
    } while (remainedFilters.length > 0 && rows.length > 0);

    if (remainedFilters.length > 0) {
      formFieldNodes.push(renderRow(remainedFilters, -1));
    }
  } else {
    descriptors.forEach(descriptor => {
      if (!descriptor.hidden) {
        formFieldNodes.push(renderChild(descriptor));
      }
    });
  }

  return formFieldNodes;
}

function renderFormChildren<
  DescriptorType extends InputDescriptor & { hidden?: boolean },
  NodeType
>(
  descriptors: DescriptorType[],
  arrangement: string | undefined,
  renderGroup: (title: string, formFieldNodes: NodeType[]) => NodeType,
  renderChild: (descriptor: DescriptorType) => NodeType,
  renderRow: (descriptors: DescriptorType[], cols: FlexBreakpointListProp[] | number) => NodeType,
): NodeType[] {
  const groups = (arrangement || '').match(/\(([^()]+)\)/g);

  if (!groups) {
    return renderFormFieldNodes(descriptors, arrangement, renderChild, renderRow);
  }

  let startIndex = 0;
  let endIndex = 0;

  return groups
    .map(group => group.replace(/\(|\)/g, ''))
    .filter(group => !!group)
    .map(group => {
      const grouped = group.split(':');
      const count = grouped[1]
        .split('|')
        .reduce((prev, row) => (isNumeric(row) ? Number(row) : row.split(',').length) + prev, 0);

      endIndex = startIndex + count;

      const fields = renderGroup(
        grouped[0],
        renderFormFieldNodes(
          descriptors.slice(startIndex, endIndex),
          grouped[1],
          renderChild,
          renderRow,
        ),
      );

      startIndex = endIndex;

      return fields;
    });
}

function resolveFormLayout({ config, behavior }: FormRendererProps): FormLayoutType {
  if (config.formLayout) {
    return config.formLayout;
  }

  return behavior && behavior.formLayout
    ? behavior.formLayout
    : getBehaviorByKey('common.view.objectViewFormLayout', 'horizontal');
}

function resolveLabelWidth({ formControlLabelWidth }: ConfigType): string {
  const labelWidth =
    formControlLabelWidth || getBehaviorByKey('common.view.objectViewFormControlLabelWidth', '');

  return isNumber(labelWidth) ? `${labelWidth}px` : labelWidth;
}

function resolveFormControlSize({
  formControlSize,
}: ConfigType): Pick<IFormComponent, 'controlSize'>['controlSize'] {
  return formControlSize || getBehaviorByKey('common.view.objectViewFormControlSize', '');
}

function resolveShowValidationMessage({ showValidationMessage }: ConfigType): boolean {
  return isBoolean(showValidationMessage)
    ? showValidationMessage
    : getBehaviorByKey('common.view.objectViewShowValidationMessage');
}

function renderForm<NodeType>(
  props: FormRendererProps,
  renderGroup: (title: string, formFieldNodes: NodeType[]) => NodeType,
  renderChild: (descriptor: ViewFieldDescriptor) => NodeType,
  renderRow: (
    descriptors: ViewFieldDescriptor[],
    cols: FlexBreakpointListProp[] | number,
  ) => NodeType,
  render: (stuff: {
    FormControl?: ComponentCtor;
    props: Partial<IFormComponent & IBaseComponent>;
    children: NodeType[];
  }) => NodeType,
): NodeType {
  const { value, config = {} } = props;
  const { arrangement } = config;

  return render({
    FormControl: getControl('Form'),
    props: {
      className: normalizeClassName('HandieFormRenderer', props.className),
      layout: resolveFormLayout(props),
      labelOption: { width: resolveLabelWidth(config), align: 'right' },
      controlSize: resolveFormControlSize(config),
      hideMessage: !resolveShowValidationMessage(config),
    },
    children: renderFormChildren(
      props.fields.filter(
        ({ available }) => !isString(available) || isBoolOrExprTrue(value, available!, false),
      ),
      isFunction(arrangement) ? arrangement({ ...(value || {}) }) : arrangement,
      renderGroup,
      renderChild,
      renderRow,
    ),
  });
}

function resolveViewWidgetCtor<WidgetCtor extends ComponentCtor = ComponentCtor>(
  props: ViewRendererProps,
  componentAsserter: (ctor: any) => boolean,
  moduleContextCreator = createModuleContext,
): WidgetCtor | undefined {
  const [moduleName, resourceType, viewName] = props.view.split('.');
  const view = getViews(moduleName)[viewName];

  if (resourceType !== 'views' || !view) {
    return undefined;
  }

  return createView(
    moduleContextCreator(moduleName),
    isFunction(view) && !componentAsserter(view)
      ? (view as (...args: any[]) => ViewContextDescriptor)(...props.params)
      : (view as ViewContextDescriptor),
  ) as WidgetCtor;
}

function isConditionPersisted(viewContext: ListViewContext): boolean {
  const defaultConditionPersists = getBehaviorByKey('common.search.conditionPersists', false);
  const searchDescriptor = viewContext.getSearch();

  if (!isPlainObject(searchDescriptor)) {
    return defaultConditionPersists;
  }

  const { conditionPersists } =
    (searchDescriptor as SearchDescriptor<SearchWidgetConfig>).config || {};

  return isBoolean(conditionPersists) ? conditionPersists : defaultConditionPersists;
}

function encode(condition?: Record<string, any>): string {
  return condition ? encodeURIComponent(JSON.stringify(condition)) : '';
}

function decode(encoded?: string): Record<string, any> {
  return encoded ? JSON.parse(decodeURIComponent(encoded)) : {};
}

const persistenceKey = '__handie-scpk'; // !!! can't be dynamic, because URL will be shared among people

function persistsInUrl(history: HistoryHelper, params: Record<string, any>): void {
  const { query, ...others } = omit(history.getLocation(), ['rawPath', 'ancestors']);

  history.replace({
    ...others,
    query: { ...query, [persistenceKey]: encode({ ...decode(query[persistenceKey]), ...params }) },
  });
}

function restoreFromUrl(history: HistoryHelper): Record<string, any> {
  return decode(history.getLocation().query[persistenceKey]);
}

function isActionsAuthorized(actionsAuthority: string | undefined): boolean {
  if (!actionsAuthority) {
    return true;
  }

  const authority = getAppHelperForInternalUse().session.getAuthority();

  return authority ? !!authority[actionsAuthority] : false;
}

function resolveActionsAuthority(viewContext: ViewContext): string | undefined {
  const actionsAuthority = viewContext.getActionsAuthority();

  return isFunction(actionsAuthority)
    ? (actionsAuthority as (...args: any[]) => string)(
        getAppHelperForInternalUse().history.getLocation(),
      )
    : (actionsAuthority as string | undefined);
}

function resolveAuthorizedActions(
  actions: ClientAction[],
  actionsAuthority: string | undefined,
): ClientAction[] {
  if (actionsAuthority) {
    return actions;
  }

  const { history, session } = getAppHelperForInternalUse();
  const route = history.getLocation();
  const authority = session.getAuthority();

  if (!authority) {
    return [];
  }

  return actions.filter(({ authority: auth }) => {
    const resolvedAuth = isFunction(auth)
      ? (auth as (...args: any[]) => string)(route)
      : (auth as string | undefined);

    return !resolvedAuth || !!authority[resolvedAuth];
  });
}

function resolveAuthorizedSpecificActions(
  actionFilter: (action: ActionDescriptor) => boolean,
  viewContext: ViewContext,
): ClientAction[] {
  const actionsAuthority = resolveActionsAuthority(viewContext);

  return isActionsAuthorized(actionsAuthority)
    ? resolveAuthorizedActions(
        viewContext.getActions().filter(actionFilter) as ClientAction[],
        actionsAuthority,
      )
    : [];
}

const resolveTopActions = resolveAuthorizedSpecificActions.bind(
  null,
  ({ context }) => !!context && context !== 'single',
);

const resolveItemActions = resolveAuthorizedSpecificActions.bind(
  null,
  ({ context }) => !context || context === 'single',
);

function resolveActionStuffs<A extends ClientAction<ConfigType> = ClientAction<ConfigType>>(
  viewContext: ViewContext,
): { top: A[]; item: A[]; map: Record<string, A> } {
  const topActions: A[] = [];
  const itemActions: A[] = [];
  const actionMap: Record<string, A> = {};

  const actionsAuthority = resolveActionsAuthority(viewContext);

  if (isActionsAuthorized(actionsAuthority)) {
    (resolveAuthorizedActions(viewContext.getActions() as A[], actionsAuthority) as A[]).forEach(
      action => {
        if (!action.context || action.context === 'single') {
          itemActions.push(action);
        } else {
          topActions.push(action);
        }

        if (action.name) {
          actionMap[action.name] = action;
        }
      },
    );
  }

  return { top: topActions, item: itemActions, map: actionMap };
}

function resolveTooltipEnabled(field: ViewFieldDescriptor, context: ListViewContext): boolean {
  if (field.config && isBoolean(field.config.showOverflowTooltip)) {
    return field.config.showOverflowTooltip;
  }

  const { showTooltipWhenContentOverflow } = context.getConfig();

  return isBoolean(showTooltipWhenContentOverflow)
    ? showTooltipWhenContentOverflow
    : getBehaviorByKey('view.table.showTooltipWhenContentOverflow', false);
}

function resolveTableColumns(
  context: ListViewContext,
  inlineButtonSize: string,
  inlineActionRenderType: ActionRenderType,
  cellRendererResolver,
  operationColumnResolver,
): TableColumn[] {
  const cols: TableColumn[] = context.getFields().map(field => ({
    key: field.name,
    title: field.label,
    ellipsis: resolveTooltipEnabled(field, context),
    render: cellRendererResolver(field, context),
    ...(field.config || {}),
  }));

  const {
    showSerialNumber,
    serialNumberColumnWidth = getBehaviorByKey('view.table.serialNumberColumnWidth', '55'),
    serialNumberColumnAlignment = 'center',
    checkable,
    selectionColumnWidth = getBehaviorByKey('view.table.selectionColumnWidth', '55'),
    selectionColumnAlignment = 'center',
  } = context.getConfig();

  if (showSerialNumber === true) {
    cols.unshift({
      title: '序号',
      type: 'index',
      width: serialNumberColumnWidth,
      align: serialNumberColumnAlignment,
    });
  }

  const actionsAuthority = resolveActionsAuthority(context);

  const checkableActions = isActionsAuthorized(actionsAuthority)
    ? resolveAuthorizedActions(
        ([] as ClientAction[]).concat(
          (context.getActionsByContextType('batch') || []) as ClientAction[],
          (context.getActionsByContextType('both') || []) as ClientAction[],
        ),
        actionsAuthority,
      )
    : [];

  if (isBoolean(checkable) ? checkable : checkableActions.length > 0) {
    cols.unshift({
      type: 'selection',
      width: selectionColumnWidth,
      align: selectionColumnAlignment,
    });
  }

  const operationCol = operationColumnResolver(context, inlineButtonSize, inlineActionRenderType);

  if (operationCol) {
    cols.push(operationCol);
  }

  return cols;
}

function resolveTableProps(
  context: ListViewContext,
  inlineButtonSize: string,
  inlineActionRenderType: ActionRenderType,
  cellRendererResolver,
  operationColumnResolver,
): DataTableProps {
  return {
    ...resolveSafePropsFromConfig(context.getConfig(), [
      'checkable',
      'showSerialNumber',
      'showTooltipWhenContentOverflow',
      'selectionColumnWidth',
      'selectionColumnAlignment',
      'serialNumberColumnWidth',
      'serialNumberColumnAlignment',
      'operationColumnWidth',
      'operationColumnAlignment',
    ]),
    columns: resolveTableColumns(
      context,
      inlineButtonSize,
      inlineActionRenderType,
      cellRendererResolver,
      operationColumnResolver,
    ),
  };
}

function resolveSafeDialogProps<CT extends DialogViewWidgetConfig = DialogViewWidgetConfig>(
  config: CT,
): Partial<IDialogComponent> {
  return resolveSafePropsFromConfig(config, [
    'width',
    'visible',
    'affirmButton',
    'denyButton',
    'onClose',
  ]);
}

export {
  renderFormChildren,
  renderForm,
  resolveViewWidgetCtor,
  isConditionPersisted,
  persistsInUrl,
  restoreFromUrl,
  isActionsAuthorized,
  resolveActionsAuthority,
  resolveAuthorizedActions,
  resolveItemActions,
  resolveActionStuffs,
  resolveTableProps,
  resolveSafeDialogProps,
};
