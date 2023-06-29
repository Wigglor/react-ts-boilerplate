import { Route, Routes } from "react-router-dom";
import "./App.scss";
import NavBar from "./Layouts/NavBar/NavBar";
import SideNav from "./Layouts/SideNav/SideNav";
import Account from "./pages/Account/Account";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Unauthorized from "./pages/Unauthorized/Unauthorized";
// import RequireAuth from "./components/requireAuth";

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
          <Route
            element={
              <>
                <NavBar />
                <SideNav />
              </>
            }
          >
            <Route path="" element={<Home />} />
            <Route path="/account" element={<Account />} />
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
