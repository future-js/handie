import { isString, generateRandomId, clone, pick } from '@ntks/toolbox';

import {
  ComponentCtor,
  DataValue,
  ConfigType,
  ActionContextType,
  ActionAuthorityGetter,
  ClientAction,
  ActionGroupByContext,
  ViewFieldDescriptor,
  ViewDescriptor,
  ModuleContext,
  ValueContextDescriptor,
  ViewContextDescriptor,
  ViewContext as IViewContext,
  ListViewContext as IListViewContext,
  ObjectViewContext as IObjectViewContext,
  resolveAction,
  setViewContext,
  resolveFields,
  runExpression,
} from '../../core';
import { resolveInput } from '../../core/input';
import { ValueContext } from '../value';

type ViewContextOpener<VT, CT extends ConfigType> =
  | IListViewContext<VT, CT>
  | IObjectViewContext<VT, CT>
  | undefined;

class ViewContext<ValueType extends DataValue = DataValue, Config extends ConfigType = ConfigType>
  extends ValueContext<ValueType>
  implements IViewContext<ValueType, Config> {
  private readonly id: string;

  private readonly moduleContext: ModuleContext;

  private readonly options: ViewContextDescriptor<ValueType, Config>;

  private readonly fields: ViewFieldDescriptor[];

  private readonly actions: ClientAction[];

  private readonly opener: ViewContextOpener<ValueType, Config>;

  protected readonly actionContextGroups: ActionGroupByContext;

  private dataSource: ValueType;

  private busy: boolean = false;

  constructor(moduleContext: ModuleContext, options: ViewContextDescriptor<ValueType, Config>) {
    super(pick(options, ['defaultValue', 'initialValue']) as ValueContextDescriptor<ValueType>);

    this.id = generateRandomId('OrganikViewContext');
    this.moduleContext = moduleContext;
    this.options = options;
    this.fields = resolveFields(
      (options.fields || []).map(field => resolveInput(field)),
      moduleContext.getModel(),
    );
    this.opener = options.opener;

    const actions = (options.actions || [])
      .map(resolveAction)
      .filter(action => !!action) as ClientAction[];
    const actionContextGroups = {} as Record<ActionContextType, ClientAction[]>;

    actions.forEach(action => {
      const contextType = action.context || 'single';

      if (!actionContextGroups[contextType]) {
        actionContextGroups[contextType] = [] as ClientAction[];
      }

      actionContextGroups[contextType].push(action);
    });

    this.actions = actions;
    this.actionContextGroups = actionContextGroups;

    this.dataSource = clone(options.initialValue || options.defaultValue);

    setViewContext(this as any);
  }

  public getId(): string {
    return this.id;
  }

  public getModuleContext(): ModuleContext {
    return this.moduleContext;
  }

  /**
   * Get opener opened this view (pop-up view)
   *
   * @returns the opener that open this view
   */
  public getOpener(): ViewContextOpener<ValueType, Config> {
    return this.opener;
  }

  public getComponents(): Record<string, ComponentCtor> {
    return this.moduleContext.getComponents();
  }

  public getView(): ViewDescriptor<Config> {
    return this.options;
  }

  public getFields(): ViewFieldDescriptor[] {
    return clone(this.fields);
  }

  public getActions(): ClientAction[] {
    return this.actions.filter(action =>
      isString(action.available)
        ? !!runExpression(
            { dataSource: this.getDataSource(), value: this.getValue() },
            action.available!,
            false,
          )
        : action,
    );
  }

  public getActionsByContextType(contextType: ActionContextType): ClientAction[] {
    return this.actionContextGroups[contextType] || [];
  }

  public getActionsAuthority(): string | ActionAuthorityGetter | undefined {
    return this.options.actionsAuthority;
  }

  public getConfig(): Config {
    return (this.options.config || {}) as Config;
  }

  public getDataSource(): ValueType {
    return this.dataSource;
  }

  public setDataSource(data: ValueType): void {
    this.dataSource = data;
  }

  public getBusy(): boolean {
    return this.busy;
  }

  public setBusy(busy: boolean): void {
    this.busy = busy;
    this.emit('busyChange', busy);
  }
}

export { ViewContext };
