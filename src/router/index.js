import { createRouter, createWebHashHistory } from "vue-router";
// import HomeView from '../views/HomeView.vue';
import AuthView from "../views/AuthView.vue";
import LoginForm from "../components/LoginForm.vue";
import RegisterForm from "../components/RegisterForm.vue";
import store from "@/store";
// import Vue from 'vue';
const routes = [
  {
    path: "",
    redirect: "/main/quiz-list",
  },
  {
    path: "/auth",
    name: "auth",
    component: AuthView,
    children: [
      {
        path: "login",
        name: "auth.login",
        component: LoginForm,
        meta: { transitionName: "slide-left" },
      },
      {
        path: "register",
        name: "auth.register",
        component: RegisterForm,
        meta: { transitionName: "slide-right" },
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/main",
    name: "main",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MainView.vue"),
    children: [
      {
        path: "take-quiz",
        name: "main.takelist",
        component: () => {
         return import("../views/TakeQuizView.vue");
        },
      },
      {
        path: "quiz-list",
        name: "main.quizlist",
        component: () => {
         return import("../views/QuizListView.vue");
        },
      },
      {
        path: "dashboard",
        name: "main.dashboard",
        component: () => {
         return import("../views/DashBoardView.vue");
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// let toast = new Vue();
router.beforeEach(async (to) => {
  if (
    // make sure the user is authenticated
    !store.state.auth.token &&
    //Avoid an infinite redirect
    to.name !== "auth.login" &&
    to.name !== "auth.register"
  ) {
    // redirect the user to the login page
    return { name: "auth.login" };
  }
});

export default router;
