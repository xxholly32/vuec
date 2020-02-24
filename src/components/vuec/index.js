import Vuec from './components/playground';

Vuec.config = function(opts) {
  Vuec.props.options.default = () => opts;
};

function install(Vue, opts) {
  Vuec.config(opts);
  Vue.component(Vuec.name, Vuec);
}

Vuec.install = install;

if (typeof Vue !== 'undefined') {
  Vue.use(install); // eslint-disable-line
}

export default Vuec;
