import type {
  DataValue,
  ObjectValue,
  ObjectViewContext,
  ViewWidgetConfig,
  ObjectViewWidgetState,
} from '@handie/runtime-core';
import { ViewHeadlessWidget } from '@handie/runtime-core/dist/widgets';

import { ViewStructuralWidget } from '../view';

class ObjectViewStructuralWidget<
  S extends ObjectViewWidgetState = ObjectViewWidgetState,
  CT extends ViewWidgetConfig = ViewWidgetConfig,
  VT extends ObjectValue = ObjectValue
> extends ViewStructuralWidget<ObjectViewContext<VT, CT>, S, CT> {
  public readonly state = {
    loading: false,
    dataSource: {},
    value: {},
    validation: {},
  } as S;

  protected onFieldValueChange(fieldName: string, value: DataValue): void {
    this.$$view.setFieldValue(fieldName, value);
  }

  public componentWillMount(): void {
    super.componentWillMount();

    this.setHeadlessWidget(new ViewHeadlessWidget(this.props, this.$$view));
    this.setState({ value: this.$$view.getValue() });

    this.on({
      dataChange: dataSource => {
        this.setState({ dataSource: dataSource });
        this.$$view.setValue(dataSource);
      },
      fieldValidate: ({ name, result }) =>
        this.setState(state => ({ validation: { ...state.validation, [name]: result } })),
      change: value => this.setState({ value }),
    });
  }
}

export { ObjectViewStructuralWidget };
