import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import Vuec from "../packages/index";
// import Vuec from "../packages/dist/vuec.umd";
import "../packages/dist/vuec.css";

import HelloWorld from "@/components/HelloWorld.vue";

Vue.config.productionTip = false;
Vue.use(ElementUI, {
  size: "small"
});

Vue.use(Vuec);
Vue.component("HelloWorld", HelloWorld);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
