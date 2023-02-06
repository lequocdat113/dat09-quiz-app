// import app from "@/main";
import quizService from "@/services/modules/quiz";
export default {
  namespaced: true,
  state: {
    quizList: {},
  },
  getters: {
    quizList: (state) => {
      return (state.quizList?.data || []).map((quiz) => {
        return {
          ...quiz,
          color: getRandomColor(),
        };
      });
    },
    page: (state) => {
      return state.quizList?.page || 0;
    },
    totalItems: (state) => {
      return state.quizList?.totalItems;
    },
  },
  mutations: {
    getList: (state, { data }) => {
      state.quizList = data;
    },
  },
  actions: {
    getList: async (context, { payload }) => {
      console.log(payload);
      try {
        const res = await quizService.getListQuizByCondition(payload);
        if (res) {
          context.commit("getList", { data: res });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 8)];
  }
  return color;
}
