<template>
  <div class="AnimationDetailEpisodesField">
    <ol class="AnimationDetailEpisodesField-episodes" v-if="value">
      <li :key="ep" v-for="ep in value">{{ ep }}</li>
    </ol>
    <span v-else>暂无</span>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';

import { RelationFieldStructuralWidget } from '@/components/widget/headless';

@Component
export default class AnimationDetailEpisodesField extends RelationFieldStructuralWidget<string[]> {}
</script>

<style lang="scss" scoped>
.AnimationDetailEpisodesField {
  &-episodes {
    @include pie-clearfix;

    list-style: decimal inside;

    li {
      float: left;
      margin: 3px 6px;
    }
  }
}
</style>
