import axios from "axios";

export const useAxiosAuth = () => {
  const axiosAuth = axios.create({
    baseURL: "http://103.161.8.39:8080/task-ws",
  });

  // request interceptor
  axiosAuth.interceptors.request.use(
    function (config) {
      const authToken = localStorage.getItem("authToken");

      // setting the authorization header on every request
      config.headers.Authorization = authToken;

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // response interceptor
  axiosAuth.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger

      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return axiosAuth;
};
