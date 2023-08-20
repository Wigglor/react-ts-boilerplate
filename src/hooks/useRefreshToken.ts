import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const { auth } = useAuth();

  const refresh = async () => {
    console.log(`auth before refresh: ${JSON.stringify(auth)}`);
    const response = await axios.post("/cognito/refreshtoken", null, {
      withCredentials: true,
    });
    console.log(`refreshtoken response: ${JSON.stringify(response.data)}`);
    // setAuth((prev) => {
    //   console.log(`previous accessToken: ${JSON.stringify(prev)}`);
    //   console.log(`new accessToken: ${response.data.accessToken}`);
    //   return {
    //     ...prev,
    //     accessToken: response.data.accessToken /*response.data.accessToken*/,
    //   };
    // });
    setAuth({
      user: response.data.user,
      accessToken: response.data.accessToken,
      role: response.data.role,
      setup: response.data.setup,
    });
    return response.data.accessToken;
  };
  return refresh;
};
export default useRefreshToken;
