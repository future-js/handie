<template>
  <Flex class="TabBar">
    <slot>
      <TabBarItem
        v-for="(tab, idx) in tabs"
        :key="idx"
        :className="tab.className"
        :active="tab.active === true"
        :icon="tab.icon"
        :link="tab.link"
        @activate="activateTab(idx, $event)">{{ tab.text }}</TabBarItem>
    </slot>
  </Flex>
</template>

<script>
  import { isString, each, map, mixin } from '../../utils/common/helper';

  import { Flex } from '../flex';
  import TabBarItem from './TabBarItem.vue';

  import slot from '../../mixins/slot';

  export default {
    name: 'TabBar',
    components: {
      Flex,
      TabBarItem
    },
    mixins: [slot],
    props: {
      items: Array
    },
    data() {
      return {
        tabs: []
      };
    },
    methods: {
      activateTab( idx, evt ) {
        this.tabs = map(this.tabs, ( t, i ) => mixin(true, {}, t, {active: i === idx}));

        this.$emit('activate', idx, evt);
      }
    },
    watch: {
      items: {
        handler( val ) {
          let items = [];
          let activated;

          if ( val ) {
            each(val, ( item, idx ) => {
              item = mixin({}, isString(item) ? {text: item} : item);

              if ( item.active === true ) {
                activated = idx;
              }

              items.push(item);
            });

            if ( activated === undefined ) {
              items[0].active = true;
            }
          }

          this.tabs = items;
        },
        immediate: true
      }
    }
  }
</script>
