import { ReactElement, useEffect, useState } from "react";
import { MdManageAccounts } from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogOut";
import useWorkSpaces from "../../hooks/useWorkSpaces";
import styles from "./NavBar.module.scss";

type Workspace = {
  name: string;
  id: string;
};

const NavBar = (): ReactElement => {
  const navigate = useNavigate();
  const logout = useLogout();
  const { setAuth } = useAuth();
  const { workSpaces } = useWorkSpaces();
  const [selectedWorkspace, setSelectedWorkspace] = useState<string>("");
  // const workSpace = localStorage.getItem("workSpace");
  const workSpace = workSpaces.selectedWorkSpace.name;
  // const workSpaces = JSON.parse(localStorage.getItem("workSpaces") as string);
  useEffect(() => {
    /*const defaultWorkspace = workSpaces.availableWorkSpaces.find(
      (wp: Workspace) => wp.name === workSpace,
    );
    if (defaultWorkspace) {
      setSelectedWorkspace(selectedWorkspace);
    }*/

    setSelectedWorkspace(workSpace);
  }, [selectedWorkspace]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWorkspace(event.target.value);
  };

  const signOut = async () => {
    await logout();
  };
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <ul>
            <li>
              {/* <a href="/">Home</a> */}
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
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
            <label>
              workspace
              <select value={selectedWorkspace} onChange={handleChange}>
                {workSpaces.availableWorkSpaces.map((item: Workspace) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

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
      <Outlet />
    </>
  );
};

export default NavBar;
