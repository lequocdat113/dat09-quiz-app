<template>
  <div class="flex flex-wrap md:pr-5 md:pl-5">
    <template v-if="items?.length !== 0">
      <div v-for="item in items" :key="item._id" class="col-12 md:col-6">
        <div
          class="text-left p-4 text-white border-round-2xl cursor-pointer quiz-box"
          :style="{ 'background-color': item.color }"
          @click="takeQuiz(item)"
        >
          <h3 class="mt-0">{{ item.name }}</h3>
          <p class="mb-0 h-2rem description">
            {{ item.description }}
          </p>
        </div>
      </div>
    </template>
    <template v-else> <h3 class="col-12">No quiz found! :(</h3> </template>
  </div>
</template>
<script>
export default {
  name: "QuizList",
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  methods:{
    takeQuiz:function(item){
        this.$store.dispatch('takequiz/choosenQuiz',{payload:item})
        // this.$router.push(`/main/take-quiz`)
    }
  }
};
</script>
<style>
.quiz-box .description {
  width: 100%;
  height: 100px;
  line-height: 1rem;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -ms-box-orient: vertical;
  box-orient: vertical;
  -webkit-line-clamp: 2;
  -moz-line-clamp: 2;
  -ms-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}
.quiz-box {
  transition: all 500ms;
}
.quiz-box:hover {
  transform: scale(1.05);
  transition: all 500ms;
}
.p-paginator {
  background: rgba(255, 255, 255, 0.6);
}
</style>
