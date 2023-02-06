import app from "@/main";
import takeQuizService from "@/services/modules/takequiz";
export default {
  namespaced: true,
  state: {
    currentQuizInfo: {},
    questionList: [],
  },
  getters: {
    questionList: (state) => {
      return state.questionList.map((ele) => {
        ele.answer = null;
        return ele;
      });
    },
    totalQuestion: (state) => {
      return state.questionList?.length;
    },
    answeredQuestion: (state) => {
      return state.questionList?.filter((ele) => !!ele.userAnswer)?.length;
    },
    currentQuizInfo:(state)=>{
      return state.currentQuizInfo
    }
  },
  mutations: {
    getList: (state, { data }) => {
      state.questionList = data;
    },
    chooseAnswer: (state, { data }) => {
      state.questionList[data.index].userAnswer = data.answer;
      console.log(state.questionList[data.index]);
    },
    choosenQuiz: (state, { data }) => {
      state.currentQuizInfo = data;
      app.$router.push('/main/take-quiz')
    },
  },
  actions: {
    chooseAnswer: (context, { payload }) => {
      context.commit("chooseAnswer", { data: payload });
    },
    choosenQuiz: (context, { payload }) => {
      context.commit("choosenQuiz", { data: payload });
      
    },
    getList: async (context, { payload }) => {
      try {
        const res = await takeQuizService.getListQuestionByQuiz(payload.quizId);
        if (res) {
          context.commit("getList", { data: res });
        }
      } catch (error) {
        console.log(error);
      }
    },
    finishQuiz:async (context) => {
      console.log("currentQuizInfo",{...context.state.currentQuizInfo});
      console.log("questionList",[...context.state.questionList]);
      // try {
      //   const res = await takeQuizService.getListQuestionByQuiz(payload.quizId);
      //   if (res) {
      //     context.commit("getList", { data: res });
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
    },
  },
};
