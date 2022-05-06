import Vue from "vue";
import Vuex from "vuex";
import coaches from "./modules/coaches";
import auth from "./modules/auth";
import requests from "./modules/requests";
Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    coaches,
    requests,
    auth,
  },
});
export default store;
