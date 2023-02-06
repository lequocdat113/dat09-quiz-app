import app from "@/main";
import authService from "@/services/modules/auth";
export default {
  namespaced: true,
  state: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    token: localStorage.getItem("at", null),
    username: null,
  },
  getters: {
    token: (state) => {
      return state.token;
    },
    userInfo: (state) => {
      return state.user;
    },
  },
  mutations: {
    login: (state, { user, token }) => {
      console.log(token);
      state.token = token;
      state.user = user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  actions: {
    register: async (context, { payload }) => {
      try {
        console.log(payload);
        const res = await authService.register(payload);
        if (res) {
          console.log(res);
        }
        app.$router.push("/auth/login");
      } catch (error) {
        console.log(error);
      }
    },
    login: async (context, { payload }) => {
      try {
        console.log(payload);
        const res = await authService.login(payload);
        const { access_token, ...user } = res;
        localStorage.setItem("at", access_token);
        localStorage.setItem("user", JSON.stringify(user));
        context.commit("login", { user, token: access_token });
        app.$router.push("/main/quiz-list");
      } catch (error) {
        console.log(error);
      }
    },
    logout: (context) => {
      context.commit("logout");
    },
    test: () => {
      authService.test();
      //   context.commit("logout");
    },
  },
};
