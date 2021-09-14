import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import {
  faCog,
  faUsers,
  faImages,
  faUser,
  faQuoteRight,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
dom.watch();
library.add(faCog, faUsers, faUser, faImages, faQuoteRight, faSignOutAlt);

import "./assets/css/global.css";

createApp(App)
  .use(router)

  .mount("#app");
