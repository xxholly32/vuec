import Vue from 'vue';

import Vuec from './';
// Tell Vue.js to use vue-highlightjs
Vue.use(Vuec);

export const createVue = function(comp) {
  return new Vue(comp);
};
