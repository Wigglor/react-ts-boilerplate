/* eslint-disable react/no-children-prop */
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./Layouts/NavBar/NavBar";
import Navigation from "./Layouts/Navigation/Navigation";
import OnboardingRoute from "./components/OnboardingRoute";
import PersistLogin from "./components/PersistLogin";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import WorkSpaceWrapper from "./components/WorkSpaceWrapper";
import Account from "./pages/Account/Account";
import Billing from "./pages/Billing/Billing";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Home/Home";
import Inboxes from "./pages/Inboxes/Inboxes";
import Invite from "./pages/Invite/Invite";
import Login from "./pages/Login/Login";
import Organization from "./pages/Organization/Organization";
import PaymentStatus from "./pages/PaymentStatus/PaymentStatus";
import Posts from "./pages/Posts/Posts";
import Premium from "./pages/Premium/Premium";
import Register from "./pages/Register/Register";
import RegistrationConfirmation from "./pages/RegistrationConfirmation/RegistrationConfirmation";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Onboarding from "./pages/Signup/Onboarding";
import SocialCallback from "./pages/SocialCallback/SocialCallback";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
// import { WorkSpacesProvider } from "./context/WorkSpacesProvider";
// import { WorkSpacesProvider } from "./context/WorkSpacesProvider";

// import "preline/preline";
import { HSDropdown, IStaticMethods } from "preline/preline";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
    DDStaticMethods: HSDropdown;
  }
}

const App = () => {
  const location = useLocation();

  // useEffect(() => {
  //   import("preline/preline");
  // }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     HSDropdown.autoInit();
  //   }, 100);
  // }, [location.pathname]);

  // useEffect(() => {
  //   window.HSStaticMethods.autoInit();
  // }, [location.pathname]);

  useEffect(() => {
    const loadPreline = async () => {
      await import("preline");
      window.HSStaticMethods.autoInit();
      // window.DDStaticMethods.;
      HSDropdown.autoInit();
    };
    loadPreline();
  }, [location.pathname]);

  const ROLES = {
    pending: "PENDING",
    user: "USER",
    admin: "ADMIN",
  };

  return (
    <>
      <Routes>
        <Route path="/">
          <Route element={<NavBar />}>
            <Route path="unauthorized" element={<Unauthorized />} />
          </Route>
          {/* <Route element={<PublicRoute />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="resend-verification" element={<ResendVerification />} />
            <Route path="socialcallback" element={<SocialCallback />} />
            <Route path="invite" element={<Invite />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset" element={<ResetPassword />} />
            <Route path="register-confirmation" element={<RegistrationConfirmation />} />
          </Route> */}
          <Route element={<WorkSpaceWrapper />}>
            {/* <Route path="login" element={<Login />} /> */}
            <Route element={<PersistLogin />}>
              {/* Wrap WorkSpacesProvider around something else and move PublicRoute content ABOVE PersistLogin */}
              <Route element={<NavBar />}>
                <Route element={<OnboardingRoute />}>
                  <Route path="onboarding" element={<Onboarding />} />
                </Route>
              </Route>

              <Route element={<PublicRoute />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="socialcallback" element={<SocialCallback />} />
                <Route path="invite" element={<Invite />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset" element={<ResetPassword />} />
                <Route path="register-confirmation" element={<RegistrationConfirmation />} />
              </Route>
              <Route element={<PrivateRoute allowedRoles={[ROLES.user, ROLES.admin]} />}>
                <Route element={<Navigation />}>
                  <Route path="" element={<Home />} />
                  <Route path="paymentstatus" element={<PaymentStatus />} />
                  <Route path="inboxes" element={<Inboxes />} />
                  <Route path="account" element={<Account />} />
                  <Route
                    path="organization"
                    // element={<Organization allowedRoles={[ROLES.user, ROLES.admin]} />}
                    element={<Organization allowedRoles={[ROLES.admin]} />}
                  />
                  <Route path="posts" element={<Posts />} />
                  <Route path="billing" element={<Billing />} />
                  <Route path="premium" element={<Premium />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
