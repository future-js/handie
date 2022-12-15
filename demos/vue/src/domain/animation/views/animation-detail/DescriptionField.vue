<template>
  <ellipsis>{{ value }}</ellipsis>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';

import { TextFieldStructuralWidget } from '@/components/widget/base';
import { getComponents } from '../../helper';

@Component({
  components: getComponents(),
})
export default class AnimationDetailDescriptionField extends TextFieldStructuralWidget {}
</script>
