import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// type RequireAuthProps = {
//   allowedRoles: string[];
// };

const PublicRoute = () => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(`auth...: ${JSON.stringify(auth)}`);

  return !auth?.user ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
};

export default PublicRoute;
