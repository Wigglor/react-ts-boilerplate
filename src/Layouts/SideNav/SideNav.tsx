import { ReactElement } from "react";
import { AiOutlineExport } from "react-icons/ai";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import { MdManageAccounts } from "react-icons/md";
import { SlGraph } from "react-icons/sl";
import { Link, Outlet } from "react-router-dom";
import styles from "./SideNav.module.scss";

const SideNav = (): ReactElement => {
  return (
    <>
      <aside className={styles.sidenav}>
        <div className={styles.sidenav__content}>
          <ul>
            <li>
              <div>
                <Link to="/files">
                  <BsFileEarmarkSpreadsheet />
                  <span>Files</span>
                </Link>
              </div>
            </li>
            <li>
              <div>
                <Link to="/exports">
                  <AiOutlineExport />
                  <span>Exports</span>
                </Link>
              </div>
            </li>
            <li>
              <div>
                <Link to="/analytics">
                  <SlGraph />
                  <span>Analytics</span>
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
            <li>
              <div>
                <Link to="/posts">
                  <MdManageAccounts />
                  <span>Posts</span>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </aside>
      {/* <div className={styles.sidenav}>
    
        <div className={styles["sidenav__content"]}>
          
          <ul>
            <li>
              <div>
                <Link to="/files">
                  <BsFileEarmarkSpreadsheet />
                  <span>Files</span>
                </Link>
              </div>
            </li>
            <li>
              <div>
                <Link to="/exports">
                  <AiOutlineExport />
                  <span>Exports</span>
                </Link>
              </div>
            </li>
            <li>
              <div>
                <Link to="/analytics">
                  <SlGraph />
                  <span>Analytics</span>
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
            <li>
              <div>
                <Link to="/posts">
                  <MdManageAccounts />
                  <span>Posts</span>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </div> */}

      <Outlet />
    </>
  );
};

export default SideNav;
