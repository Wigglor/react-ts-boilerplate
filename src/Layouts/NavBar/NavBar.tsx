import { ReactElement } from "react";
import { MdManageAccounts } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.scss";

const NavBar = (): ReactElement => {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
        {/* <ul>
          <li>
            <Link to="/account">
              <MdManageAccounts />
            </Link>
          </li>
        </ul> */}

        <div>
          <Link to="/account">
            <MdManageAccounts />
          </Link>
          <ul>
            <li>
              <p>signed in as</p>
              <p>
                <b>Testuser</b>
              </p>
            </li>
            <li>
              <li>
                <Link to="/account">Account Settings</Link>
              </li>
            </li>
            <li>
              <Link to="/signout">Logout</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
