import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

type Roles = {
  pending: string;
  user: string;
  admin: string;
};

type RequireAuthProps = {
  allowedRoles: string[];
};

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const { auth } = useAuth();
  const location = useLocation();

  // return auth?.accessToken ? (
  //   // auth?.accountComplete ? (
  //   auth?.role ? (
  //     <Outlet />
  //   ) : (
  //     <Navigate to="/onboarding" state={{ from: location }} replace />
  //   )
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  // );
  console.log(allowedRoles);
  return allowedRoles?.includes(auth?.role as string) ? (
    // auth?.accountComplete ? (

    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
  /* return allowedRoles?.includes(auth?.role as string) ? (
    // auth?.accountComplete ? (
    auth?.role ? (
      <Outlet />
    ) : (
      <Navigate to="/onboarding" state={{ from: location }} replace />
    )
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );*/

  // return auth?.accessToken ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/login" state={{ from: location }} replace />
  //   // <Navigate to="/unauthorized" state={{ from: location }} replace />
  // );
};

// const RequireAuth = ({ allowedRoles }) => {
//     const { auth } = useAuth();
//     const location = useLocation();

//     return (
//         auth?.roles?.find(role => allowedRoles?.includes(role))
//             ? <Outlet />
//             : auth?.user
//                 ? <Navigate to="/unauthorized" state={{ from: location }} replace />
//                 : <Navigate to="/login" state={{ from: location }} replace />
//     );
// }

export default RequireAuth;
