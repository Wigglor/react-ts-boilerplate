import { useEffect } from "react";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";
import useWorkSpaces from "./useWorkSpaces";

const useLogout = () => {
  const { setAuth, persist, setPersist } = useAuth();
  // const { setWorkSpaces } = useWorkSpaces();
  const { workspaceData, updateWorkspaceData } = useWorkSpaces();

  useEffect(() => {
    console.log(`useEffect for persist: ${persist}`);
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  const togglePersist = () => {
    console.log("toggling persist");
    setPersist((prev) => !prev);
  };

  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    togglePersist();
    setAuth({
      user: "",
      accessToken: "",
      role: "",
      setup: "",
      currentPeriodEnds: null,
      plan: undefined,
      // plan: "",
    });
    // updateWorkspaceData({
    //   availableWorkSpaces: [
    //     {
    //       name: "",
    //       id: "",
    //     },
    //   ],
    //   selectedWorkSpace: { name: "", id: "" },
    // });
    const newWorkspaceData = { ...workspaceData };
    console.log(`previous workspace state: ${JSON.stringify(workspaceData)}`);
    newWorkspaceData.availableWorkSpaces = [
      {
        name: "",
        id: "",
      },
    ];
    // newWorkspaceData.selectedWorkSpace = selectedWorkSpace_ as { name: string; id: string };
    newWorkspaceData.selectedWorkSpace = { name: "", id: "" };
    updateWorkspaceData(newWorkspaceData);
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

    // localStorage.setItem("persist", JSON.stringify(false));
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
