<template>
  <div>Comic list view, {{ testUtil() }}<test-widget /></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import context from '../../context';

@Component({
  components: context.getComponents(),
})
export default class ComicList extends Vue {
  private readonly testUtil = (context.getDependencies('animation.utils') as any).test;
}
</script>
