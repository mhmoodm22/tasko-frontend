import axios from "axios";

const useAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: "http://103.161.8.39:8081/task-ws",
    
  });

  // request interceptor
  axiosSecure.interceptors.request.use(
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

  return axiosSecure;
};

export default useAxiosSecure;
