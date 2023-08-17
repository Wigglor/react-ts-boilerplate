import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navigation from "./Layouts/Navigation/Navigation";
import PersistLogin from "./components/PersistLogin";
import RestrictedRoute from "./components/RestrictedRoute";
import RequireAuth from "./components/requireAuth";
import Account from "./pages/Account/Account";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Posts from "./pages/Posts/Posts";
import ReactFormTest from "./pages/ReactFormTest/ReactFormTest";
import ReactFormTest2 from "./pages/ReactFormTest2/ReactFormTest2";
import Register from "./pages/Register/Register";
import Onboarding from "./pages/Signup/Onboarding";
import Unauthorized from "./pages/Unauthorized/Unauthorized";

const App = () => {
  // const [token, setToken] = useState<string | null>();

  // if (!token) {
  //   // return <Login setToken={setToken} />;
  //   return <Login />;
  // }

  return (
    <>
      <Routes>
        <Route path="/" /*element={<Layout />}*/>
          <Route path="testform" element={<ReactFormTest />} />
          <Route path="testform2" element={<ReactFormTest2 />} />
          <Route path="login" element={<ReactFormTest2 />} />
          <Route path="register" element={<Login />} />
          <Route path="forgotpassword" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          {/* <Route path="onboarding" element={<Onboarding />} /> */}
          {/* <Route element={<Navigation />}> */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route element={<RestrictedRoute />}>
                <Route path="onboarding" element={<Onboarding />} />
              </Route>
              <Route element={<Navigation />}>
                <Route path="" element={<Home />} />
                <Route path="account" element={<Account />} />
                <Route path="posts" element={<Posts />} />
              </Route>
            </Route>
          </Route>
          {/* </Route> */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
