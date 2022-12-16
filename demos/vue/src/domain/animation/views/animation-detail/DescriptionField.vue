<template>
  <ellipsis>{{ value }}</ellipsis>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';

import { getComponents } from '@_/modules/animation/helper';

import { TextFieldStructuralWidget } from '@/components/widget/base';

@Component({
  components: getComponents(),
})
export default class AnimationDetailDescriptionField extends TextFieldStructuralWidget {}
</script>
