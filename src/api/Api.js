import axios from "axios";
// eslint-disable-next-line no-unused-vars
const axiosInstace = axios.create({
  baseURL:
    "https://vue-project-1-318a9-default-rtdb.asia-southeast1.firebasedatabase.app/",
});
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
const Api = {
  get: (url, params = {}) => axiosInstace.get(url, { params: params }),
  getNoParams: (url) => axiosInstace.get(url),
  post: (url, data) => axiosInstace.post(url, data),
  getCustomHeader: (url, params = {}, headers = {}) =>
    axiosInstace.get(url, { params: params }, { headers: headers }),

  postCustomHeader: (url, data, headers = {}) =>
    axiosInstace.post(url, data, { headers: headers }),

  put: (url, data) => axiosInstace.put(url, data),
  delete: (url) => axiosInstace.post(url),
};
export default Api;
