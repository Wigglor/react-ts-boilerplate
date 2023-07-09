import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.post("/cognito/refreshtoken", null, {
      withCredentials: true,
    });
    console.log(JSON.stringify(response.data));
    setAuth((prev) => {
      console.log(`previous accessToken: ${JSON.stringify(prev)}`);
      // console.log(`new accessToken: ${response.data.accessToken}`);
      console.log(`new accessToken: ${response.data.result.AuthenticationResult.AccessToken}`);
      return {
        ...prev,
        accessToken:
          response.data.result.AuthenticationResult.AccessToken /*response.data.accessToken*/,
      };
    });
    return response.data.result.AuthenticationResult.AccessToken;
  };
  return refresh;
};
export default useRefreshToken;
