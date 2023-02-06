<template>
  <h1 class="m-0 text-green-800 select-none">Find your Quiz</h1>
  <div class="flex flex-wrap justify-content-center">
    <div class="col-12 md:col-2">
      <PrimeDropdown
        v-model="selectedTopic"
        option-label="label"
        option-value="value"
        :options="topics"
        placeholder="Select a Topic"
        @change="search()"
      />
    </div>
    <div class="col-12 md:col-6">
      <div class="p-inputgroup">
        <PrimeInputText
          v-model="keyword"
          class="outline-none"
          placeholder="Find your favorite quiz!"
          @keyup.enter="search()"
        />
        <PrimeButton
          icon="pi pi-search"
          class="p-button-success bg-green-800"
          @click="search()"
        />
        <PrimeButton
          icon="pi pi-refresh"
          class="p-button-success bg-red-800"
          @click="resetFilter()"
        />
      </div>
    </div>
    <div class="col-12 md:pr-5 md:pl-5">
      <QuizList :items="listQuiz" />
    </div>
    <div v-if="listQuiz?.length > 0" class="col-12 justify-content-center">
      <PrimePaginator
        v-model:first="first"
        :rows="10"
        :total-records="totalItems"
        @page="search($event)"
      ></PrimePaginator>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import QuizList from "./../components/QuizList.vue";
export default {
  name: "QuizListView",
  components: { QuizList },
  data: () => {
    return {
      selectedTopic: null,
      keyword: null,
      first: 0,
    };
  },
  computed: {
    ...mapGetters({
      topics: "topic/topics",
      listQuiz: "quiz/quizList",
      page: "quiz/page",
      totalItems: "quiz/totalItems",
    }),
  },
  mounted() {
    this.getListTopic();
    this.search();
  },
  methods: {
    search: function (event) {
      if(!event){
        this.first=0;
      }
      this.$store.dispatch("quiz/getList", {
        payload: {
          topicId: this.selectedTopic,
          keyword: this.keyword,
          page: event?.page + 1 || 1,
          pageSize: 10,
        },
      });
    },
    getListTopic: function () {
      this.$store.dispatch("topic/getList");
    },
    resetPage() {
      this.first = 0;
      this.search();
    },
    resetFilter() {
      this.selectedTopic = null;
      this.keyword = null;
      this.resetPage();
    },
  },
};
</script>

<style scoped></style>
