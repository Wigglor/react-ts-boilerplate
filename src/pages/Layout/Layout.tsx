import { ReactElement } from "react";
import { CiExport } from "react-icons/ci";
import { GoTasklist } from "react-icons/go";
import { MdManageAccounts } from "react-icons/md";
import { SlGraph } from "react-icons/sl";
import { Link, Outlet } from "react-router-dom";
import "./Layout.scss";

const Layout = (): ReactElement => {
  return (
    <>
      {/* <main> */}
      {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav> */}
      <div className="sidebar">
        {/* <div> */}
        <div>Logo</div>
        <ul>
          <li>
            <div>
              <Link to="/tasks">
                <GoTasklist />
                <span>Tasks</span>
              </Link>
            </div>
          </li>
          <li>
            <div>
              <Link to="/visualization">
                <SlGraph />
                <span>Visualization</span>
              </Link>
            </div>
          </li>
          <li>
            <div>
              <Link to="/exports">
                <CiExport />
                <span>Exports</span>
              </Link>
            </div>
          </li>
          <li>
            <div>
              <Link to="/account">
                <MdManageAccounts />
                <span>Account</span>
              </Link>
            </div>
          </li>
        </ul>
        {/* </div> */}
      </div>
      {/* </main> */}

      <Outlet />
    </>
  );
};

export default Layout;
