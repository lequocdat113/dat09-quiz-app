<template>
  <div class="auth_screen grid m-0 justify-content-center align-items-center">
    <router-view v-slot="{ Component }">
      <transition :name="'slide-fade'" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: "AuthView",
  data: () => {
    return {
      username: "",
      password: "",
    };
  },
  methods: {},
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans:600|Work+Sans:400,500,600,700&display=swap");

.auth_screen {
  height: 100%;
}
</style>
