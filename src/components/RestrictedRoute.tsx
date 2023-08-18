import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// const RestrictedRoute = ({ children, ...rest }) => {
const RestrictedRoute = () => {
  // const { isAuthenticated, hasCompletedSetup } = useAuth();
  const { auth } = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  console.log(JSON.stringify(auth));
  console.log("restricted route...");
  console.log(auth.accountComplete);

  //   return auth?.accessToken ? (
  //     <Outlet />
  //   ) : (
  //     <Navigate to="/login" state={{ from: location }} replace />
  //   );

  //   return <Outlet />;
  return !auth?.accountComplete ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from }} replace />
    // <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
  // return (
  //     <Route
  //         {...rest}
  //         render={({ location }) =>
  //             isAuthenticated && !hasCompletedSetup ? (
  //                 children
  //             ) : (
  //                 <Redirect
  //                     to={{
  //                         pathname: hasCompletedSetup ? "/dashboard" : "/login",
  //                         state: { from: location }
  //                     }}
  //                 />
  //             )
  //         }
  //     />
  // );
};

export default RestrictedRoute;
