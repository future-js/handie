<template>
  <div :class="classNames" @click="activate">
    <div class="TabBarItem-content">
      <div class="TabBarItem-icon" v-if="icon">
        <Icon :type="icon" v-if="isIcon" />
        <span :style="{'background-image': `url('${active ? iconUrls.active : iconUrls.default}')`}" v-else></span>
      </div>
      <p class="TabBarItem-label"><slot></slot></p>
    </div>
  </div>
</template>

<script>
  import { isString, isPlainObject, mixin } from '../../utils/common/helper';
  import { Icon } from '../icon';

  export default {
    name: 'TabBarItem',
    components: {
      Icon
    },
    props: {
      active: Boolean,
      className: String,
      icon: [String, Object],
      link: [String, Object]
    },
    methods: {
      activate( ...args ) {
        const { link, $router } = this;

        this.$emit('activate', ...args);

        if ( link && $router ) {
          $router.push(link);
        }
      }
    },
    computed: {
      classNames() {
        const { className, active } = this;
        const classes = ['TabBar-item', 'TabBarItem'];

        if ( className ) {
          classes.push(className);
        }

        if ( active ) {
          classes.push('is-active');
        }

        return classes.join(' ');
      },
      isIcon() {
        return isString(this.icon) && /^[a-z\-]+$/.test(this.icon);
      },
      iconUrls() {
        const icon = this.icon;

        if ( isString(icon) ) {
          return {default: icon, active: icon};
        }

        return mixin({default: '', active: ''}, icon);
      }
    }
  }
</script>
