import http from "../axios";

export default {
  test() {
    return http({ requiresAuth: false }).get("test-connection");
  },
  getListQuestionByQuiz(quizId) {
    return http({
      requiresAuth: true,
      noMess: true,
    }).get("question/take-quiz/"+quizId);
  },
};
