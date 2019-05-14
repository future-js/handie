<template>
  <div class="List-item ListItem" :class="{'is-multiline': multiline}">
    <div class="ListItem-content"><slot></slot></div>
    <div class="ListItem-extra" v-if="renderExtra">
      <slot name="extra" v-if="hasExtra"></slot>
      <template v-else>
        <span v-if="extra">{{ extra }}</span>
        <router-link :to="link" v-if="link"><Icon type="right" size="xxs" /></router-link>
        <a :href="url" v-else-if="url"><Icon type="right" size="xxs" /></a>
      </template>
    </div>
  </div>
</template>

<script>
  import slot from "../../mixins/slot";
  import { Icon } from "../icon";

  export default {
    name: "ListItem",
    components: {
      Icon
    },
    mixins: [slot],
    props: {
      extra: {
        type: String,
        default: ""
      },
      url: {
        type: String,
        default: ""
      },
      link: [String, Object],
      multiline: Boolean
    },
    computed: {
      renderExtra() {
        return this.hasExtra || this.extra || this.link || this.url;
      }
    }
  }
</script>
