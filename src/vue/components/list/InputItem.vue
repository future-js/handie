<template>
  <div class="List-item InputItem">
    <label class="InputItem-label"><slot></slot></label>
    <div class="InputItem-control"><input
      :type="resolvedType"
      :placeholder="placeholder"
      :name="name"
      :value="value"
      @input="emitEvent"
      @change="emitEvent"></div>
  </div>
</template>

<script>
  export default {
    name: "InputItem",
    props: {
      type: String,
      value: {
        type: String,
        default: ""
      },
      name: {
        type: String,
        default: ""
      },
      placeholder: {
        type: String,
        default: ""
      }
    },
    computed: {
      resolvedType() {
        return this.type || "text";
      }
    },
    methods: {
      emitEvent( evt ) {
        this.$emit(evt.type, evt, evt.target.value);
      }
    }
  }
</script>
