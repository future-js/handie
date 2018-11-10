<template>
  <button
    class="Button"
    :class="classNames"
    :type="action"
    :disabled="disabled"
    @click="$emit('click')"><Icon :type="iconOption.type" v-if="prependIcon" /><span><slot></slot></span><Icon :type="iconOption.type" v-if="appendIcon" /></button>
</template>

<script>
  import { isString, mixin } from "../../utils/common/helper";
  import { Icon } from "../icon";

  export default {
    name: "XButton",
    components: {
      Icon
    },
    props: {
      type: {
        type: String,
        default: "default"
      },
      action: {
        type: String,
        default: "button"
      },
      icon: {
        type: [String, Object],
        default: ""
      },
      disabled: Boolean,
      inline: Boolean,
      dummy: Boolean
    },
    computed: {
      classNames() {
        const resolved = {
            "Button--inline": this.inline
          };

        resolved[`Button--${this.type}`] = !this.dummy;

        return resolved;
      },
      iconOption() {
        let opts = this.icon;

        if ( isString(opts) ) {
          opts = {type: opts};
        }

        return mixin({type: "", size: true, append: false}, opts);
      },
      showIcon() {
        return this.iconOption.type !== "";
      },
      prependIcon() {
        return this.showIcon && this.iconOption.append !== true;
      },
      appendIcon() {
        return this.showIcon && this.iconOption.append === true;
      }
    }
  }
</script>
