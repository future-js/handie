<script>
  export default {
    name: "Group",
    props: {
      size: {
        type: Number,
        default: 3
      },
      className: {
        type: String
      }
    },
    methods: {
      resolveProps() {
        if ( !this.className ) {
          return;
        }

        const props = {class: {}};

        props.class[this.className] = true;

        return props;
      },
      resolveGroups( $slots, createElement ) {
        const props = this.resolveProps();
        const groups = [];
        
        let count = 0;

        $slots.filter(vn => !!vn.tag).forEach((vn, i) => {
          if ( i % this.size === 0 ) {
            count++;

            if ( !groups[count - 1] ) {
              groups[count - 1] = [];
            }
          }

          groups[count - 1].push(vn);
        });

        return groups.map(vns => createElement("div", props, vns));
      }
    },
    render( createElement ) {
      return createElement("div", this.resolveGroups(this.$slots.default, createElement));
    }
  }
</script>
