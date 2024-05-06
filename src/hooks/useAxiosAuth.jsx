import axios from "axios";

export const useAxiosAuth = () => {
  const axiosAuth = axios.create({
    baseURL: "http://103.161.8.39:8080/task-ws",
  });

  return axiosAuth;
};
