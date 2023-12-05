/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactNode, createContext, useState } from "react";

type WorkSpaces = {
  availableWorkSpaces: {
    name: string;
    id: string;
  };
  selectedWorkSpace: string;
};

interface WorkspaceContextType {
  workSpaces: WorkSpaces;
  setWorkSpaces: React.Dispatch<React.SetStateAction<WorkSpaces>>;
}

interface WorkSpaceProviderProps {
  children: ReactNode;
}

const INITIAL_STATE: WorkSpaces = {
  availableWorkSpaces: {
    name: "",
    id: "",
  },
  selectedWorkSpace: "",
};

// export const WorkSPaceContext = createContext<WorkspaceContextType | null>(null);
export const WorkSpacesContext = createContext<WorkspaceContextType>({
  workSpaces: INITIAL_STATE,
  setWorkSpaces: () => {},
});

export const WorkSpacesProvider = ({ children }: WorkSpaceProviderProps) => {
  const [workSpaces, setWorkSpaces] = useState<WorkSpaces>(INITIAL_STATE);

  return (
    <WorkSpacesContext.Provider value={{ workSpaces, setWorkSpaces }}>
      {children}
    </WorkSpacesContext.Provider>
  );
};
