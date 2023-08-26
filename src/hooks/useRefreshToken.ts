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
      // console.log(`refreshtoken response: ${JSON.stringify(response.data)}`);

      // setAuth({
      //   user: response.data.user,
      //   accessToken: response.data.accessToken,
      //   role: response.data.role,
      //   setup: response.data.setup,
      // });

      // I only think prev is available when accesstoken expires
      setAuth((prev) => {
        console.log(
          `prevoius state: ${JSON.stringify(prev)} and new accesstoken: ${
            response.data.accessToken
          }`,
        );
        return {
          ...prev,
          user: response.data.user,
          accessToken: response.data.accessToken,
          role: response.data.role,
          setup: response.data.setup,
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
