import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

type RequireAuthProps = {
  allowedRoles: string[];
};

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const { auth } = useAuth();
  const location = useLocation();
  return allowedRoles?.includes(auth?.role as string) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
