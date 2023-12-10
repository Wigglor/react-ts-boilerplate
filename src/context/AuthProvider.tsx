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

interface Persist {
  persist: boolean;
}

interface AuthContextType {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
  // persist: Persist;
  // setPersist: React.Dispatch<React.SetStateAction<Persist>>;
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
  // persist: {
  //   persist: false,
  // },
  // setPersist: () => {},
});

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [auth, setAuth] = useState<Auth>(INITIAL_STATE);
  const [testData, setTestData] = useState<string>(() => {
    const testData = "test string";
    console.log(`setting testData for authprovider: ${testData}`);
    return testData;
  });
  return (
    <AuthContext.Provider value={{ auth, setAuth /*persist, setPersist*/ }}>
      {children}
    </AuthContext.Provider>
  );
};
// import { ReactNode, createContext, useState } from "react";

// interface Auth {
//   user: string;
//   accessToken: string;
//   role: string;
//   setup: string;
// }

// interface Persist {
//   persist: boolean;
// }

// interface AuthContextType {
//   auth: Auth;
//   setAuth: React.Dispatch<React.SetStateAction<Auth>>;
//   // persist: Persist;
//   // setPersist: React.Dispatch<React.SetStateAction<Persist>>;
// }

// const INITIAL_STATE: Auth = {
//   user: "",
//   accessToken: "",
//   role: "",
//   setup: "",
// };

// export const AuthContext = createContext<AuthContextType>({
//   auth: INITIAL_STATE,
//   setAuth: () => {},
//   // persist: {
//   //   persist: false,
//   // },
//   // setPersist: () => {},
// });

// interface IAuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider = ({ children }: IAuthProviderProps) => {
//   const [auth, setAuth] = useState<Auth>(INITIAL_STATE);
//   // const initialPersist = localStorage.getItem("persist");
//   // const [persist, setPersist] = useState(initialPersist ? JSON.parse(initialPersist) : false);
//   // const [persist, setPersist] = useState(
//   //   JSON.parse(localStorage.getItem("persist") as string) || false,
//   // );

//   console.log(`AUTHING - AuthProvider: ..........${JSON.stringify(auth)}`);
//   return (
//     <AuthContext.Provider value={{ auth, setAuth /*persist, setPersist*/ }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
