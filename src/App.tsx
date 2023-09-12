import { Route, Routes } from "react-router-dom";
import "./App.scss";
import NavBar from "./Layouts/NavBar/NavBar";
import Navigation from "./Layouts/Navigation/Navigation";
import OnboardingRoute from "./components/OnboardingRoute";
import PersistLogin from "./components/PersistLogin";
// import RequireAuth from "./components/requireAuth";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Account from "./pages/Account/Account";
import Billing from "./pages/Billing/Billing";
import Home from "./pages/Home/Home";
import Posts from "./pages/Posts/Posts";
import ReactFormTest2 from "./pages/ReactFormTest2/ReactFormTest2";
import Register from "./pages/Register/Register";
import Register2 from "./pages/Register/Register2";
import RegistrationConfirmation from "./pages/RegistrationConfirmation/RegistrationConfirmation";
import Onboarding from "./pages/Signup/Onboarding";
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
              <Route path="register-confirmation" element={<RegistrationConfirmation />} />
              <Route path="forgotpassword" element={<Register />} />
            </Route>
            {/* <Route> */}
            <Route element={<PrivateRoute allowedRoles={[ROLES.user, ROLES.admin]} />}>
              <Route element={<Navigation />}>
                <Route path="" element={<Home />} />
                <Route path="account" element={<Account />} />
                <Route path="posts" element={<Posts />} />
                <Route path="billing" element={<Billing />} />
                {/* <Route element={<OnboardingRoute />}>
                  <Route path="onboardingg" element={<Onboarding />} />
                </Route> */}
              </Route>
            </Route>
            {/* </Route> */}
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
