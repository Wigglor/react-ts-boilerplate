import { Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// const RestrictedRoute = ({ children, ...rest }) => {
const Onboard = () => {
  // const { isAuthenticated, hasCompletedSetup } = useAuth();
  const { auth } = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  return <Outlet />;
  //   return !auth?.accountComplete ? <Outlet /> : <Navigate to="/login" state={{ from }} replace />;

  /* Perhaps add this. But should be added around the normal routes (home, posts etc) in App.tsx instead of onboarding path:
const PrivateRoute = ({ children, ...rest }) => {
    let { isAuthenticated, hasCompletedSetup } = useAuth();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
                    hasCompletedSetup ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/account-setup",
                                state: { from: location }
                            }}
                        />
                    )
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;

*/
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

export default Onboard;
