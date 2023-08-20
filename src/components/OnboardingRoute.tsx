import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const OnboardingRoute = () => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(`OnboardingRoute: ${JSON.stringify(auth)}`);
  return auth?.role === "PENDING" ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default OnboardingRoute;
