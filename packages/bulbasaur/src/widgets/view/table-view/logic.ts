import type { CreateElement, VNode } from 'vue';
import { Component } from 'vue-property-decorator';

import { TableViewStructuralWidget } from 'handie-vue/dist/widgets';

@Component
export default class TableViewWidget extends TableViewStructuralWidget {
  public render(h: CreateElement): VNode {
    return h('div', { class: [this.getStyleClassName('TableView'), this.config.className] }, [
      this.renderSearch(this.getStyleClassName('TableView-search')),
      this.renderActionBar(
        this.getStyleClassName('TableView-tableActions'),
        this.getBehavior('topButtonActionSize'),
      ),
      this.renderDataTable(this.getStyleClassName('TableView-dataTable')),
    ]);
  }

  public created(): void {
    this.setStyleClassNames(this.$style);
  }
}
