<template>
  <div class="TestWidget">来自动画模块的部件 <x-button>基础组件里的按钮</x-button></div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { getComponents } from '../../helper';

@Component({
  components: getComponents(),
})
export default class TestWidget extends Vue {}
</script>

<style lang="scss" src="./style.scss" scoped></style>
