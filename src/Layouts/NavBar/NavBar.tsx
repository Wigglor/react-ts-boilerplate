import { ReactElement, useEffect, useState } from "react";
import { MdManageAccounts } from "react-icons/md";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLogout from "../../hooks/useLogOut";
import useWorkSpaces from "../../hooks/useWorkSpaces";
import styles from "./NavBar.module.scss";

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
  memberships: {
    company: {
      id: string;
      name: string;
    };
  }[];
};

const NavBar = (): ReactElement => {
  const navigate = useNavigate();
  const logout = useLogout();
  const { workSpaces, setWorkSpaces } = useWorkSpaces();
  const [selectedWorkspace, setSelectedWorkspace] = useState<string>("");
  const axiosPrivate = useAxiosPrivate();
  const fetchWorkSpaces = async () => {
    try {
      const response: ApiResponse<WorkSpaceResponse> = await axiosPrivate.get(
        "/subscription/workspaces",
        {
          withCredentials: true,
        },
      );

      const availableWorkSpaces = response.data.memberships.map((wp) => {
        return { name: wp.company.name, id: wp.company.id };
      });
      console.log(JSON.stringify(response));
      // setWorkSpaces({
      //   availableWorkSpaces: availableWorkSpaces,
      //   selectedWorkSpace: {
      //     name: response?.data.memberships[0].company.name,
      //     id: response?.data.memberships[0].company.id,
      //   },
      // });
    } catch (err) {
      console.error(err);
    }
  };
  // const workSpace = localStorage.getItem("workSpace");
  /*if (workSpaces.selectedWorkSpace === null) {
    fetchWorkSpaces();
  }*/
  const workSpace = workSpaces.selectedWorkSpace.name;
  // const workSpaces = JSON.parse(localStorage.getItem("workSpaces") as string);
  useEffect(() => {
    /*const defaultWorkspace = workSpaces.availableWorkSpaces.find(
      (wp: Workspace) => wp.name === workSpace,
    );
    if (defaultWorkspace) {
      setSelectedWorkspace(selectedWorkspace);
    }*/
    // fetchWorkSpaces();
    setSelectedWorkspace(workSpace);
  }, [selectedWorkspace]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    const selectedWorkSpace_ = workSpaces.availableWorkSpaces.find(
      (wp: Workspace) => wp.name === event.target.value,
    );
    console.log(workSpaces.availableWorkSpaces[1]);
    console.log(selectedWorkSpace_);
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
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <ul>
            <li>
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
