import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../../hooks/test_auth/axiosInstance";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface User {
  user: string;
  pwd: string;
  // Define other properties
}

interface ContextProps {
  user: User | null;
  login: (credentials: User) => Promise<void>; // Define proper type for credentials
  logout: () => Promise<void>;
}

export const AuthContext = createContext<ContextProps | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (credentials: User) => {
    const { data } = await axiosInstance.post("/auth/login", credentials);
    setUser(data);
  };

  const logout = async () => {
    await axiosInstance.post("/auth/logout");
    setUser(null);
  };

  useEffect(() => {
    const checkRefreshToken = async () => {
      const { data } = await axiosInstance.get("/auth/refresh-token");
      setUser(data);
    };
    checkRefreshToken();
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
