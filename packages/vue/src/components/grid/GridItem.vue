<template>
  <FlexItem class="Grid-item">
    <slot></slot>
  </FlexItem>
</template>

<script>
  import { FlexItem } from "../flex";

  export default {
    name: "GridItem",
    components: {
      FlexItem
    }
  }
</script>
