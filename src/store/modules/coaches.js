// eslint-disable-next-line no-unused-vars
import Api from "../../api/Api";
const state = () => {
  return {
    coaches: [],
    errors: [],
  };
};

const getters = {
  getCoaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.getCoaches;
    const userId = rootGetters.userId;
    return coaches.some(coach => coach.id === userId);
  },
};

const mutations = {
  registerCoach(state, payload) {
    return state.coaches.push(payload);
  },
  // eslint-disable-next-line no-unused-vars
  setCoaches(s, p) {
    return (s.coaches = p);
  },
};

const actions = {
  registerCoach(context, data) {
    const userId = context.rootGetters['auth/userId'];
    const coachData = {
      id: userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };
    const token = context.rootGetters['auth/token'];
    // eslint-disable-next-line no-unused-vars
    return new Promise((rs, rj) => {
      Api.put(`coaches/${userId}.json?auth=`+token, JSON.stringify(coachData))
        // eslint-disable-next-line no-unused-vars
        .then((req) => {
          context.dispatch("loadCoaches");
          rs(req);
        })
        .catch((err) => {
          rj(err);
        });
    });
  },
  loadCoaches(context) {
    return new Promise((resolve, reject) => {
      Api.getNoParams("coaches.json")
        .then((req) => {
          const coaches = [];
          for (const key in req.data) {
            const coach = {
              id: key,
              firstName: req.data[key].firstName,
              lastName: req.data[key].lastName,
              description: req.data[key].description,
              hourlyRate: req.data[key].hourlyRate,
              areas: req.data[key].areas,
            };
            coaches.push(coach);
          }
          context.commit("setCoaches", coaches);
          resolve(req);
        })
        .catch((error) => {
          reject(error);
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
