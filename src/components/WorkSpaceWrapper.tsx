import { Outlet } from "react-router-dom";
import { WorkSpacesProvider } from "../context/WorkSpacesProvider";

const WorkSpaceWrapper = () => {
  return (
    <>
      <WorkSpacesProvider>
        <Outlet />
      </WorkSpacesProvider>
    </>
  );
};

export default WorkSpaceWrapper;
