import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";
import useWorkSpaces from "./useWorkSpaces";

const useLogout = () => {
  const { auth, setAuth } = useAuth();
  const { setWorkSpaces } = useWorkSpaces();
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
    setWorkSpaces({
      availableWorkSpaces: [
        {
          name: "",
          id: "",
        },
      ],
      selectedWorkSpace: { name: "", id: "" },
    });
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
