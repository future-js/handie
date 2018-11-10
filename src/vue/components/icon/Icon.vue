<template>
  <svg :class="classNames" :color="iconColor">
    <use :xlink:href="linkHref" />
  </svg>
</template>

<script>
  import { includes } from "../../utils/common/helper";
  import loadSprite from "./helper";
  import icons from "./icons";

  export default {
    name: "Icon",
    props: {
      type: String,
      size: String,
      color: String
    },
    computed: {
      linkHref() {
        return `#${this.type}`;
      },
      classNames() {
        const cls = {"Icon": true};

        let { size } = this;

        if ( !includes(size, ["xxs", "xs", "sm", "md", "lg"]) ) {
          size = "md";
        }

        cls[`Icon--${this.type}`] = true;
        cls[`Icon--${size}`] = true;

        return cls;
      },
      iconColor() {
        return this.color || "inherit";
      }
    },
    mounted() {
      loadSprite(icons);
    }
  }
</script>
