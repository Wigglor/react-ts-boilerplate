import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

type RequireAuthProps = {
  allowedRoles: string[];
};

const PrivateRoute = ({ allowedRoles }: RequireAuthProps) => {
  const { auth } = useAuth();
  const location = useLocation();

  return allowedRoles?.includes(auth?.role as string) && auth?.user ? (
    <Outlet />
  ) : auth?.setup === "PENDING" ? (
    <Navigate to="/onboarding" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
