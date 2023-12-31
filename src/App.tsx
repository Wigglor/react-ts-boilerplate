import { Route, Routes } from "react-router-dom";
// import "./App.scss";
import NavBar from "./Layouts/NavBar/NavBar";
import Navigation from "./Layouts/Navigation/Navigation";
import OnboardingRoute from "./components/OnboardingRoute";
import PersistLogin from "./components/PersistLogin";
// import "./style.css";
// import RequireAuth from "./components/requireAuth";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Account from "./pages/Account/Account";
import Billing from "./pages/Billing/Billing";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Home/Home";
import Invite from "./pages/Invite/Invite";
import Organization from "./pages/Organization/Organization";
import PaymentStatus from "./pages/PaymentStatus/PaymentStatus";
import Posts from "./pages/Posts/Posts";
import Premium from "./pages/Premium/Premium";
import ReactFormTest2 from "./pages/ReactFormTest2/ReactFormTest2";
import Register2 from "./pages/Register/Register2";
import RegistrationConfirmation from "./pages/RegistrationConfirmation/RegistrationConfirmation";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Onboarding from "./pages/Signup/Onboarding";
import SocialCallback from "./pages/SocialCallback/SocialCallback";
import Unauthorized from "./pages/Unauthorized/Unauthorized";

const App = () => {
  const ROLES = {
    pending: "PENDING",
    user: "USER",
    admin: "ADMIN",
  };

  return (
    <>
      <Routes>
        <Route path="/">
          {/* <Route path="testform" element={<ReactFormTest />} />
          <Route path="testform2" element={<ReactFormTest2 />} /> */}
          {/* <Route path="login" element={<ReactFormTest2 />} /> */}
          {/* <Route path="register" element={<Login />} />
          <Route path="forgotpassword" element={<Register />} /> */}
          <Route element={<NavBar />}>
            <Route path="unauthorized" element={<Unauthorized />} />
          </Route>

          <Route element={<PersistLogin />}>
            {/* ---------------------------------------------------------- */}
            {/* PLACE WorkSpacesProvider here */}
            {/* <WorkSpacesProvider> */}
            {/* ---------------------------------------------------------- */}
            {/* <Route element={<RequireAuth allowedRoles={[ROLES.pending]} />}> 
                <Route path="onboarding" element={<Onboarding />} />
              </Route> */}
            <Route element={<NavBar />}>
              <Route element={<OnboardingRoute />}>
                <Route path="onboarding" element={<Onboarding />} />
              </Route>
            </Route>

            {/* <Route element={<RequireAuth allowedRoles={[ROLES.user, ROLES.admin]} />}> */}
            <Route element={<PublicRoute />}>
              <Route path="login" element={<ReactFormTest2 />} />
              <Route path="register" element={<Register2 />} />
              <Route path="socialcallback" element={<SocialCallback />} />
              <Route path="invite" element={<Invite />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset" element={<ResetPassword />} />
              <Route path="register-confirmation" element={<RegistrationConfirmation />} />
              {/* <Route path="forgotpassword" element={<Register />} /> */}
            </Route>
            {/* <Route> */}
            <Route element={<PrivateRoute allowedRoles={[ROLES.user, ROLES.admin]} />}>
              <Route element={<Navigation />}>
                <Route path="" element={<Home />} />
                <Route path="paymentstatus" element={<PaymentStatus />} />
                <Route path="account" element={<Account />} />
                <Route path="organization" element={<Organization />} />
                <Route path="posts" element={<Posts />} />
                <Route path="billing" element={<Billing />} />
                <Route path="premium" element={<Premium />} />
                {/* <Route element={<OnboardingRoute />}>
                  <Route path="onboardingg" element={<Onboarding />} />
                </Route> */}
              </Route>
            </Route>
            {/* </Route> */}
            {/* </WorkSpacesProvider> */}
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
