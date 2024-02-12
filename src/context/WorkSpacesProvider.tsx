/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactNode, createContext, useState } from "react";
// import useLogout from "../hooks/useLogOut";

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

// interface WorkspaceContextType {
//   workSpaces: WorkSpaces;
//   setWorkSpaces: React.Dispatch<React.SetStateAction<WorkSpaces>>;
// }

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

// export const WorkSpacesContext = createContext<WorkspaceContextType>({
//   workSpaces: INITIAL_STATE,
//   setWorkSpaces: () => {},
// });

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

interface WorkspaceContextType2 {
  workspaceData: WorkSpaces;
  // updateWorkspaceData: React.Dispatch<React.SetStateAction<WorkSpaces>>;
  updateWorkspaceData: (newData: WorkSpaces) => void;
}

export const WorkSpacesContext2 = createContext<WorkspaceContextType2>({
  workspaceData: INITIAL_STATE,
  updateWorkspaceData: () => {},
});

export const WorkSpacesProvider = ({ children }: WorkSpaceProviderProps) => {
  // const logout = useLogout();
  // const [workSpaces, setWorkSpaces] = useState<WorkSpaces>(INITIAL_STATE);

  const [workspaceData, setWorkspaceData] = useState<WorkSpaces>(() => {
    const lsWorkSpaceStr = localStorage.getItem("workSpace");
    const lsWorkSpacesStr = localStorage.getItem("workSpaces");
    // const workSpaceData = {
    //   availableWorkSpaces: lsWorkSpacesStr,
    //   selectedWorkSpace: lsWorkSpaceStr,
    // };
    const workSpaceData: WorkSpaces = {
      availableWorkSpaces: lsWorkSpacesStr ? JSON.parse(lsWorkSpacesStr) : [],
      selectedWorkSpace: lsWorkSpaceStr ? JSON.parse(lsWorkSpaceStr) : { name: "", id: "" },
    };
    return workSpaceData;
    // return workSpaceData ? JSON.parse(workSpaceData) : null;
  });

  const updateWorkspaceData = (newData: WorkSpaces) => {
    setWorkspaceData(newData);
    localStorage.setItem("workSpaces", JSON.stringify(newData.availableWorkSpaces));
    localStorage.setItem("workSpace", JSON.stringify(newData.selectedWorkSpace));
  };

  return (
    <WorkSpacesContext2.Provider value={{ workspaceData, updateWorkspaceData }}>
      {children}
    </WorkSpacesContext2.Provider>
  );
};
// export const WorkSpacesProvider = ({ children }: WorkSpaceProviderProps) => {
//   const logout = useLogout();
//   // console.log(`wps before: ${localStorage.getItem("workSpaces")}`);
//   // console.log(`persist before: ${localStorage.getItem("persist")}`);
//   const [workSpaces, setWorkSpaces] = useState<WorkSpaces>(INITIAL_STATE);

//   // console.log(`wps after: ${localStorage.getItem("workSpaces")}`);
//   // console.log(`wps state after: ${JSON.stringify(workSpaces)}`);

//   useEffect(() => {
//     const lsWorkSpaceStr = localStorage.getItem("workSpace");
//     const lsWorkSpacesStr = localStorage.getItem("workSpaces");
//     // console.log(`localStorage wps: ${JSON.stringify(lsWorkSpacesStr)}`);
//     console.log("calling wsp provider....");
//     if (lsWorkSpaceStr && lsWorkSpacesStr) {
//       try {
//         const lsWorkSpace = JSON.parse(lsWorkSpaceStr);
//         const lsWorkSpaces = JSON.parse(lsWorkSpacesStr);
//         setWorkSpaces({
//           availableWorkSpaces: lsWorkSpaces,
//           selectedWorkSpace: {
//             name: lsWorkSpace.name,
//             id: lsWorkSpace.id,
//           },
//         });
//       } catch (e) {
//         console.error("Error parsing local storage data:", e);
//         // Handle error, maybe clear local storage or set a default state
//       }
//     } else {
//       logout();
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("workSpaces", JSON.stringify(workSpaces.availableWorkSpaces));
//     localStorage.setItem("workSpace", JSON.stringify(workSpaces.selectedWorkSpace));
//   }, [workSpaces.availableWorkSpaces, workSpaces.selectedWorkSpace]);

//   return (
//     <WorkSpacesContext.Provider value={{ workSpaces, setWorkSpaces }}>
//       {children}
//     </WorkSpacesContext.Provider>
//   );
// };
