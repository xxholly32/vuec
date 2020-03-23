import Vuem from "./vuem/components/playground";
import Vuec from "./vuec/components/playground";

function install(Vue, opts) {
  Vuem.config(opts);
  Vue.component(Vuec.name, Vuec);
  Vue.component(Vuem.name, Vuem);
}

if (typeof Vue !== "undefined") {
  Vue.use(install); // eslint-disable-line
}

export default {
  Vuec,
  Vuem
};
