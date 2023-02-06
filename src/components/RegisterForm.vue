<template>
  <div
    class="register_form_container col-11 md:col-6 lg:col-4 xl:col-3 border-round-xl flex justify-content-center align-items-center"
  >
    <div class="col-11">
      <form class="p-fluid" @submit.prevent="handleSubmit(!v$.$invalid)">
        <h1 class="m-0 text-green-800 text-2xl lg:text-3xl">
          Let them know who you are!
        </h1>
        <div class="mt-5 text-left">
          <div class="field">
            <div class="p-float-label">
              <PrimeInputText
                id="fullname"
                v-model="v$.fullName.$model"
                class="p-inputtext w-full"
                :class="{ 'p-invalid': v$.fullName.$invalid && submitted }"
              />
              <label for="fullname">Full Name (*)</label>
            </div>
            <small
              v-if="
                (v$.fullName.$invalid && submitted) ||
                v$.fullName.$pending.$response
              "
              class="p-error"
              >{{
                v$.fullName.required.$message.replace("Value", "FullName")
              }}</small
            >
          </div>
          <div class="field">
            <div class="p-float-label">
              <PrimeInputText
                id="new-username"
                v-model="v$.username.$model"
                class="p-inputtext w-full"
                :class="{ 'p-invalid': v$.username.$invalid && submitted }"
              />
              <label for="new-username">Username (*)</label>
            </div>
          </div>
          <div class="field">
            <div class="p-float-label p-input-icon-right">
              <i class="pi pi-envelope" />
              <PrimeInputText
                id="email"
                v-model="v$.email.$model"
                :class="{ 'p-invalid': v$.email.$invalid && submitted }"
                aria-describedby="email-error"
              />
              <label
                for="email"
                :class="{ 'p-error': v$.email.$invalid && submitted }"
                >Email (*)</label
              >
            </div>
            <span v-if="v$.email.$error && submitted">
              <span
                v-for="(error, index) of v$.email.$errors"
                id="email-error"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small
              v-else-if="
                (v$.email.$invalid && submitted) || v$.email.$pending.$response
              "
              class="p-error"
              >{{ v$.email.required.$message.replace("Value", "Email") }}</small
            >
          </div>
          <div class="field">
            <div class="p-float-label">
              <PrimePassword
                id="new-password"
                v-model="v$.password.$model"
                :class="{ 'p-invalid': v$.password.$invalid && submitted }"
                toggle-mask
              >
                <template #header>
                  <h6>Pick a password</h6>
                </template>
                <template #footer="sp">
                  {{ sp.level }}
                  <Divider />
                  <p class="mt-2">Suggestions</p>
                  <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                    <li>At least one lowercase</li>
                    <li>At least one uppercase</li>
                    <li>At least one numeric</li>
                    <li>Minimum 8 characters</li>
                  </ul>
                </template>
              </PrimePassword>
              <label
                for="new-password"
                :class="{ 'p-error': v$.password.$invalid && submitted }"
                >Password (*)</label
              >
            </div>
            <small
              v-if="
                (v$.password.$invalid && submitted) ||
                v$.password.$pending.$response
              "
              class="p-error"
              >{{
                v$.password.required.$message.replace("Value", "Password")
              }}</small
            >
          </div>
          <div class="field">
            <div class="p-float-label">
              <PrimePassword
                id="confirmpass"
                v-model="v$.confirmPassword.$model"
                class="w-full"
                :class="{
                  'p-invalid': v$.confirmPassword.$invalid && submitted,
                }"
                placeholder="Confirm password"
              />
              <label for="confirmpass">Confirm password (*)</label>
            </div>
            <span v-if="v$.confirmPassword.$error && submitted">
              <span
                v-for="(error, index) of v$.confirmPassword.$errors"
                id="email-error"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small
              v-else-if="
                (v$.confirmPassword.$invalid && submitted) ||
                v$.confirmPassword.$pending.$response
              "
              class="p-error"
              >{{
                v$.confirmPassword.required.$message.replace(
                  "Value",
                  "Confirm Password"
                )
              }}</small
            >
          </div>
        </div>
        <PrimeButton
          label="Fight!"
          type="submit"
          class="p-button-raised p-button-success w-full p-button-lg font-bold"
        />
      </form>
      <div class="mt-5">
        Done? Let's <router-link to="/auth/login">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs, email, helpers } from "@vuelidate/validators";
export default {
  name: "RegisterForm",
  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => {
    return {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      submitted: false,
    };
  },
  validations() {
    return {
      fullName: { required },
      username: { required },
      email: { required, email },
      password: { required },
      confirmPassword: {
        required,
        sameAs: helpers.withMessage(
          "Confirm password must match Password",
          sameAs(this.password)
        ),
      },
    };
  },
  methods: {
    handleSubmit: function (isValid) {
      this.submitted = true;
      // console.log(isValid);
      if (isValid) {
        console.log("submit");
        console.log({ ...this.$data, name: this.fullName });
        this.$store.dispatch("auth/register", {
          payload: { ...this.$data, name: this.fullName },
        });
      }
    },
  },
};
</script>

<style scoped>
.register_form_container {
  height: 600px;
  background-color: white;
}
.field {
  margin-bottom: 25px;
}
</style>
