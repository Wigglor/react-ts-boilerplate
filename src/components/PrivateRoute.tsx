import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// const RestrictedRoute = ({ children, ...rest }) => {
const PrivateRoute = () => {
  // const { isAuthenticated, hasCompletedSetup } = useAuth();
  const { auth } = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  console.log(JSON.stringify(auth));
  console.log("restricted route...");
  console.log(auth.role);

  //   return auth?.accountComplete ? (
  return auth?.role ? <Outlet /> : <Navigate to="/onboarding" state={{ from }} replace />;

  // Perhaps add this. But should be added around the normal routes (home, posts etc) in App.tsx instead of onboarding path:
};

export default PrivateRoute;
