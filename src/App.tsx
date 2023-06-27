import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";

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
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>
        {/* <Route path="/login" element={<Login />}> */}
        {/* <Route element={<Login />} /> */}
        {/* </Route> */}
      </Routes>
    </>
  );
};

export default App;
