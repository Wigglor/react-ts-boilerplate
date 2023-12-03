import { ReactElement, useEffect, useState } from "react";
import { MdManageAccounts } from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogOut";
import styles from "./NavBar.module.scss";

const NavBar = (): ReactElement => {
  const navigate = useNavigate();
  const logout = useLogout();
  const { setAuth } = useAuth();
  const [selectedWorkspace, setSelectedWorkspace] = useState<string>("");
  const workSpace = localStorage.getItem("workSpace") as string;
  const workSpaces: string[] = (localStorage.getItem("workSpaces") as string).split(",");
  console.log(workSpaces);
  useEffect(() => {
    const defaultWorkspace = workSpaces.find((wp) => wp === workSpace);
    if (defaultWorkspace) {
      setSelectedWorkspace(selectedWorkspace);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWorkspace(event.target.value);
  };

  const signOut = async () => {
    // localStorage.removeItem("isLoggedIn");
    // localStorage.removeItem("persist");
    await logout();
    // navigate('/linkpage');
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
                {workSpaces.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {/* <select name="selectedFruit">
                {workSpaces.map(wp=>{
                  (wp === workSpace)
                  
                  
                <option key={wp} value={wp}>{wp}</option>  
                
                
                })}
                <option value={workSpace}>{workSpace}</option>
                <option value="banana">Banana</option>
                <option value="orange">Orange</option>
              </select> */}
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
