import type { ReactNode } from 'react';

import {
  FilterDescriptor,
  SearchWidgetState,
  isBoolean,
  isNumber,
  getControl,
  getRenderer,
  renderFormChildren,
} from '@handie/runtime-core';

import type { ComponentCtor } from '../../../../types/component';
import type { FormSearchWidgetConfig } from '../../../../types/widget';

import { SearchStructuralWidget } from '../search';
import defaultBehaviors from './behavior';

class FormSearchStructuralWidget<
  S extends SearchWidgetState = SearchWidgetState,
  C extends FormSearchWidgetConfig = FormSearchWidgetConfig
> extends SearchStructuralWidget<S, C> {
  private renderFilter(filter: FilterDescriptor): ReactNode {
    const FormField = getControl('FormField') as ComponentCtor;
    const FilterRenderer = getRenderer('FilterRenderer') as ComponentCtor;

    return FormField ? (
      <FormField
        label={!this.isFormControlLabelHidden() ? filter.label : undefined}
        key={`${filter.name}FilterOfFormSearchStructuralWidget`}
      >
        {FilterRenderer ? (
          <FilterRenderer
            filter={filter}
            value={this.state.condition[filter.name]}
            onChange={(filterName, value) => this.setFilterValue(filterName, value)}
          />
        ) : null}
      </FormField>
    ) : null;
  }

  private renderFilterRow(filters: FilterDescriptor[]): ReactNode {
    return (
      <div
        className={this.getStyleClassName('FormSearch-filterRow')}
        key={`FilterRow${filters[0].name}OfFormSearchStructuralWidget`}
      >
        {filters.map(filter => this.renderFilter(filter))}
      </div>
    );
  }

  private renderFilterGroup(_, formFieldNodes: ReactNode[]): ReactNode {
    return <>{formFieldNodes}</>;
  }

  protected resolveLabelWidth(): string {
    const labelWidth =
      this.config.formControlLabelWidth || this.getBehavior('formControlLabelWidth');

    return isNumber(labelWidth) ? `${labelWidth}px` : labelWidth;
  }

  protected isStandalone(): boolean {
    return this.getBehavior('actionsStandalone') === true;
  }

  protected isSearchable(): boolean {
    return isBoolean(this.config.searchable)
      ? this.config.searchable!
      : this.getBehavior('searchable') !== false;
  }

  protected isResettable(): boolean {
    return isBoolean(this.config.resettable)
      ? this.config.resettable!
      : this.getBehavior('resettable') === true;
  }

  protected isFormControlLabelHidden(): boolean {
    return isBoolean(this.config.hideFormControlLabel)
      ? this.config.hideFormControlLabel!
      : this.getBehavior('hideFormControlLabel') === true;
  }

  protected handleSearch(evt: any): void {
    this.submit();

    if (evt) {
      evt.preventDefault();
    }
  }

  protected handleReset(evt: any): void {
    this.reset();

    if (evt) {
      evt.preventDefault();
    }
  }

  protected renderFilters(filters: FilterDescriptor[] = this.filters): ReactNode[] {
    const formChildren: ReactNode[] = renderFormChildren(
      filters,
      this.config.arrangement,
      this.renderFilterGroup.bind(this),
      this.renderFilter.bind(this),
      this.renderFilterRow.bind(this),
    );
    const Button = getControl('Button') as ComponentCtor;

    if ((this.isStandalone() || !this.isSearchable()) && Button) {
      // for submission when the Enter key pressed
      formChildren.push(
        <div style={{ display: 'none' }} key='SearchButtonProxyOfFormSearchStructuralWidget'>
          <Button nativeType='submit' onClick={evt => this.handleSearch(evt)}>
            替身查询
          </Button>
        </div>,
      );
    }

    return formChildren;
  }

  protected renderButtonGroup(): ReactNode {
    const formControlSize = this.getBehavior('formControlSize');
    const standalone = this.isStandalone();
    const searchable = this.isSearchable();
    const buttonProps: Record<string, any> = {
      className: this.getStyleClassName('FormSearch-button'),
      size: formControlSize,
      nativeType: standalone ? 'button' : 'submit',
    };

    if (this.getBehavior('submitButtonAsPrimary') === true) {
      buttonProps.color = 'primary';
    }

    const buttons: ReactNode[] = [];
    const Button = getControl('Button') as ComponentCtor;

    if (searchable && Button) {
      buttons.push(
        <Button
          {...buttonProps}
          key='SearchButtonOfFormSearchStructuralWidget'
          onClick={evt => this.handleSearch(evt)}
        >
          查询
        </Button>,
      );
    }

    if (this.isResettable() && Button) {
      buttons.push(
        <Button
          className={this.getStyleClassName('FormSearch-button')}
          size={formControlSize}
          key='ResetButtonOfFormSearchStructuralWidget'
          onClick={evt => this.handleReset(evt)}
        >
          重置
        </Button>,
      );
    }

    const buttonGroupClassNames = [this.getStyleClassName('FormSearch-buttonGroup')];

    if (standalone) {
      buttonGroupClassNames.push(this.getStyleClassName('is-standalone'));
    }

    return buttons.length > 0 ? (
      <div className={buttonGroupClassNames.join('')} key='ButtonGroupOfFormSearchStructuralWidget'>
        {buttons}
      </div>
    ) : null;
  }

  protected resolveProps(): Record<string, any> {
    return {
      value: this.state.condition,
      controlSize: this.getBehavior('formControlSize'),
      layout: this.getBehavior('formLayout'),
      labelOption: { width: this.resolveLabelWidth() },
    };
  }

  public componentWillMount(): void {
    super.componentWillMount();
    this.setBehaviors('search.form', defaultBehaviors);
    this.initCondition();
  }
}

export { FormSearchStructuralWidget };
