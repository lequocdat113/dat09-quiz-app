<template>
  <div class="flex flex-column dialog-min">
    <div class="row">
      <b>Name:</b> {{ quizInfo.name }} <br /><br />
      <b>Description:</b> {{ quizInfo.description }} <br /><br />
      <b>Questions:</b> {{ quizInfo.numberOfQuestion }} <br /><br />
      <b>Duration:</b> {{ quizTime }} <br /><br />
    </div>
    <div class="flex justify-content-evenly">
      <PrimeButton
        label="Start"
        class="p-button-raised p-button-success w-full p-button-lg font-bold"
        @click="closeDialog('start')"
      ></PrimeButton>
      <PrimeButton
        label="Cancel"
        class="p-button-raised p-button-danger w-full p-button-lg font-bold"
        @click="closeDialog('goback')"
      ></PrimeButton>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuizInfoDialog",
  inject: ["dialogRef"],
  data: () => {
    return {
      quizInfo: {},
    };
  },
  computed: {
    quizTime() {
      return (
        (this.quizInfo?.numberOfQuestion * this.quizInfo?.timePerQuestion)
          .toString()
          ?.toHHMMSS() || null
      );
    },
  },
  mounted() {
    this.quizInfo = this.dialogRef.data;
  },
  methods: {
    closeDialog(event) {
      this.dialogRef.close(event);
    },
  },
};
</script>

<style lang="css" scoped>
.dialog-min {
  min-width: 300px;

  max-width: 436px;
}
</style>
