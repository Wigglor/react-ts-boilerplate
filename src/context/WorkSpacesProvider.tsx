/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactNode, createContext, useEffect, useState } from "react";
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

export const WorkSpacesContext = createContext<WorkspaceContextType>({
  workSpaces: INITIAL_STATE,
  setWorkSpaces: () => {},
});

export const WorkSpacesProvider = ({ children }: WorkSpaceProviderProps) => {
  const logout = useLogout();

  const [workSpaces, setWorkSpaces] = useState<WorkSpaces>(INITIAL_STATE);

  useEffect(() => {
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
    localStorage.setItem("workSpaces", JSON.stringify(workSpaces.availableWorkSpaces));
    localStorage.setItem("workSpace", JSON.stringify(workSpaces.selectedWorkSpace));
  }, [workSpaces.availableWorkSpaces, workSpaces.selectedWorkSpace]);

  return (
    <WorkSpacesContext.Provider value={{ workSpaces, setWorkSpaces }}>
      {children}
    </WorkSpacesContext.Provider>
  );
};
