// import {
//   RequestParams,
//   ResponseSuccess,
//   ResponseFail,
//   ObjectValue,
//   ListValue,
//   noop,
// } from '@handie/runtime-core';
// import { DynamicRelationFilter } from '@handie/runtime-core/dist/types/input';
// import { Component, Prop, Watch } from 'vue-property-decorator';

// import FilterHeadlessWidget from './Filter';

// @Component
// export default class RelationFilterHeadlessWidget<
//   ValueType = ObjectValue | ListValue
// > extends FilterHeadlessWidget<ValueType> {
//   @Prop({ type: [Object, Array], default: null })
//   protected readonly value!: ValueType;

//   protected internalValue: ValueType = null as any;

//   protected get labelKey(): string {
//     return (
//       (this.filter.dynamic && (this.filter as DynamicRelationFilter).relatedLabelKey) || 'label'
//     );
//   }

//   protected get valueKey(): string {
//     let key = 'value';

//     if (this.filter.dynamic) {
//       key =
//         (this.filter as DynamicRelationFilter).relatedValueKey ||
//         (this.filter as DynamicRelationFilter).relatedPrimaryKey ||
//         key;
//     }

//     return key;
//   }

//   @Watch('value', { immediate: true })
//   private handleValueChange(): void {
//     if (!this.filter.dynamic || !(this.filter as DynamicRelationFilter).referenceValueGetter) {
//       this.internalValue = this.value;
//     }
//   }

//   private fetchReferenceValue(data: ValueType): void {
//     const { referenceValueGetter } = this.filter as DynamicRelationFilter;

//     if (!referenceValueGetter) {
//       return;
//     }

//     referenceValueGetter(data).then(result => {
//       if (result.success) {
//         this.internalValue = result.data;
//       }
//     });
//   }

//   protected fetchRelatedList(
//     params: RequestParams,
//     success: ResponseSuccess = noop,
//     fail: ResponseFail = noop,
//   ): void {
//     const { dynamic, relatedListGetter } = this.filter as DynamicRelationFilter;

//     if (!dynamic || !relatedListGetter) {
//       return;
//     }

//     relatedListGetter(params).then(result => {
//       if (result.success) {
//         success(result.data, result.extra, result);
//       } else {
//         fail(result.message, result);
//       }
//     });
//   }

//   protected created(): void {
//     if (this.filter.dynamic) {
//       this.on('dataChange', dataSource => this.fetchReferenceValue(dataSource));
//     }
//   }
// }
