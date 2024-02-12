import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";
import useWorkSpaces from "./useWorkSpaces";

const useLogout = () => {
  const { setAuth } = useAuth();
  // const { setWorkSpaces } = useWorkSpaces();
  const { updateWorkspaceData } = useWorkSpaces();

  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    setAuth({
      user: "",
      accessToken: "",
      role: "",
      setup: "",
      currentPeriodEnds: null,
      plan: undefined,
      // plan: "",
    });
    updateWorkspaceData({
      availableWorkSpaces: [
        {
          name: "",
          id: "",
        },
      ],
      selectedWorkSpace: { name: "", id: "" },
    });
    // setWorkSpaces({
    //   availableWorkSpaces: [
    //     {
    //       name: "",
    //       id: "",
    //     },
    //   ],
    //   selectedWorkSpace: { name: "", id: "" },
    // });
    console.log("setting localStorage to false....");
    localStorage.setItem("persist", JSON.stringify(false));
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
