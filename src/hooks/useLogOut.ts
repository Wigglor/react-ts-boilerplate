import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const useLogout = () => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    setAuth({
      user: "",
      accessToken: "",
      role: "",
      setup: "",
    });
    try {
      // const response = await axios('/cognito/signout', {
      // await axios.post("/cognito/signout", {
      await axiosPrivate.post("/cognito/signout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
