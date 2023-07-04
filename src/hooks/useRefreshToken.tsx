import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.post("/cognito/refreshtoken", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(`previous accessToken: ${JSON.stringify(prev)}`);
      console.log(`new accessToken: ${response.data.accessToken}`);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};
export default useRefreshToken;
