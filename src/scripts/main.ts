import Vue from "vue";
import VueRouter from "vue-router";

import App from "../components/App.vue";
import Home from "../components/Home.vue";
import ProjectList from "../components/ProjectList.vue";
import About from "../components/About.vue";
import Page404 from "../components/Page404.vue";

import "bootstrap/scss/bootstrap.scss";
import "../style/main.scss";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: Home },
    { path: "/list", component: ProjectList },
    { path: "/about", component: About },
    { path: "*", component: Page404 },
  ],
});

const app = new Vue({
  router: router,
  render: (h) => h(App),
}).$mount("#app");
