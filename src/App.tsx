import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navigation from "./Layouts/Navigation/Navigation";
import PersistLogin from "./components/PersistLogin";
import RequireAuth from "./components/requireAuth";
import Account from "./pages/Account/Account";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
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
          <Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route
            element={
              <>
                <Navigation />
                {/* <PersistLogin /> */}
              </>
            }
          >
            <Route
              element={
                <>
                  {/* <Navigation /> */}
                  <PersistLogin />
                </>
              }
            >
              <Route element={<RequireAuth />}>
                <Route path="" element={<Home />} />
                <Route path="account" element={<Account />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
