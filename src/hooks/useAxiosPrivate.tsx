import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        // console.log("intercepting request...");

        if (!config.headers || !config.headers["Authorization"]) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${auth?.accessToken}`,
          };
          // console.log(`config headers: ${JSON.stringify(config.headers)}`);
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        // if (error?.response?.status === 401 && !prevRequest?.sent) {
        if (!error?.response?.status.toString().startsWith("2") && !prevRequest?.sent) {
          console.log("starting with something other than 2");
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          console.log(`retrieving new access token: ${newAccessToken}`);
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
