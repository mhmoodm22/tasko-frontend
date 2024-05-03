import axios from "axios";

const useAxiosCustom = () => {
  const axiosCustom = axios.create({
    baseURL: "https://revival-backend.vercel.app/api/v1",
  });

  axiosCustom.interceptors.request.use(
    function (config) {
      
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axiosCustom.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return axiosCustom;
};

export default useAxiosCustom;
