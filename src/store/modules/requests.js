import Api from "../../api/Api";
const state = () => {
  return {
    requests: [],
  };
};
const getters = {
  getRequests(s) {
    return s.requests;
  },
  hasRequest(s, getters) {
    return getters.getRequests && getters.getRequests.length > 0;
  },
};
const mutations = {
  setRequests(s, p) {
    return (s.requests = p);
  },
};
const actions = {
  contactCoach(context, d) {
    const data = {
      coachId: d.coachId,
      userEmail: d.email,
      userMessage: d.message,
    };
    return new Promise((resolve, reject) => {
      Api.post(`requests/${d.coachId}.json`, JSON.stringify(data))
        .then((req) => {
          console.log(req);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    return new Promise((rs, rj) => {
      Api.getNoParams(`requests/${coachId}.json`)
        .then((req) => {
          const requests = [];
          for (const key in req.data) {
            const data = {
              id: key,
              coachId: req.data[key].coachId,
              userEmail: req.data[key].userEmail,
              userMessage: req.data[key].userMessage,
            };
            requests.push(data);
          }
          context.commit("setRequests", requests);
        })
        .catch((err) => {
          rj(err);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
