// import axios from "../api/axios";
// import axios from "../api/axios";
import axiosPrivate from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    // const response = await axios.post("/cognito/refreshtoken", {
    const response = await axiosPrivate.post("/cognito/refreshtoken", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(`previous accessToken: ${JSON.stringify(prev)}`);
      // console.log(`new accessToken: ${response.data.accessToken}`);
      console.log(`new accessToken: ${response.data.AuthenticationResult.AccessToken}`);
      return {
        ...prev,
        accessToken: response.data.AuthenticationResult.AccessToken /*response.data.accessToken*/,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};
export default useRefreshToken;
