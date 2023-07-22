import { ReactElement } from "react";
import { MdManageAccounts } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogOut";
import styles from "./NavBar.module.scss";

const NavBar = (): ReactElement => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    localStorage.removeItem("isLoggedIn");
    await logout();
    // navigate('/linkpage');
  };
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <ul>
          <li>
            {/* <a href="/">Home</a> */}
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li className={styles.dropdown}>
            <a href="#">Services</a>
            <ul className={styles["dropdown-menu"]}>
              <li>
                <a href="#">Service 1</a>
              </li>
              <li>
                <a href="#">Service 2</a>
              </li>
              <li>
                <a href="#">Service 3</a>
              </li>
            </ul>
          </li>
        </ul>

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
              <Link to="/account">Account Settings</Link>
            </li>
            <li>
              <Link to="/login" onClick={signOut}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
