<template>
  <div
    class="login_form_container col-11 md:col-6 lg:col-4 xl:col-3 border-round-xl flex justify-content-center align-items-center"
  >
    <div class="col-11">
      <h1 class="m-0 text-green-800 text-6xl">Welcome!</h1>
      <div>
        <small class="text-red-500">{{ errorMessage }}</small>
        <PrimeInputText
          v-model="username"
          type="text"
          class="p-inputtext-lg w-full mt-5"
          placeholder="Username or email"
        />
        <PrimePassword
          v-model="password"
          :feedback="false"
          placeholder="Password"
          class="p-inputtext-lg mt-2"
        ></PrimePassword>
        <PrimeButton
          label="Login"
          class="p-button-raised p-button-success w-full p-button-lg font-bold mt-5"
          @click="login()"
        />
        <div class="mt-5">
          Don't have an account?
          <router-link to="/auth/register">Register</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data: () => {
    return {
      password: "",
      username: "",
      error:false,
      errorMessage:'',
    };
  },
  methods: {
    login: function () {
      if (this.password && this.username) {
        this.error=false;
        this.errorMessage = '';
        this.$store.dispatch("auth/login", {
          payload: {
            username: this.username,
            password: this.password,
          },
        });
      }else{
        this.error = true;
        this.errorMessage = 'Please enter full login information!'
      }
    },
  },
};
</script>

<style scoped>
.login_form_container {
  height: 500px;
  background-color: white;
}
</style>
