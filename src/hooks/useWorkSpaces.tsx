import { useContext } from "react";
import { WorkSpacesContext } from "../context/WorkSpacesProvider";

const useWorkSpaces = () => {
  const context = useContext(WorkSpacesContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export default useWorkSpaces;
