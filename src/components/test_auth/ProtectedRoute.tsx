// src/ProtectedRoute.tsx

import React from "react";
import { Navigate, Outlet, RouteProps } from "react-router-dom";
import { useAuth } from "../../context/test_auth/AuthContext";

const ProtectedRoute: React.FC<RouteProps> = () => {
  const { user } = useAuth()!;
  console.log(user);

  //   return (
  //     <Route {...rest} render={({ location }) => user ? (children) : (<Navigate to="/unauthorized" state={{ from: location }} replace />)} />
  //   );
  return user ? <Outlet /> : <Navigate to="/unauthorized" state={{ from: location }} replace />;
};

export default ProtectedRoute;
