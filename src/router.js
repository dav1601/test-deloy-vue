import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "@/pages/errors/NotFound.vue";
import CoachDetail from "@/pages/coaches/CoachDetail";
import CoachesList from "@/pages/coaches/CoachesList";
import CoachRegistation from "@/pages/coaches/CoachRegistation";
import ContactCoach from "@/pages/requests/ContactCoach";
import RequestsReceived from "@/pages/requests/RequestsReceived";
import UserAuth from "@/pages/auth/UserAuth";
import store from "./store/index";
// import store from "./store/index";
// import store from "./store/index";
Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      component: CoachesList,
    },
    {
      path: "/coaches",
      name: "coaches",
      component: CoachesList,
    },
    {
      path: "/coaches/:id",
      name: "coach",
      component: CoachDetail,
      props: true,
      children: [
        {
          path: "contact",
          props: true,
          name: "coach.contact",
          component: ContactCoach,
        },
      ],
    },
    {
      path: "/register",
      name: "register",
      component: CoachRegistation,
      meta: { requiresAuth: true },
    },
    {
      path: "/request",
      name: "request",
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    {
      path: "/auth",
      name: "auth",
      component: UserAuth,
      meta: { requiresUnauth: true },
    },
    {
      path: "/:notFound(.*)",
      name: "404",
      component: NotFound,
    },
  ],
});
store.dispatch("auth/tryLogin");
router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters["auth/isAuthenticated"]) {
    next("/auth");
  } else to.meta.requiresUnauth && store.getters["auth/isAuthenticated"] ? next("/coaches") : next();
});
export default router;
