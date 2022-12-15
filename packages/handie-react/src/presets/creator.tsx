import { Component } from 'react';

import { setViewCreator } from '@handie/runtime-core';

import type { ComponentCtor } from '../types/component';
import ViewReactContext from '../contexts/view';

setViewCreator((context, provider, renderer) => {
  const DynamicRenderer = renderer as ComponentCtor;

  class ViewEntry extends Component {
    render() {
      return (
        <ViewReactContext.Provider value={provider}>
          {DynamicRenderer ? <DynamicRenderer /> : null}
        </ViewReactContext.Provider>
      );
    }
  }

  (ViewEntry as any).displayName = context.getView().name;

  return ViewEntry;
});
