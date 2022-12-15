import { Vue, Component, Inject } from 'vue-property-decorator';

import type { ViewContext } from '@handie/runtime-core';

@Component
export default class BaseRenderer<
  P extends Record<string, any> = {}, // eslint-disable-line @typescript-eslint/ban-types
  S extends Record<string, any> = {} // eslint-disable-line @typescript-eslint/ban-types
> extends Vue {
  @Inject({ from: 'viewContext', default: null })
  protected readonly $$view!: ViewContext;
}
