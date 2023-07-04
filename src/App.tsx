import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navigation from "./Layouts/Navigation/Navigation";
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
          {/* <Route index element={<Home />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* <Route
            element={
              <>
                <RequireAuth />

                <NavBar />
                <SideNav />
              </>
            }
          > */}
          {/* <Route
            element={
              <>
                <NavBar />
                <SideNav />
              </>
            }
          > */}
          <Route
            element={
              <>
                <Navigation />
              </>
            }
          >
            {/* <ProtectedRoute path="" element={<Home />} /> */}
            {/* <Route path="" element={<Home />} /> */}
            <Route element={<RequireAuth />}>
              <Route path="account" element={<Account />} />
              <Route path="" element={<Home />} />
            </Route>
          </Route>
        </Route>
        {/* <Route path="/login" element={<Login />}> */}
        {/* <Route element={<Login />} /> */}
        {/* </Route> */}
      </Routes>
    </>
  );
};

export default App;
