/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactNode, createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLogout from "../hooks/useLogOut";

/*

Implement fetching from localstorage
Set initial values from localstorage when logging in???

*/

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

type WorkSpaceResponse = {
  userWithCompany: {
    memberships: {
      company: {
        id: string;
        name: string;
      };
    }[];
  };
};

type WorkSpaces = {
  availableWorkSpaces: {
    name: string;
    id: string;
  }[];
  selectedWorkSpace: {
    name: string;
    id: string;
  };
};

interface WorkspaceContextType {
  workSpaces: WorkSpaces;
  setWorkSpaces: React.Dispatch<React.SetStateAction<WorkSpaces>>;
}

interface WorkSpaceProviderProps {
  children: ReactNode;
}

const INITIAL_STATE: WorkSpaces = {
  availableWorkSpaces: [
    {
      name: "",
      id: "",
    },
  ],
  selectedWorkSpace: { name: "", id: "" },
};

// export const WorkSPaceContext = createContext<WorkspaceContextType | null>(null);
export const WorkSpacesContext = createContext<WorkspaceContextType>({
  workSpaces: INITIAL_STATE,
  setWorkSpaces: () => {},
});

export const WorkSpacesProvider = ({ children }: WorkSpaceProviderProps) => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const logout = useLogout();
  // console.log("triggering WorkSpacesProvider...");
  // console.log(JSON.stringify(auth));
  const [workSpaces, setWorkSpaces] = useState<WorkSpaces>(INITIAL_STATE);

  /*const [workSpaces, setWorkSpaces] = useState(() => {
    const fetchWorkSpaces = async () => {
      try {
        const response: ApiResponse<WorkSpaceResponse> = await axiosPrivate.get(
          "/subscription/workspaces",
          {
            // withCredentials: true,
            headers: {
              Authorization: `Bearer ${auth?.accessToken}`,
            },
          },
        );
        console.log("--------------------------------------------");
        console.log(JSON.stringify(response));
        console.log("--------------------------------------------");
        const availableWorkSpaces = response.data.userWithCompany.memberships.map((wp) => {
          return { name: wp.company.name, id: wp.company.id };
        });
        // wps = {
        //   availableWorkSpaces: availableWorkSpaces,
        //   selectedWorkSpace: {
        //     name: availableWorkSpaces[0].name,
        //     id: availableWorkSpaces[0].id,
        //   },
        // };
        // console.log(JSON.stringify(availableWorkSpaces));

        // setWorkSpaces({
        //   availableWorkSpaces: availableWorkSpaces,
        //   selectedWorkSpace: {
        //     name: availableWorkSpaces[0].name,
        //     id: availableWorkSpaces[0].id,
        //   },
        // });
        return availableWorkSpaces;
      } catch (err) {
        console.error(err);
      }
      // return "fetched wps";
      return {
        availableWorkSpaces: [
          { name: "novaxot181 - wp", id: "302db235-365a-4bf6-a6f0-2974e031c999" },
          { name: "novaxot181 - wp 2", id: "a582e6be-3a29-48b9-abd3-be67c7ded649" },
        ],
        selectedWorkSpace: { name: "novaxot181 - wp", id: "302db235-365a-4bf6-a6f0-2974e031c999" },
      };
    };
    const LsWorkSpace = localStorage.getItem("workSpace") as string;
    const LsWorkSpaces = localStorage.getItem("workSpaces") as string;
    // if (!LsWorkSpace || !LsWorkSpaces) {
    //   //  fetchWorkSpaces();
    //   (async () => {
    //     // const result = await fetchWorkSpaces();
    //     // const wps: WorkSpaces = {
    //     //   availableWorkSpaces: result.availableWorkSpaces,
    //     //   selectedWorkSpace: result.selectedWorkSpace,
    //     // };
    //     // console.log(result);
    //     await logout();
    //     // return wps !== null ? wps : INITIAL_STATE;
    //   })();
    // }

    console.log(typeof LsWorkSpaces);
    const wps: WorkSpaces = {
      availableWorkSpaces:
        // LsWorkSpaces !== "" ? JSON.parse(LsWorkSpaces) : INITIAL_STATE.availableWorkSpaces,
        JSON.parse(LsWorkSpaces),
      selectedWorkSpace:
        // LsWorkSpace !== "" ? JSON.parse(LsWorkSpace) : INITIAL_STATE.selectedWorkSpace,
        JSON.parse(LsWorkSpace),
    };
    console.log(JSON.stringify(wps));
    return wps !== null ? wps : INITIAL_STATE;
  });*/
  // const [workSpaces, setWorkSpaces] = useState(() => {
  //   // This block is the lazy initializer
  //   console.log("calling useState for workSpaces");

  //   // Attempt to retrieve 'workSpace' and 'workSpaces' from localStorage
  //   const LsWorkSpace = JSON.parse(localStorage.getItem("workSpace") as string);
  //   const LsWorkSpaces = JSON.parse(localStorage.getItem("workSpaces") as string);

  //   // Construct an object with the retrieved values
  //   const wps: WorkSpaces = {
  //     availableWorkSpaces: LsWorkSpaces,
  //     selectedWorkSpace: LsWorkSpace,
  //   };
  //   console.log(JSON.stringify(wps));

  //   // Return the retrieved object or a default initial state
  //   return wps !== null ? wps : INITIAL_STATE;
  // });

  /*useEffect(() => {
    // const handleStorage = () => {
    // Place for a function responsible for
    // pulling and displaying local storage data
    // return "handleStorage"
    // };
    console.log("Setting local storage from useEffect");
    localStorage.setItem("workSpaces", JSON.stringify(workSpaces.availableWorkSpaces));
    localStorage.setItem("workSpace", JSON.stringify(workSpaces.selectedWorkSpace));
    // window.addEventListener("storage", handleStorage);
    // return () => window.removeEventListener("storage", handleStorage);
  }, [workSpaces]);*/

  /* useEffect(() => {
    console.log("getting items in ls");
    const LsWorkSpace = localStorage.getItem("workSpace") as string;
    const LsWorkSpaces = localStorage.getItem("workSpaces") as string;
    if (LsWorkSpace && LsWorkSpaces) {
      setWorkSpaces({
        availableWorkSpaces: JSON.parse(LsWorkSpaces),
        selectedWorkSpace: {
          name: JSON.parse(LsWorkSpace).name,
          id: JSON.parse(LsWorkSpace).id,
        },
      });
    } else {
      (async () => {
        await logout();
      })();
    }
  }, []);


  useEffect(() => {
    console.log("setting items in ls");
    localStorage.setItem("workSpaces", JSON.stringify(workSpaces.availableWorkSpaces));
    localStorage.setItem("workSpace", JSON.stringify(workSpaces.selectedWorkSpace));
  }, [workSpaces]);*/
  useEffect(() => {
    console.log("getting items in ls");
    const lsWorkSpaceStr = localStorage.getItem("workSpace");
    const lsWorkSpacesStr = localStorage.getItem("workSpaces");

    if (lsWorkSpaceStr && lsWorkSpacesStr) {
      try {
        const lsWorkSpace = JSON.parse(lsWorkSpaceStr);
        const lsWorkSpaces = JSON.parse(lsWorkSpacesStr);
        setWorkSpaces({
          availableWorkSpaces: lsWorkSpaces,
          selectedWorkSpace: {
            name: lsWorkSpace.name,
            id: lsWorkSpace.id,
          },
        });
      } catch (e) {
        console.error("Error parsing local storage data:", e);
        // Handle error, maybe clear local storage or set a default state
      }
    } else {
      logout();
    }
  }, []);

  useEffect(() => {
    console.log("setting items in ls");
    localStorage.setItem("workSpaces", JSON.stringify(workSpaces.availableWorkSpaces));
    localStorage.setItem("workSpace", JSON.stringify(workSpaces.selectedWorkSpace));
  }, [workSpaces.availableWorkSpaces, workSpaces.selectedWorkSpace]);

  return (
    <WorkSpacesContext.Provider value={{ workSpaces, setWorkSpaces }}>
      {children}
    </WorkSpacesContext.Provider>
  );
};
