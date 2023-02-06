import { createStore } from "vuex";
import auth from './modules/auth';
import topic from './modules/topic';
import quiz from './modules/quiz';
import takequiz from './modules/takequiz';
export default createStore({
  modules: {
    auth,
    topic,
    quiz,
    takequiz
  },
});
