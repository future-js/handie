import type { VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import {
  FilterDescriptor,
  SearchWidgetState,
  isBoolean,
  isNumber,
  getControl,
  getRenderer,
  renderFormChildren,
} from '@handie/runtime-core';

import type { FormSearchWidgetConfig } from '../../../types/widget';

import { SearchStructuralWidget } from '../search';
import defaultBehaviors from './behavior';

@Component
class FormSearchStructuralWidget<
  S extends SearchWidgetState = SearchWidgetState,
  C extends FormSearchWidgetConfig = FormSearchWidgetConfig
> extends SearchStructuralWidget<S, C> {
  private renderFilter(filter: FilterDescriptor): VNode {
    const h = this.$createElement;

    return h(
      getControl('FormField'),
      {
        props: { label: !this.isFormControlLabelHidden() ? filter.label : undefined },
        key: `${filter.name}FilterOfFormSearchStructuralWidget`,
      },
      [
        h(getRenderer('FilterRenderer'), {
          props: { filter, value: this.condition[filter.name] },
          on: { change: (filterName, value) => this.setFilterValue(filterName, value) },
        }),
      ],
    );
  }

  private renderFilterRow(filters: FilterDescriptor[]): VNode {
    return this.$createElement(
      'div',
      {
        class: this.getStyleClassName('FormSearch-filterRow'),
        key: `FilterRow${filters[0].name}OfFormSearchStructuralWidget`,
      },
      filters.map(filter => this.renderFilter(filter)),
    );
  }

  private renderFilterGroup(_, formFieldNodes: VNode[]): VNode {
    return this.$createElement('div', formFieldNodes);
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

  protected renderFilters(filters: FilterDescriptor[] = this.filters): (VNode | null)[] {
    const formChildren: VNode[] = renderFormChildren(
      filters,
      this.config.arrangement,
      this.renderFilterGroup.bind(this),
      this.renderFilter.bind(this),
      this.renderFilterRow.bind(this),
    );
    const Button = getControl('Button');

    if ((this.isStandalone() || !this.isSearchable()) && Button) {
      const h = this.$createElement;

      // for submission when the Enter key pressed
      formChildren.push(
        h(
          'div',
          {
            staticStyle: { display: 'none' },
            key: 'SearchButtonProxyOfFormSearchStructuralWidget',
          },
          [
            h(
              Button,
              { props: { nativeType: 'submit' }, on: { click: evt => this.handleSearch(evt) } },
              '替身查询',
            ),
          ],
        ),
      );
    }

    return formChildren;
  }

  protected renderButtonGroup(): VNode | null {
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

    const buttons: VNode[] = [];
    const Button = getControl('Button');
    const h = this.$createElement;

    if (searchable && Button) {
      buttons.push(
        h(
          Button,
          {
            props: buttonProps,
            key: 'SearchButtonOfFormSearchStructuralWidget',
            on: { click: evt => this.handleSearch(evt) },
          },
          '查询',
        ),
      );
    }

    if (this.isResettable() && Button) {
      buttons.push(
        h(
          Button,
          {
            props: {
              className: this.getStyleClassName('FormSearch-button'),
              size: formControlSize,
            },
            key: 'ResetButtonOfFormSearchStructuralWidget',
            on: { click: evt => this.handleReset(evt) },
          },
          '重置',
        ),
      );
    }

    const buttonGroupClassNames = [this.getStyleClassName('FormSearch-buttonGroup')];

    if (standalone) {
      buttonGroupClassNames.push(this.getStyleClassName('is-standalone'));
    }

    return buttons.length > 0
      ? h(
          'div',
          {
            props: { className: buttonGroupClassNames.join('') },
            key: 'ButtonGroupOfFormSearchStructuralWidget',
          },
          buttons,
        )
      : null;
  }

  protected resolveProps(): Record<string, any> {
    return {
      value: this.condition,
      controlSize: this.getBehavior('formControlSize'),
      layout: this.getBehavior('formLayout'),
      labelOption: { width: this.resolveLabelWidth() },
    };
  }

  public created(): void {
    this.setBehaviors('search.form', defaultBehaviors);
    this.initCondition();
  }
}

export { FormSearchStructuralWidget };
