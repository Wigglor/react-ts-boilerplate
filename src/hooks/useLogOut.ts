import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useLogout = () => {
  const { auth, setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    setAuth({
      user: "",
      accessToken: "",
      role: "",
      setup: "",
      currentPeriodEnds: null,
      plan: "",
    });
    try {
      await axiosPrivate.post("/signout", {
        withCredentials: true,
      });
      console.log(`auth after signout: ${JSON.stringify(auth)}`);
      // setAuth({
      //   user: "",
      //   accessToken: "",
      //   role: "",
      //   setup: "",
      //   currentPeriodEnds: null,
      //   plan: "",
      // });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
