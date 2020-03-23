import Vuem from "./components/playground";

Vuem.config = function(opts) {
  Vuem.props.options.default = () => opts;
};

function install(Vue, opts) {
  Vuem.config(opts);
  Vue.component(Vuem.name, Vuem);
}

Vuem.install = install;

if (typeof Vue !== "undefined") {
  Vue.use(install); // eslint-disable-line
}

export default Vuem;
