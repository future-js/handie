import { Component } from 'react';

import type { ViewContext } from '@handie/runtime-core';

import ViewReactContext from '../../contexts/view';

export default class BaseRenderer<
  P extends Record<string, any> = {}, // eslint-disable-line @typescript-eslint/ban-types
  S extends Record<string, any> = {} // eslint-disable-line @typescript-eslint/ban-types
> extends Component<P, S> {
  static contextType = ViewReactContext;

  protected get $$view(): ViewContext {
    return this.context.viewContext;
  }
}
