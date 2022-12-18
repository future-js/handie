import type { ReactNode } from 'react';

import {
  ViewFieldDescriptor,
  GridBreakpoint,
  FormRendererProps,
  isNumber,
  getControl,
  isBoolOrExprTrue,
  resolveFieldRequired,
  resolveFieldBehavior,
  renderForm,
} from '@handie/runtime-core';

import type { ComponentCtor } from '../../types/component';
import BaseRenderer from '../base';
import FieldRenderer from '../field';

export default class FormRenderer extends BaseRenderer<FormRendererProps> {
  private renderField(field: ViewFieldDescriptor): ReactNode {
    const { name, label, hint, config = {} } = field;

    const fieldValidation = (this.props.validation || {})[name] || { success: true };
    const readonly = isBoolOrExprTrue(this.props.value, this.props.readonly || field.readonly);

    const formItemProps: Record<string, any> = {
      label,
      required: resolveFieldRequired(this.props.value, readonly, field.required),
      message: fieldValidation.success ? '' : fieldValidation.message,
    };

    const formItemChildren: ReactNode[] = [
      <FieldRenderer
        key={`${name}FieldRendererOfFormRenderer`}
        field={field}
        value={this.props.value[name]}
        readonly={readonly}
        onChange={this.props.onChange}
      />,
    ];

    const resolveBehavior = resolveFieldBehavior.bind(null, config);

    if (resolveBehavior('showHintAtFormItem', false) === true) {
      if (resolveBehavior('hintPositionOfFormItem', 'explain') === 'label' && hint) {
        const Tooltip = getControl('Tooltip') as ComponentCtor;
        const Icon = getControl('Icon') as ComponentCtor;

        formItemProps.label = (
          <span>
            {label}
            {Tooltip ? (
              <Tooltip content={hint}>
                {Icon ? <Icon refs={resolveBehavior('hintIcon', '')} /> : null}
              </Tooltip>
            ) : null}
          </span>
        );
      } else {
        formItemProps.hint = hint;
      }
    }

    const FormField = getControl('FormField') as ComponentCtor;

    return FormField ? (
      <FormField key={`${name}FormFieldOfFormRenderer`} {...formItemProps}>
        {formItemChildren}
      </FormField>
    ) : null;
  }

  private renderFieldRow(
    fields: ViewFieldDescriptor[],
    cols: GridBreakpoint[] | number,
  ): ReactNode {
    let span: number | undefined;

    if (isNumber(cols) && cols > -1) {
      span = 24 / fields.length;
    }

    const GridRow = getControl('GridRow') as ComponentCtor;
    const GridCol = getControl('GridCol') as ComponentCtor;

    return GridRow ? (
      <GridRow key={`FieldRow${fields[0].name}OfFormRenderer`} gutter={24}>
        {fields.map((field, index) =>
          GridCol ? (
            <GridCol
              key={`FieldCol${field.name}OfFormRenderer`}
              {...(isNumber(cols) ? { span } : cols[index])}
            >
              {this.renderField(field)}
            </GridCol>
          ) : null,
        )}
      </GridRow>
    ) : null;
  }

  private renderFieldGroup(title: string, formFieldNodes: ReactNode[]): ReactNode {
    return (
      <div
        className='HandieFormRenderer-group'
        key={`${title}${formFieldNodes.length}FieldGroupOfFormRenderer`}
      >
        <div className='HandieFormRenderer-groupHeader'>{title}</div>
        <div className='HandieFormRenderer-groupBody'>{formFieldNodes}</div>
      </div>
    );
  }

  public render(): ReactNode {
    const FormField = getControl('FormField') as ComponentCtor;

    return renderForm(
      this.props,
      this.renderFieldGroup.bind(this),
      this.renderField.bind(this),
      this.renderFieldRow.bind(this),
      ({ FormControl, props, children }) =>
        FormControl ? (
          <FormControl {...props}>
            {children}
            {this.props.children && FormField ? (
              <FormField label=' '>{this.props.children}</FormField>
            ) : null}
          </FormControl>
        ) : null,
    );
  }
}
