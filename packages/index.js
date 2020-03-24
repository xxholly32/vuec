import Vuem from "./vuem/components/playground";
import Vuec from "./vuec/components/playground";

export function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component(Vuec.name, Vuec);
  Vue.component(Vuem.name, Vuem);
}

const plugin = {
  install
};

if (typeof Vue !== "undefined") {
  Vue.use(install); // eslint-disable-line
}
// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default install;
