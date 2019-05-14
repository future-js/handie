<template>
  <Sticky class="Submission" @scroll="$emit('scroll', $event)">
    <slot></slot>
    <template slot="footer">
      <button
        class="Submission-button Submission-button--secondary"
        type="button"
        @click="secondaryButton.handler"
        v-if="secondaryButton">{{ secondaryButton.text }}</button>
      <button
        class="Submission-button Submission-button--primary"
        type="button"
        @click="$emit('submit')">{{ primaryButton.text }}</button>
    </template>
  </Sticky>
</template>

<script>
  import { Sticky } from '../sticky';
  import { isString, isFunction, isPlainObject, mixin } from '../../utils/common/helper';

  export default {
    name: 'Submission',
    components: {
      Sticky
    },
    props: {
      primary: String,
      secondary: [Function, Object]
    },
    computed: {
      primaryButton() {
        const opts = this.primary;
        const action = {text: '提交'};

        if ( isString(opts) ) {
          action.text = opts;
        }

        return action;
      },
      secondaryButton() {
        const opts = this.secondary;
        const action = {text: '取消'};

        if ( isFunction(opts) ) {
          action.handler = opts;
        }
        else if ( isPlainObject(opts) ) {
          mixin(action, opts);
        }

        return isFunction(action.handler) ? action : null;
      }
    },
    mounted() {
      this.$emit('ready', this);
    }
  }
</script>
