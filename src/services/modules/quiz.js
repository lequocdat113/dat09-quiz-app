import http from "../axios";

export default {
  test() {
    return http({ requiresAuth: false }).get("test-connection");
  },
  getListQuizByCondition(params) {
    return http({
      requiresAuth: false,
      noMess: true,
    }).get("quiz",{params});
  },
};
// function mockdata(data) {
//   return new Promise((res, rej) => {
//     if (data) {
//       res(data);
//     } else {
//       rej(null);
//     }
//   });
// }
