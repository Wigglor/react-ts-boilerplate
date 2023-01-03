import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import Layout from "./pages/Layout/Layout";
import Login from "./pages/Login/Login";
import Tasks from "./pages/Tasks/Tasks";
import Visualization from "./pages/Visualization/Visualization";

const App = () => {
  // const [token, setToken] = useState<string | null>();

  // if (!token) {
  //   // return <Login setToken={setToken} />;
  //   return <Login />;
  // }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="visualization" element={<Visualization />} />
          {/* <Route path="Exports" element={<Exports />} /> */}
          {/* <Route path="Account" element={<Account />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
      {/* <Routes >{<Route path="/" element={<Call />} /> }</Routes> */}
    </>
  );
};

export default App;
