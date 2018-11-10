export default {
  computed: {
    hasDefault() {
      return this.hasSlot();
    },
    hasHeader() {
      return this.hasSlot("header");
    },
    hasFooter() {
      return this.hasSlot("footer");
    },
    hasExtra() {
      return this.hasSlot("extra");
    }
  },
  methods: {
    hasSlot( slot = "default" ) {
      return !!this.$slots[slot];
    }
  }
}
