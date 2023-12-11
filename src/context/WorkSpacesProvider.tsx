/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactNode, createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";

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
  memberships: {
    company: {
      id: string;
      name: string;
    };
  }[];
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
  // const axiosPrivate = useAxiosPrivate();
  console.log("triggering WorkSpacesProvider...");
  console.log(JSON.stringify(auth));
  // const [workSpaces, setWorkSpaces] = useState<WorkSpaces>(INITIAL_STATE);

  const [workSpaces, setWorkSpaces] = useState(() => {
    /*const fetchWorkSpaces = async () => {
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
        const availableWorkSpaces = response.data.memberships.map((wp) => {
          return { name: wp.company.name, id: wp.company.id };
        });
        console.log(JSON.stringify(availableWorkSpaces));
        // setWorkSpaces({
        //   availableWorkSpaces: availableWorkSpaces,
        //   selectedWorkSpace: {
        //     name: response?.data.user.memberships[0].company.name,
        //     id: response?.data.user.memberships[0].company.id,
        //   },
        // });
      } catch (err) {
        console.error(err);
      }
    };*/
    // Get initial value from localStorage or set a default
    console.log("calling useState for workSpaces");
    const LsWorkSpace = localStorage.getItem("workSpace") as string;
    const LsWorkSpaces = localStorage.getItem("workSpaces") as string;
    // if (!LsWorkSpace || !LsWorkSpaces) {
    //   console.log(`missing workspace:`);

    //   fetchWorkSpaces();
    // }
    const wps: WorkSpaces = {
      availableWorkSpaces: JSON.parse(LsWorkSpaces),
      selectedWorkSpace: JSON.parse(LsWorkSpace),
    };
    console.log(JSON.stringify(wps));
    return wps !== null ? wps : INITIAL_STATE;
  });

  useEffect(() => {
    console.log("Setting local storage from useEffect");
    localStorage.setItem("workSpaces", JSON.stringify(workSpaces.availableWorkSpaces));
    localStorage.setItem("workSpace", JSON.stringify(workSpaces.selectedWorkSpace));
  }, [workSpaces]);

  return (
    <WorkSpacesContext.Provider value={{ workSpaces, setWorkSpaces }}>
      {children}
    </WorkSpacesContext.Provider>
  );
};
