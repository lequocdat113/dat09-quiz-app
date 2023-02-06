import store from "@/store";
import axios from "axios";
import app from "@/main";
export default ({
  requiresAuth = true,
  noMess = false,
  errMess = "API call not successfully",
  successMess = "API call successfully",
}) => {
  const options = {};
  options.baseURL = "http://localhost:8080/v1";
  console.log("store", store.state.auth.token);
  if (requiresAuth) {
    options.headers={
      Token:"Bearer " + store?.state?.auth?.token
    }
  }
  const instance = axios.create(options);

  instance.interceptors.response.use(
    (response) => {
      if (!noMess) {
        app.$toast.add({
          severity: "success",
          summary: "Success Message",
          detail: successMess,
          life: 3000,
        });
      }
      return response.data;
    },
    (error) => {
      if (!noMess) {
        app.$toast.add({
          severity: "error",
          summary: "Error Message",
          detail: error.response.data||errMess,
          life: 3000,
        });
      }
      return Promise.reject(error);
    }
  );
  return instance;
};
