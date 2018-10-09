<template>
  <div class="Box">
    <div class="Box-header" v-if="hasHeader"><slot name="header"></slot></div>
    <div class="Box-body"><slot></slot></div>
    <div class="Box-footer" v-if="hasFooter"><slot name="footer"></slot></div>
  </div>
</template>

<script>
  import slot from "../../mixins/slot";

  export default {
    name: "Box",
    mixins: [slot]
  }
</script>
