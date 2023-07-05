import { useContext } from "react";
// import { AuthContext } from "../context/AuthProvider";
import { AuthContext } from "../context/AuthProvider";

const useAuth = () => {
  // return useContext(AuthContext);
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export default useAuth;

/*import { useContext } from "react";
// import { AuthContext } from "../context/AuthProvider";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;*/
