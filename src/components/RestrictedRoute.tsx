import { Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// const RestrictedRoute = ({ children, ...rest }) => {
const RestrictedRoute = () => {
  // const { isAuthenticated, hasCompletedSetup } = useAuth();
  const { auth } = useAuth();
  const location = useLocation();
  console.log(JSON.stringify(auth));
  console.log("restricted route...");

  //   return auth?.accessToken ? (
  //     <Outlet />
  //   ) : (
  //     <Navigate to="/login" state={{ from: location }} replace />
  //   );

  return <Outlet />;
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
