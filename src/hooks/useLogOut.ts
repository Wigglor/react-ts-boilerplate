import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useLogout = () => {
  // const { setAuth, setPersist } = useAuth();
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    setAuth({
      user: "",
      accessToken: "",
      role: "",
      setup: "",
    });
    localStorage.removeItem("isLoggedIn");
    // setPersist({ persist: false });
    try {
      await axiosPrivate.post("/signout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
