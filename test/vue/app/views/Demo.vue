<template>
  <ViewBox
    class="Demo"
    :tabs="tabs"
    @activate="tabActivated" />
</template>

<script>
  import { ViewBox } from '../../../../src/vue/components/view-box';

  export default {
    name: 'Demo',
    components: {
      ViewBox
    },
    data() {
      return {
        tabs: [{
          text: '控制台',
          className: 'TabBarItem--console',
          icon: {
            default: '/vue/app/images/icon-console-default.png',
            active: '/vue/app/images/icon-console-active.png'
          },
          link: '/'
        }, {
          text: '我的客户',
          className: 'TabBarItem--clients',
          icon: {
            default: '/vue/app/images/icon-clientList-default.png',
            active: '/vue/app/images/icon-clientList-active.png'
          },
          link: '/supplement'
        }, {
          text: '业务工具',
          className: 'TabBarItem--tools',
          icon: {
            default: '/vue/app/images/icon-tools-default.png',
            active: '/vue/app/images/icon-tools-active.png'
          },
          link: '/jsx'
        }]
      }
    },
    methods: {
      tabActivated( ...args ) {
        console.log(...args);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../stylesheets/helper";

  .Demo /deep/ {
    > .Sticky-footer {
      .TabBarItem {
        padding: {
          top: rem(12px);
          bottom: rem(10px);
        }
        line-height: rem(20px);
      }

      .TabBarItem--console .TabBarItem-icon span {
        background-size: rem(48px) rem(40px);
      }

      .TabBarItem--clients .TabBarItem-icon span {
        background-size: rem(44px) rem(40px);
      }

      .TabBarItem--tools .TabBarItem-icon span {
        background-size: rem(50px) rem(50px);
      }
    }
  }
</style>
