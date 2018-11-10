<template>
  <div class="Sticky" :style="wrapperStyle">
    <div class="Sticky-header" :style="headerStyle" v-if="hasHeader"><slot name="header"></slot></div>
    <div class="Sticky-body" @scroll="$emit('scroll', $event)"><slot></slot></div>
    <Flex class="Sticky-footer" :style="footerStyle" v-if="hasFooter"><slot name="footer"></slot></Flex>
  </div>
</template>

<script>
  import { Flex } from '../flex';
  
  import slot from '../../mixins/slot';

  export default {
    name: 'Sticky',
    components: {
      Flex
    },
    mixins: [slot],
    data() {
      return {
        headerHeight: 0,
        footerHeight: 0
      };
    },
    methods: {
      getStyle( type ) {
        return window.getComputedStyle(this.$el.querySelector(type === 'header' ? '.Sticky-header' : '.Sticky-footer'));
      },
      calcHeaderHeight() {
        if ( !this.hasHeader ) {
          return 0;
        }

        const { borderBottomWidth, height } = this.getStyle('header');

        return parseFloat(borderBottomWidth, 10) + parseFloat(height, 10);
      },
      calcFooterHeight() {
        if ( !this.hasFooter ) {
          return 0;
        }

        const { borderTopWidth, height } = this.getStyle('footer');

        return parseFloat(borderTopWidth, 10) + parseFloat(height, 10);
      }
    },
    computed: {
      wrapperStyle() {
        return {
          'padding-top': `${this.headerHeight}px`,
          'padding-bottom': `${this.footerHeight}px`
        };
      },
      headerStyle() {
        return {
          'margin-top': `-${this.headerHeight}px`
        };
      },
      footerStyle() {
        return {
          'margin-bottom': `-${this.footerHeight}px`
        };
      }
    },
    mounted() {
      this.headerHeight = this.calcHeaderHeight();
      this.footerHeight = this.calcFooterHeight();
    }
  }
</script>
