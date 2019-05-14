<template>
  <Sticky
    class="ViewBox"
    @scroll="$emit('scroll', $event)">
    <router-view />
    <TabBar
      :items="tabs"
      @activate="activateTab"
      slot="footer" />
  </Sticky>
</template>

<script>
  import { Sticky } from '../sticky';
  import { TabBar } from '../tab-bar';

  export default {
    name: 'ViewBox',
    components: {
      Sticky,
      TabBar
    },
    props: {
      tabs: Array
    },
    methods: {
      activateTab( ...args ) {
        this.$emit('activate', ...args);
      }
    }
  }
</script>
