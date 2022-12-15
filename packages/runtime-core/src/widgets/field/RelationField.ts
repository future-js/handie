import {
  DataValue,
  RequestParams,
  ResponseResult,
  ResponseSuccess,
  ResponseFail,
} from '../../vendors/organik';

import { ObjectValue, ListValue } from '../../types';
import { DynamicRelationField, RelationViewField } from '../../types/input';
import { FieldWidgetConfig } from '../../types/widget/field';
import { noop } from '../../utils';

import { FieldHeadlessWidget } from './Field';

class RelationFieldHeadlessWidget<
  VT extends ObjectValue | ListValue,
  CT extends FieldWidgetConfig = FieldWidgetConfig
> extends FieldHeadlessWidget<VT, CT, RelationViewField> {
  public getLabelKey(): string {
    const field = this.getField();

    return (field.dynamic && field.relatedLabelKey) || 'label';
  }

  public getValueKey(): string {
    const field = this.getField();

    let key = 'value';

    if (field.dynamic) {
      key = field.relatedValueKey || field.relatedPrimaryKey || key;
    }

    return key;
  }

  public fetchReferenceValue(
    data: VT,
    callback: (result: ResponseResult<DataValue>) => void,
  ): void {
    const { referenceValueGetter } = this.getField() as DynamicRelationField;

    if (!referenceValueGetter) {
      return;
    }

    referenceValueGetter(data).then(result => {
      if (result.success) {
        callback(result);
      }
    });
  }

  public fetchRelatedList(
    params: RequestParams,
    success: ResponseSuccess = noop,
    fail: ResponseFail = noop,
  ): void {
    const { dynamic, relatedListGetter } = this.getField() as DynamicRelationField;

    if (!dynamic || !relatedListGetter) {
      return;
    }

    relatedListGetter(params).then(result => {
      if (result.success) {
        success(result.data, result.extra, result);
      } else {
        fail(result.message, result);
      }
    });
  }
}

export { RelationFieldHeadlessWidget };
