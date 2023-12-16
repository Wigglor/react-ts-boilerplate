import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { WorkSpacesProvider } from "../context/WorkSpacesProvider";
import useAuth from "../hooks/useAuth";

type RequireAuthProps = {
  allowedRoles: string[];
};

const PrivateRoute = ({ allowedRoles }: RequireAuthProps) => {
  const { auth } = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  //   return auth?.accountComplete ? (
  // return auth?.role ? <Outlet /> : <Navigate to="/onboarding" state={{ from }} replace />;
  // return auth?.user ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;

  return allowedRoles?.includes(auth?.role as string) && auth?.user ? (
    // <WorkSpacesProvider>
    <Outlet />
  ) : // </WorkSpacesProvider>
  auth?.setup === "PENDING" ? (
    <Navigate to="/onboarding" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
  // return auth?.setup === "PENDING" ? (
  //   <Navigate to="/onboarding" state={{ from: location }} replace />
  // ) : allowedRoles?.includes(auth?.role as string) && auth?.user ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );

  // Perhaps add this. But should be added around the normal routes (home, posts etc) in App.tsx instead of onboarding path:
};

export default PrivateRoute;
