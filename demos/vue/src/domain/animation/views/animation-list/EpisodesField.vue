<template>
  <span>{{ count }}</span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';

import { RelationFieldStructuralWidget } from '@/components/widget/headless';

import { AnimationEntity } from '../../typing';

@Component
export default class AnimationListEpisodesField extends RelationFieldStructuralWidget<
  AnimationEntity[]
> {
  private get count() {
    return (this.value || []).length;
  }
}
</script>
