<script>
  import { Flex } from "../flex";

  export default {
    name: "Grid",
    components: {
      Flex
    },
    props: {
      cols: {
        type: Number,
        default: 3
      },
      count: {
        type: Number,
        default: 0
      }
    },
    methods: {
      resolveGroups( $slots, createElement ) {
        const groups = [];
        
        let rows = 0;

        $slots.filter(vn => !!vn.tag).forEach((vn, i) => {
          if ( i % this.cols === 0 ) {
            rows++;

            if ( !groups[rows - 1] ) {
              groups[rows - 1] = [];
            }
          }

          groups[rows - 1].push(vn);
        });

        return groups.map(vns => createElement("Flex", {"class": {"ImageList-group": true}}, vns));
      }
    },
    render( createElement ) {
      return createElement("div", {"class": {"Grid": true}}, this.resolveGroups(this.$slots.default, createElement));
    }
  }
</script>
