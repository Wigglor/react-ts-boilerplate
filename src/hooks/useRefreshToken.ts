import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth, auth } = useAuth();

  const refresh = async () => {
    // console.log(`auth before refresh: ${JSON.stringify(auth)}`);
    try {
      const response = await axios.post("/refreshtoken", null, {
        withCredentials: true,
      });

      // setAuth({
      //   user: response.data.user,
      //   accessToken: response.data.accessToken,
      //   role: response.data.role,
      //   setup: response.data.setup,
      // });

      // I only think prev is available when accesstoken expires
      console.log("Hitting refresh function");
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
        // return {
        //   ...prev,
        //   accessToken: response.data.accessToken,
        // };
      });
      return response.data.accessToken;
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };
  return refresh;
};
export default useRefreshToken;
