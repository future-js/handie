<template>
  <div class="Loading">
    <div class="Loading-content">
      <LoadingIcon class="Loading-icon" :fill="fillColor" />
      <p class="Loading-text" v-if="text">{{ text }}</p>
    </div>
  </div>
</template>

<script>
  import { getDefaults } from '../../utils/storage/helper';
  import LoadingIcon from './LoadingIcon.vue';

  export default {
    name: 'Loading',
    components: {
      LoadingIcon
    },
    props: {
      text: {
        type: String,
        default: '正在加载...'
      },
      fill: String
    },
    computed: {
      fillColor() {
        return this.fill || getDefaults('theme.color');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../stylesheets/helper";

  .Loading {
    text-align: center;
    @include stretch;
    @include text-middle(".Loading-content");
  }

  .Loading-icon {
    width: .9rem;
    height: .9rem;
  }

  .Loading-text {
    margin: 0;
    padding: 0;
    font-size: .24rem;
  }
</style>
