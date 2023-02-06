<template>
  <div class="text-left md:p-5">
    <div class="border-round bg-white p-3 md:p-5">
      <div class="row font-bold">
        <h3 class="col-12 m-0">{{ index + 1 }}.&nbsp; {{ data.question }}</h3>
      </div>
      <div class="row m-0">
        <div
          v-for="answer in data?.answers"
          :key="answer"
          class="col-12 cursor-pointer border-2 border-round mb-1"
          :class="[color(answer)]"
          @click="chooseAnswer(answer)"
        >
          {{ answer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionComponent",
  props: {
    data: {
      type: Object,
      required: false,
      default: () => {},
    },
    index: {
      type: Number,
      required: false,
      default: () => 0,
    },
  },
  computed: {
    color() {
      return function (answer) {
        if (this.data.answer&&this.data.answer===answer) {
          return 'border-green-500';
        }
        if(this.data.userAnswer&& this.data.userAnswer===answer){
          return 'border-blue-500';
        }
        return 'border-gray-200'
      };
    },
  },
  methods: {
    chooseAnswer(answer) {
      this.$store.dispatch("takequiz/chooseAnswer", {
        payload: {
          answer,
          index: this.index,
        },
      });
    },
  },
};
</script>

<style lang="css" scoped></style>
