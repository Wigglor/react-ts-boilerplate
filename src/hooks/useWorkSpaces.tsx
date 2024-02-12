import { useContext } from "react";
// import { WorkSpacesContext } from "../context/WorkSpacesProvider";
import { WorkSpacesContext2 } from "../context/WorkSpacesProvider";

const useWorkSpaces = () => {
  // const context = useContext(WorkSpacesContext);
  const context = useContext(WorkSpacesContext2);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export default useWorkSpaces;
