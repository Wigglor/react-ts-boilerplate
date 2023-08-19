/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */

// import { createContext, useState } from "react";

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }:any) => {
//     const [auth, setAuth] = useState({});
//     return (
//         <AuthContext.Provider value={{ auth, setAuth }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export default AuthContext;

// ---------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------

/*import { createContext, useState } from "react";

interface Auth {
  user: string;
  // pwd: string;
  accessToken: string;
}

type AuthContextType = {
  auth: Auth | null;
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
};

// const AuthContext = createContext({});
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  // const [auth, setAuth] = useState({});
  const [auth, setAuth] = useState<Auth | null>(null);

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;*/

// ---------------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------------

import { createContext, useState } from "react";

interface Auth {
  user: string;
  // pwd: string;
  accessToken: string;
  // accountComplete: boolean;
  role: string | null;
  // access: string;
}

// interface Persist {
//   persist: boolean;
// }

type Persist = boolean;

interface AuthContextType {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
  // persist: Persist;
  // setPersist: React.Dispatch<React.SetStateAction<Persist>>;
}

// const AuthContext = createContext({});
// const AuthContext = createContext<AuthContextType | null>(null);
export const AuthContext = createContext<AuthContextType>({
  auth: {
    user: "",
    accessToken: "",
    // accountComplete: false,
    role: "",
  },
  setAuth: () => {},
  // persist: false,
  // setPersist: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [auth, setAuth] = useState<Auth>({
    user: "",
    // user: "hehe",
    // accessToken: "hehe",
    accessToken: "",
    // accountComplete: false,
    role: "",
  });
  const initialPersist = localStorage.getItem("persist");
  const [persist, setPersist] = useState(initialPersist ? JSON.parse(initialPersist) : false);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
    // <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
    //   {children}
    // </AuthContext.Provider>
  );
};

// export default AuthContext;*/
