import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { WorkSpacesProvider } from "../context/WorkSpacesProvider";
import useWorkSpaces from "../hooks/useWorkSpaces";

const WorkSpaceWrapper = () => {
  // const { workSpaces, setWorkSpaces } = useWorkSpaces();
  const { workspaceData, updateWorkspaceData } = useWorkSpaces();

  useEffect(() => {
    const abortController = new AbortController();
    // console.log(`wp wrapper wps: ${JSON.stringify(localStorage.getItem("workSpaces"))}`);
    // console.log(`wp wrapper wps context: ${JSON.stringify(workSpaces)}`);
    // console.log(`wp wrapper wps context: ${JSON.stringify(workspaceData)}`);
    return () => {
      abortController.abort();
      // isMounted = false;
    };
  }, []);
  return (
    <>
      <WorkSpacesProvider>
        <Outlet />
      </WorkSpacesProvider>
    </>
  );
};

export default WorkSpaceWrapper;
