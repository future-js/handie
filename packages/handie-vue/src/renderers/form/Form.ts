import type { CreateElement, VNode } from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import {
  ObjectValue,
  ConfigType,
  ValidationResult,
  GridBreakpoint,
  FormRendererProps,
  isNumber,
  getControl,
  isBoolOrExprTrue,
  resolveFieldRequired,
  resolveFieldBehavior,
  renderForm,
} from '@handie/runtime-core';
import type { ViewFieldDescriptor } from '@handie/runtime-core/dist/types/input';

import BaseRenderer from '../base';
import FieldRenderer from '../field';

@Component({
  // @ts-ignore
  abstract: true,
})
export default class FormRenderer extends BaseRenderer<FormRendererProps> {
  @Prop({ type: Array, default: () => [] })
  public readonly fields!: ViewFieldDescriptor[];

  @Prop({ type: Object, default: () => ({}) })
  public readonly value!: ObjectValue;

  @Prop({ type: Boolean, default: false })
  public readonly readonly!: boolean;

  @Prop({ type: Object, default: () => ({}) })
  public readonly validation!: Record<string, ValidationResult>;

  @Prop({ type: Object, default: () => ({}) })
  public readonly config!: ConfigType;

  @Prop({ type: Object, default: null })
  public readonly behavior!: Record<string, any>;

  @Prop()
  public readonly className!: any;

  private renderField(field: ViewFieldDescriptor): VNode {
    const { name, label, hint, config = {} } = field;

    const fieldValidation = (this.validation || {})[name] || { success: true };
    const readonly = isBoolOrExprTrue(this.value, this.readonly || field.readonly);

    const formItemProps: Record<string, any> = {
      label,
      required: resolveFieldRequired(this.value, readonly, field.required),
      message: fieldValidation.success ? '' : fieldValidation.message,
    };

    const h = this.$createElement;

    const formItemChildren: VNode[] = [
      h(FieldRenderer, {
        key: `${name}FieldRendererOfFormRenderer`,
        props: { field, value: this.value[name], readonly },
        on: { change: (...args) => this.$emit('change', ...args) },
      }),
    ];

    const resolveBehavior = resolveFieldBehavior.bind(null, config);

    if (resolveBehavior('showHintAtFormItem', false) === true) {
      if (resolveBehavior('hintPositionOfFormItem', 'explain') === 'label' && hint) {
        formItemChildren.push(
          h('span', { slot: 'label' }, [
            label,
            h(getControl('Tooltip'), { props: { content: hint } }, [
              h(getControl('Icon'), { props: { refs: resolveBehavior('hintIcon', '') } }),
            ]),
          ]),
        );
      } else {
        formItemProps.hint = hint;
      }
    }

    return h(
      getControl('FormField'),
      { props: formItemProps, key: `${name}FormFieldOfFormRenderer` },
      formItemChildren,
    );
  }

  private renderFieldRow(fields: ViewFieldDescriptor[], cols: GridBreakpoint[] | number): VNode {
    let span: number | undefined;

    if (isNumber(cols) && cols > -1) {
      span = 24 / fields.length;
    }

    const h = this.$createElement;

    return h(
      getControl('GridRow'),
      { props: { gutter: 24 }, key: `FieldRow${fields[0].name}OfFormRenderer` },
      fields.map((field, index) =>
        h(
          getControl('GridCol'),
          {
            props: isNumber(cols) ? { span } : cols[index],
            key: `FieldCol${field.name}OfFormRenderer`,
          },
          [this.renderField(field)],
        ),
      ),
    );
  }

  private renderFieldGroup(title: string, formFieldNodes: VNode[]): VNode {
    const h = this.$createElement;

    return h(
      'div',
      {
        staticClass: 'HandieFormRenderer-group',
        key: `${title}${formFieldNodes.length}FieldGroupOfFormRenderer`,
      },
      [
        h('div', { staticClass: 'HandieFormRenderer-groupHeader' }, title),
        h('div', { staticClass: 'HandieFormRenderer-groupBody' }, formFieldNodes),
      ],
    );
  }

  public render(h: CreateElement): VNode {
    return renderForm(
      this.$props as FormRendererProps,
      this.renderFieldGroup.bind(this),
      this.renderField.bind(this),
      this.renderFieldRow.bind(this),
      ({ FormControl, props, children }) =>
        h(FormControl, { props }, [
          ...children,
          this.$slots.default
            ? h(getControl('FormField'), { props: { label: ' ' } }, this.$slots.default)
            : null,
        ]),
    );
  }
}
