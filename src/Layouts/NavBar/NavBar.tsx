import { ReactElement, useEffect, useState } from "react";
import { MdManageAccounts } from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLogout from "../../hooks/useLogOut";
import useWorkSpaces from "../../hooks/useWorkSpaces";
// import styles from "./NavBar.module.scss";

type Workspace = {
  name: string;
  id: string;
};

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

type WorkSpaceResponse = {
  userWithCompany: {
    memberships: {
      company: {
        id: string;
        name: string;
      };
    }[];
  };
};

const NavBar = (): ReactElement => {
  const navigate = useNavigate();
  const logout = useLogout();
  const { workSpaces, setWorkSpaces } = useWorkSpaces();
  const [selectedWorkspace, setSelectedWorkspace] = useState<string>("");
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const workSpace: string | undefined = workSpaces.selectedWorkSpace?.name;
    setSelectedWorkspace(workSpace);
  }, [selectedWorkspace]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    const selectedWorkSpace_ = workSpaces.availableWorkSpaces.find(
      (wp: Workspace) => wp.name === event.target.value,
    );
    setSelectedWorkspace(event.target.value);
    setWorkSpaces((prevState) => {
      return { ...prevState, selectedWorkSpace: selectedWorkSpace_! };
    });
  };

  const signOut = async () => {
    await logout();
  };
  return (
    <>
      {/* <header className={styles.header}> */}
      <header className="bg-slate-500 fixed top-0 left-0 right-0 z-10">
        {/* <nav className={styles.navbar}> */}
        <nav className="flex items-center justify-between p-4">
          <ul className="flex">
            <li className="p-2">
              <Link to="/">Home</Link>
            </li>
            <li className="p-2">
              <Link to="/about">About</Link>
            </li>
            <li className="p-2">
              <Link to="/contact">Contact</Link>
            </li>
            {/* <li className={styles.dropdown}> */}
            <li className="p-2">
              <a href="#">Services</a>
              {/* <ul className={styles["dropdown-menu"]}> */}
              <ul className="hidden">
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
                {workSpaces.selectedWorkSpace ? (
                  workSpaces.availableWorkSpaces.map((item: Workspace) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
            </label>
          </div>

          <div>
            <Link to="/account">
              <MdManageAccounts />
            </Link>
            <ul className="hidden">
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
