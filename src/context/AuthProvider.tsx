/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState } from "react";

interface Auth {
  user: string;
  // pwd: string;
  accessToken: string;
}

interface AuthContextType {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
}

// const AuthContext = createContext({});
// const AuthContext = createContext<AuthContextType | null>(null);
export const AuthContext = createContext<AuthContextType>({
  auth: {
    user: "",
    //  pwd: "",
    accessToken: "",
  },
  setAuth: () => {},
});

export const AuthProvider = ({ children }: any) => {
  //   const [auth, setAuth] = useState({});
  //   const [auth, setAuth] = useState<boolean>(false);
  const [auth, setAuth] = useState<Auth>({
    user: "",
    // pwd: "",
    accessToken: "",
  });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

// export default AuthContext;
