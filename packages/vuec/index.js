import Vuec from "./components/playground";
import VuepPreview from "./components/vuep/preview";
import VuecPreview from "./components/preview";

Vuec.config = function(opts) {
  Vuec.props.options.default = () => opts;
};

function install(Vue, opts) {
  Vuec.config(opts);
  Vue.component(Vuec.name, Vuec);
  Vue.component(VuepPreview.name, VuepPreview);
  Vue.component(VuecPreview.name, VuecPreview);
}

Vuec.install = install;

if (typeof Vue !== "undefined") {
  Vue.use(install); // eslint-disable-line
}

export default Vuec;
