/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactNode, createContext, useEffect, useState } from "react";

/*

Implement fetching from localstorage
Set initial values from localstorage when logging in???

*/

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
  console.log("triggering WorkSpacesProvider...");
  // const [workSpaces, setWorkSpaces] = useState<WorkSpaces>(INITIAL_STATE);

  const [workSpaces, setWorkSpaces] = useState(() => {
    // Get initial value from localStorage or set a default
    console.log("calling useState for workSpaces");
    const LsWorkSpace = JSON.parse(localStorage.getItem("workSpace") as string);
    const LsWorkSpaces = JSON.parse(localStorage.getItem("workSpaces") as string);
    const wps: WorkSpaces = {
      availableWorkSpaces: LsWorkSpaces,
      selectedWorkSpace: LsWorkSpace,
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
