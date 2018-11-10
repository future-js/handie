<template>
  <transition
    name="muu-toast-fade"
    @after-enter="$emit('shown')"
    @after-leave="$emit('hidden')">
    <div class="Toast" v-show="shown">
      <div class="Toast-body">
        <Icon class="Toast-icon" :type="icon" v-if="icon" />
        <div class="Toast-content"><template v-if="text">{{ text }}</template><slot v-else></slot></div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { Icon } from '../icon';

  export default {
    name: 'Toast',
    components: {
      Icon
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      duration: {
        type: Number,
        default: 3000
      },
      text: {
        type: String
      },
      icon: {
        type: String
      }
    },
    data() {
      return {
        shown: false,
        timer: 0
      }
    },
    watch: {
      shown( val ) {
        if ( val ) {
          clearTimeout(this.timer);

          if ( this.duration !== -1 ) {
            this.timer = setTimeout(() => {
              this.shown = false;
            }, this.duration);
          }
        }
      },
      show: {
        handler( val ) {
          this.shown = val;
        },
        immediate: true
      }
    }
  }
</script>
