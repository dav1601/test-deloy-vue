import Vue from "vue";
import router from "./router";
import store from "./store/index";
import App from "./App.vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "bootstrap";
import container from "./components/layout/DavContainer.vue";
import Api from "./api/Api";
import BaseCard from "@/components/ui/BaseCard";
import BaseBadge from "@/components/ui/BaseBadge";
import BaseButton from "@/components/ui/BaseButton";
import BaseSpinner from "@/components/ui/BaseSpinner";
import BaseDialog from "@/components/ui/BaseDialog";
const vuetifyOptions = {};
Vue.use(Vuetify);
Vue.use(Api);
Vue.component("dav-container", container);
Vue.component("base-card", BaseCard);
Vue.component("base-badge", BaseBadge);
Vue.component("base-button", BaseButton);
Vue.component("base-spinner", BaseSpinner);
Vue.component("base-dialog", BaseDialog);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  Api,
  vuetify: new Vuetify(vuetifyOptions),
  render: (h) => h(App),
}).$mount("#app");
