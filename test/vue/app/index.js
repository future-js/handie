import { createApp } from "../../../src/vue/utils/initializer";
import router from "./routes";

import "./stylesheets/index"

createApp({
  settings: {
    theme: {color: '#00bcd4'},
    flexible: {font: 100, draft: 750}
  },
  router
});
