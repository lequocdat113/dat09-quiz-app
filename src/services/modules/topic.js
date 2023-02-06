import http from "../axios";

export default {
  test() {
    return http({ requiresAuth: false }).get("test-connection");
  },
  getListTopic() {
    // return mockdata([
    //     {id:1, name: "topic 1", code: "NY" },
    //     {id:2, name: "topic 2", code: "RM" },
    //     {id:3, name: "topic 3", code: "LDN" },
    //     {id:4, name: "topic 4", code: "IST" },
    //     {id:5, name: "topic 5", code: "PRS" },
    // ])
    return http({
      requiresAuth: false,
      noMess: true,
    }).get("topic");
  },
};
// function mockdata(data){
//     return new Promise((res,rej)=>{
//         if(data){
//             res(data)
//         }else{
//             rej(null)
//         }
//     })
// }
