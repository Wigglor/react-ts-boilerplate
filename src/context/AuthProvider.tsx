/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */

import { ReactNode, createContext, useState } from "react";

interface Auth {
  user: string;
  accessToken: string;
  role: string;
  setup: string;
  currentPeriodEnds: Date | null;
  plan: string;
}

interface AuthContextType {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
}

const INITIAL_STATE: Auth = {
  user: "",
  accessToken: "",
  role: "",
  setup: "",
  currentPeriodEnds: null,
  plan: "",
};

export const AuthContext = createContext<AuthContextType>({
  auth: INITIAL_STATE,
  setAuth: () => {},
});

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [auth, setAuth] = useState<Auth>(INITIAL_STATE);
  return (
    <AuthContext.Provider value={{ auth, setAuth /*persist, setPersist*/ }}>
      {children}
    </AuthContext.Provider>
  );
};
