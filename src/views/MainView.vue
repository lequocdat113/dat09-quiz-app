<template>
  <div class="h-full overflow-hidden flex flex-column">
    <div
      class="navbar flex justify-content-between flex-wrap align-items-center"
    >
      <div class="pl-1 lg:pl-3 flex flex-wrap align-items-center">
        <PrimeButton
          icon="pi pi-bars"
          class="p-button-rounded text-green-800 p-button-success p-button-text"
          @click="isVisibleMenu = true"
        />
        <div
          class="pl-1 lg:pl-3 hidden lg:block text-2xl text-green-800 select-none font-bold"
        >
          Dat09 Quiz
        </div>
      </div>
      <div class="flex flex-1 justify-content-center">
        <!-- <div class="col-12 md:col-6">
          <div class="p-inputgroup">
            <PrimeInputText
              class="outline-none"
              placeholder="Find your favorite quiz!"
            />
            <PrimeButton
              icon="pi pi-search"
              class="p-button-success bg-green-800"
            />
          </div>
        </div> -->
      </div>
      <div class="pr-1">
        <PrimeAvatar
          :label="shortName"
          size="large"
          style="background-color: #4caf4f; color: #ffffff"
        />
      </div>
    </div>
    <div class="main overflow-auto p-3 lg:p-5 flex flex-column">
      <div class=" border-round">
        <RouterView></RouterView>
      </div>
    </div>

    <PrimeSidebar
    v-model:visible="isVisibleMenu"
    class="bg-green-800"
    :show-close-icon="false"
    >
    </PrimeSidebar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MainView",
  components: {},
  data: () => {
    return {
      isVisibleMenu: false,
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "auth/userInfo",
      token: "auth/token",
    }),
    shortName: function () {
      let result = "";
      let splittedName = this.userInfo?.name.split(" ");
      if (splittedName?.length > 1) {
        result = this.userInfo?.name.charAt(0);
      } else {
        splittedName.forEach((ele) => {
          result += ele.charAt(0);
        });
      }
      return result;
    },
  },
};
</script>

<style lang="css">
.navbar {
  height: 56px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.6);
}
.main{
  height: calc(100vh - 56px) !important;
}
</style>
