import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.post("/refreshtoken", null, {
        withCredentials: true,
      });

      setAuth((prev) => {
        return {
          ...prev,
          user: response.data.user,
          accessToken: response.data.accessToken,
          role: response.data.role,
          setup: response.data.setup,
          currentPeriodEnds: response.data.currentPeriodEnds,
          plan: response.data.plan,
        };
      });
      return response.data.accessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };
  return refresh;
};
export default useRefreshToken;
