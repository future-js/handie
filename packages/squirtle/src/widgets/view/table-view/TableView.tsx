import type { ReactNode } from 'react';

import { normalizeClassName } from 'handie-react';
import { TableViewStructuralWidget } from 'handie-react/dist/widgets/class';

import style from './style.scss';

export default class TableViewWidget extends TableViewStructuralWidget {
  constructor(props) {
    super(props);
    this.setStyleClassNames(style);
  }

  public render(): ReactNode {
    return (
      <div
        className={normalizeClassName(
          this.getStyleClassName('TableView'),
          this.config.className,
        )}
      >
        {[this.renderSearch(), this.renderActionBar(), this.renderDataTable()]}
      </div>
    );
  }
}
