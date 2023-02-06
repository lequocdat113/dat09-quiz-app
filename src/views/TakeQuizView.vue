<template>
  <div class="bg-white-alpha-40 grid relative">
    <div
      class="col-12 md:col-8 overflow-auto"
      style="height: calc(100vh - 120px)"
    >
      <div v-for="(question,index) in listQuestion" :key="question.answer">
        <!-- <div style="height: 500px">{{ question.question }};</div> -->
        <QuestionComponent :data="question" :index="index"></QuestionComponent>
      </div>
    </div>
    <div class="col-12 md:col-4">
      <h1>{{ remainingTime }}</h1>
      <h2>Answered/Total</h2>
      <h2>{{ answeredQuestion }}/{{ totalQuestion }}</h2>
      <PrimeButton :label="'Submit'" class="btn" @click="finishQuiz()"/>
    </div>
  </div>
</template>
<script>
import QuizInfoDialog from "@/components/dialogs/QuizInfoDialog.vue";
import QuestionComponent from "@/components/QuestionComponent.vue";
import { mapGetters } from "vuex";
export default {
  name: "TakeQuizView",
  components: {
    QuestionComponent,
  },
  data() {
    return {
      timerCount: 0,
    };
  },
  computed: {
    remainingTime() {
      return this.timerCount.toString().toHHMMSS();
    },
    ...mapGetters({
      listQuestion: "takequiz/questionList",
      totalQuestion: "takequiz/totalQuestion",
      answeredQuestion: "takequiz/answeredQuestion",
      quizInfo:"takequiz/currentQuizInfo"
    }),
  },

  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        } else {
          this.finishQuiz();
        }
      },
      immediate: false, // This ensures the watcher is triggered upon creation
    },
  },
  mounted: function () {
    // this.startQuiz();
    if(this.quizInfo?._id){
      this.showQuizInfo();
    }else{
      this.goBack();
    }
  },
  methods: {
    startQuiz() {
      this.$store.dispatch("takequiz/getList", { payload: {quizId:this.quizInfo?._id} });
      this.timerCount = this.quizInfo?.numberOfQuestion * this.quizInfo?.timePerQuestion;
    },
    finishQuiz() {
      this.$store.dispatch("takequiz/finishQuiz");
      // alert('Timeout! Game over!');
    },
    goBack() {
      this.$router.back()
    },
    showQuizInfo() {
      this.$dialog.open(QuizInfoDialog, {
        props: {
          header: "Quiz Info",
          modal: true,
          // dismissableMask: true,
          closable: false,
        },
        data: this.quizInfo,
        onClose: (options) => {
          console.log(options.data);
          if (options.data === "start") {
            this.startQuiz();
          } else {
            this.goBack();
          }
        },
      });
    },
  },
};
</script>
