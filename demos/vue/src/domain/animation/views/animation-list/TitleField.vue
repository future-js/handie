<template>
  <a :href="`https://otaku-ism.com/animations/${row.id}/`" target="_blank">{{ value }}</a>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';

import { StringFieldStructuralWidget } from '@/components/widget/base';

@Component
export default class AnimationListTitleField extends StringFieldStructuralWidget {
  private get row() {
    return this.$$view.getValue();
  }
}
</script>
