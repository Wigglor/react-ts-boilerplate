import { AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosInstance } from "../../api/test_auth/axiosInstance";
import refreshAccessToken from "./refreshAccessToken";

axiosInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await refreshAccessToken(); // define this function
      localStorage.setItem("access_token", access_token);
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
