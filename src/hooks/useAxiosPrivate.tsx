// import { isCancel } from "axios";
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
        if (!config.headers || !config.headers["Authorization"]) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${auth?.accessToken}`,
          };
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const matchResponseStatus = (status: string) => {
      // console.log(`statuscode: ${status}`);
      const list: ReadonlyArray<string> = ["2", "3"];
      for (const item of list) {
        if (status.startsWith(item)) {
          return true;
        }
      }
      return false;
    };

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        // if (isCancel(error)) {
        //   console.log("Request was canceled", error.message);
        //   // Consider returning a custom response or error to avoid throwing if this is expected
        //   // eslint-disable-next-line @typescript-eslint/no-empty-function
        //   return new Promise(() => {}); // This effectively "ignores" the cancellation error
        // }

        const prevRequest = error?.config;
        // if (error?.response?.status === 401 && !prevRequest?.sent) {
        // if (!error?.response?.status.toString().startsWith("2") && !prevRequest?.sent) {
        console.log(`error from call: ${JSON.stringify(error)}`);
        // Sometimes throwing CanceledError when e.g. navigating to Organisation-route. It's due
        // react strict:
        // https://stackoverflow.com/questions/73140563/axios-throwing-cancelederror-with-abort-controller-in-react
        // https://react.dev/blog/2022/03/29/react-v18#new-strict-mode-behaviors
        if (!matchResponseStatus(error?.response?.status.toString()) && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
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
