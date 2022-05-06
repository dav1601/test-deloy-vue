import axios from "axios";
const state = () => {
  return {
    userId: null,
    token: null,
    tokenExpiration: null,
  };
};

const getters = {
  userId(s) {
    return s.userId;
  },
  token(s) {
    return s.token;
  },
  isAuthenticated(state) {
    return state.token;
  },
};
const mutations = {
  setUser(s, p) {
    (s.token = p.token),
      (s.userId = p.userId),
      (s.tokenExpiration = p.tokenExpiration);
  },
};

const actions = {
  login(c, p) {
    c.dispatch("auth", {
      ...p,
      mode: "login",
    });
  },
  singup(c, p) {
    c.dispatch("auth", {
      ...p,
      mode: "singup",
    });
  },
  auth(c, p) {
    const mode = p.mode;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBB0vHnzKuUC2U9zk4DfiGXn41uCAoskkk";
    if (mode == "singup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBB0vHnzKuUC2U9zk4DfiGXn41uCAoskkk";
    }
    return new Promise((resolse, reject) => {
      axios
        .post(url, {
          email: p.email,
          password: p.password,
          returnSecureToken: true,
        })
        .then((req) => {
          localStorage.setItem("token", req.data.idToken);
          localStorage.setItem("userId", req.data.localId);
          c.commit("setUser", {
            token: req.data.idToken,
            userId: req.data.localId,
            tokenExpiration: req.data.expiresIn,
          });
          resolse(req);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  tryLogin(c) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      c.commit("setUser", {
        token: token,
        userId: userId,
        tokenExpiration: null,
      });
    }
  },
  tryLogout(){
    
  },
  logout(c) {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    c.commit("setUser", {
      userId: null,
      token: null,
      tokenExpiration: null,
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
