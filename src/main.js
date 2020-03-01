import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import Vuec from "../packages/vuec";

import HelloWorld from "@/components/HelloWorld.vue";

import "element-ui/lib/theme-chalk/index.css";

import "../packages/vuec/dist/vuec.css";

Vue.config.productionTip = false;
Vue.use(ElementUI, {
  size: "small"
});
// Tell Vue.js to use vue-highlightjs
Vue.use(Vuec);
Vue.component("HelloWorld", HelloWorld);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
