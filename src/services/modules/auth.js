import http from "../axios";

export default {
  register(registerInfo) {
    return http({
      requiresAuth: false,
      successMess: "Register successfully, please login!",
    }).post("auth/register", registerInfo);
  },
  login(loginInfo) {
    return http({
      requiresAuth: false,
      successMess: "Login successfully, enjoy your ride!",
    }).post("auth/login", loginInfo);
  },
  logout() {
    return http({ requiresAuth: false }).get("auth/loout");
  },
  test() {
    return http({ requiresAuth: false }).get("test-connection");
  },
};
