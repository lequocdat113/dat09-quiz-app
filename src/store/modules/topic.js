// import app from "@/main";
import topicService from "@/services/modules/topic";
export default {
  namespaced: true,
  state: {
    topics: [],
  },
  getters: {
    topics: (state) => {
      return (state.topics||[]).map(ele=>{
        return {
            value:ele._id,
            label:ele.name
        }
      });
    },
  },
  mutations: {
    getList: (state, { data }) => {
      state.topics = data;
    },
  },
  actions: {
    getList: async (context) => {
      try {
        const res = await topicService.getListTopic();
        if (res) {
          context.commit("getList", { data:res });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
