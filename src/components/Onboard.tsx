import { Outlet /*useLocation*/ } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// const RestrictedRoute = ({ children, ...rest }) => {
const Onboard = () => {
  // const { isAuthenticated, hasCompletedSetup } = useAuth();
  //   const { auth } = useAuth();
  //   const location = useLocation();

  //   const from = location.state?.from?.pathname || "/";

  return <Outlet />;
};

export default Onboard;
