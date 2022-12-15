import { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { FilterDescriptor, isBoolean, getControl, getRenderer } from 'handie-vue';
import { SearchStructuralWidget } from 'handie-vue/dist/widgets';

import defaultBehaviors from './behavior';

@Component
export default class PopupSearchWidget extends SearchStructuralWidget {
  private resolveSearchable(): boolean {
    return isBoolean((this.config as any).searchable)
      ? (this.config as any).searchable
      : this.getBehavior('searchable') !== false;
  }

  private resolveResettable(): boolean {
    return isBoolean((this.config as any).resettable)
      ? (this.config as any).resettable
      : this.getBehavior('resettable') === true;
  }

  private handleSearch(evt: any): void {
    this.submit();

    if (evt) {
      evt.preventDefault();
    }
  }

  public render(h: CreateElement): VNode {
    const formControlSize = this.getBehavior('formControlSize');
    const formChildren: VNode[] = [];

    const filterMap: Record<string, FilterDescriptor> = {};

    this.filters.forEach(filter => {
      if (!filter.hidden) {
        filterMap[filter.name] = filter;

        formChildren.push(
          h(getControl('FormField'), { props: { label: filter.label } }, [
            h(getRenderer('FilterRenderer'), {
              props: { filter, value: this.condition[filter.name] },
            }),
          ]),
        );
      }
    });

    const searchable = this.resolveSearchable();
    const buttonProps: Record<string, any> = {
      className: 'PopupSearch-button',
      size: formControlSize,
      nativeType: 'submit',
    };

    if (this.getBehavior('submitButtonAsPrimary') === true) {
      buttonProps.color = 'primary';
    }

    const buttons: VNode[] = [];

    if (searchable) {
      buttons.push(
        h(getControl('Button'), { props: buttonProps, on: { click: this.handleSearch } }, '查询'),
      );
    }

    if (this.resolveResettable()) {
      buttons.push(
        h(
          getControl('Button'),
          {
            props: { className: 'PopupSearch-button', size: formControlSize },
            on: {
              click: evt => {
                this.reset();
                evt.preventDefault();
              },
            },
          },
          '重置',
        ),
      );
    }

    const buttonGroup: VNode | null =
      buttons.length > 0 ? h('div', { staticClass: 'PopupSearch-buttonGroup' }, buttons) : null;

    if (buttonGroup) {
      formChildren.push(buttonGroup);
    }

    const searchChildren = [
      h(getControl('Popover'), { props: { trigger: 'click' } }, [
        h(getControl('Button'), [h(getControl('Icon'), { props: { refs: 'el:view' } })]),
        h(
          getControl('Form'),
          {
            props: { value: this.condition, controlSize: formControlSize, layout: 'vertical' },
            slot: 'content',
          },
          formChildren,
        ),
      ]),
    ];

    if (((this.config as any).shortcuts || []).length > 0) {
      const shortcutFilters: VNode[] = [];

      (this.config as any).shortcuts.forEach(filterName => {
        const filter = filterMap[filterName];

        if (filter) {
          shortcutFilters.push(
            h(getControl('FormField'), [
              h(getRenderer('FilterRenderer'), {
                props: { filter, value: this.condition[filter.name] },
              }),
            ]),
          );
        }
      });

      if (shortcutFilters.length > 0) {
        searchChildren.unshift(
          h(
            getControl('Form'),
            { props: { value: this.condition, controlSize: formControlSize, layout: 'inline' } },
            shortcutFilters,
          ),
        );
      }
    }

    return h('div', searchChildren);
  }

  public created(): void {
    this.setBehaviors('search.popup', defaultBehaviors);
    this.initCondition();
  }
}
