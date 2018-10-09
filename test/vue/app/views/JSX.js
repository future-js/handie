import Vue from "vue";
import { Box, List, ListItem } from "../../../../src/vue/components/mobile";

export default Vue.component("JSX", {
  components: {
    Box, List, ListItem
  },
  render() {
    return (
      <Box>
        <List>
          <ListItem>Vue in JSX</ListItem>
        </List>
      </Box>
    );
  }
});
