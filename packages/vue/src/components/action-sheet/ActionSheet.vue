<template>
  <div class="ActionSheet">
    <transition
      name="muu-action-sheet-slide"
      @after-enter="$emit('shown')"
      @after-leave="$emit('hidden')">
      <div class="ActionSheet-content" v-show="shown">
        <div class="ActionSheet-header" v-if="showHeader">
          <h6 v-if="title">{{ title }}</h6>
          <p v-if="description">{{ description }}</p>
        </div>
        <div class="ActionSheet-body" v-if="items.length">
          <ul>
            <li v-for="(item, idx) in items" :key="idx" @click="itemClicked(item)">{{ item.text }}</li>
          </ul>
        </div>
        <div class="ActionSheet-footer" v-if="cancelOption.cancelable">
          <button type="button" @click="cancelClicked()">{{ cancelOption.text }}</button>
        </div>
      </div>
    </transition>
    <transition name="muu-action-sheet-fade">
      <div class="ActionSheet-mask" v-show="shown" @click="maskClicked()"></div>
    </transition>
  </div>
</template>

<script>
  import { isBoolean, isArray, mixin, map } from "../../utils/common/helper";
  import { resolveAction } from '../../utils/action/helper';

  export default {
    name: "ActionSheet",
    props: {
      title: String,
      description: String,
      actions: Array,
      cancelable: {
        type: [Boolean, Object],
        default: true
      },
      show: Boolean
    },
    data() {
      return {
        shown: false
      }
    },
    computed: {
      showHeader() {
        return this.title || this.description;
      },
      items() {
        return isArray(this.actions) ? map(this.actions, ( action, idx ) => resolveAction(idx, action)) : [];
      },
      cancelOption() {
        let opts = this.cancelable;

        if ( isBoolean(opts) ) {
          opts = {cancelable: opts};
        }

        return mixin({cancelable: true, mask: true, text: '取消'}, opts);
      }
    },
    methods: {
      showItems() {
        this.shown = true;
      },
      hideItems() {
        this.shown = false;
      },
      emitEvent( ...args ) {
        this.$emit(...args);
        this.hideItems();
      },
      maskClicked() {
        this.cancelOption.cancelable === true && this.cancelOption.mask === true && this.hideItems();
      },
      itemClicked( item ) {
        this.emitEvent("trigger", item);
      },
      cancelClicked() {
        this.emitEvent("cancel");
      }
    },
    watch: {
      show: {
        handler( val ) {
          this.shown = val;
        },
        immediate: true
      }
    }
  }
</script>
