<template>
  <span>{{ count }}</span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';

import type { AnimationEntity } from '@_/modules/animation/typing';

import { RelationFieldStructuralWidget } from '@/components/widget/base';

@Component
export default class AnimationListEpisodesFieldWidget extends RelationFieldStructuralWidget<
  AnimationEntity[]
> {
  private get count() {
    return (this.value || []).length;
  }
}
</script>
