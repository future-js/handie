<script lang="ts">
import { Component } from 'vue-property-decorator';

import { ActionStructuralWidget } from '@/components/widget/base';

@Component
export default class FuckAction extends ActionStructuralWidget {
  public render(h) {
    return h('div', { staticClass: 'ActionWidget' }, this.renderContent());
  }
}
</script>
