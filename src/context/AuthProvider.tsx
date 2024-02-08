/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */

import { ReactNode, createContext, useState } from "react";

interface Auth {
  user: string;
  accessToken: string;
  role: string;
  setup: string;
  currentPeriodEnds: Date | null;
  plan: undefined;
  // plan: string;
}

interface AuthContextType {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
}

const INITIAL_STATE: Auth = {
  user: "",
  accessToken: "",
  role: "",
  setup: "",
  currentPeriodEnds: null,
  plan: undefined,
  // plan: "",
};

export const AuthContext = createContext<AuthContextType>({
  auth: INITIAL_STATE,
  setAuth: () => {},
  persist: false,
  setPersist: () => {},
});

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [auth, setAuth] = useState<Auth>(INITIAL_STATE);
  // const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist") || "false"));
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist") || "false") === true,
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};
