import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import ElementUI from 'element-ui';
import Vuep from './components/vuep';

import 'element-ui/lib/theme-chalk/index.css';
import 'vuep/dist/vuep.css';

Vue.config.productionTip = false;
// Vue.use(ElementUI, {
//   size: 'small',
// });
// Tell Vue.js to use vue-highlightjs
Vue.use(Vuep);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
