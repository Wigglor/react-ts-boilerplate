import { ReactElement, useEffect, useState } from "react";
// import { MdManageAccounts } from "react-icons/md";
import { CircleUserRound, Home } from "lucide-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLogout from "../../hooks/useLogOut";
import useWorkSpaces from "../../hooks/useWorkSpaces";

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

type WorkSpaces = {
  availableWorkSpaces: {
    name: string;
    id: string;
  }[];
  selectedWorkSpace: {
    name: string;
    id: string;
  };
};

const NavBar = (): ReactElement => {
  const navigate = useNavigate();
  const logout = useLogout();
  // const { workSpaces, setWorkSpaces } = useWorkSpaces();
  const { workspaceData, updateWorkspaceData } = useWorkSpaces();
  const [stateSelectedWorkspace, setSelectedWorkspace] = useState<string>("");
  const axiosPrivate = useAxiosPrivate();
  const { setAuth, auth } = useAuth();

  /*useEffect(() => {
    const workSpace: string | undefined = workSpaces.selectedWorkSpace?.name;
    setSelectedWorkspace(workSpace);
    (JSON.stringify(`selectedWorkspace: ${selectedWorkspace}`));
  }, [selectedWorkspace]);*/

  useEffect(() => {
    // const workSpace: string | undefined = workSpaces.selectedWorkSpace?.name;
    const workSpace: string | undefined = workspaceData.selectedWorkSpace?.name;
    setSelectedWorkspace(workSpace);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // const selectedWorkSpace_ = workSpaces.availableWorkSpaces.find(
    const selectedWorkSpace_ = workspaceData.availableWorkSpaces.find(
      (wp: Workspace) => wp.name === event.target.value,
    );
    setSelectedWorkspace(event.target.value);
    // setWorkSpaces((prevState) => {
    updateWorkspaceData({
      availableWorkSpaces: workspaceData.availableWorkSpaces,
      selectedWorkSpace: selectedWorkSpace_ as { name: string; id: string },
    });

    // updateWorkspaceData((prevState: any) => {
    //   return { ...prevState, selectedWorkSpace: selectedWorkSpace_! };
    // });
  };

  const signOut = async () => {
    await logout();
  };
  return (
    <>
      <header className="bg-gray-500 z-10 flex-no-wrap relative flex items-center">
        <div className="bg-gray-900">
          <div className="flex">
            <Link to="/">
              <Home className="text-slate-50" />
            </Link>
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center justify-between">
          <div className="relative inline-block text-left"></div>

          {/* {workSpaces.selectedWorkSpace.id.length > 0 && ( */}
          {workspaceData.selectedWorkSpace.id.length > 0 && (
            <div>
              <select
                className="rounded-lg cursor-pointer"
                value={stateSelectedWorkspace}
                onChange={handleChange}
              >
                {/* {workSpaces.selectedWorkSpace ? ( */}
                {workspaceData.selectedWorkSpace ? (
                  // workSpaces.availableWorkSpaces.map((item: Workspace) => (
                  workspaceData.availableWorkSpaces.map((item: Workspace) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </select>
            </div>
          )}

          <div className="group">
            <CircleUserRound className="cursor-pointer" />
            <ul className="bg-white shadow-lg rounded-md border absolute hidden group-hover:block transition-all duration-500 ease right-2">
              <li className="px-2 ">
                <p>signed in as</p>
                <p>
                  <b>{auth.user}</b>
                  {/* <b>Testuser</b> */}
                </p>
              </li>
              <li className="px-2">
                <Link to="/organization">Organization</Link>
              </li>
              <li className="px-2">
                <Link to="/account">Account Settings</Link>
              </li>
              <li className="px-2">
                <Link to="/login" onClick={signOut}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <Outlet />
    </>
    // <>
    //   {/* <header className={styles.header}> */}
    //   <header className="bg-slate-500 fixed top-0 left-0 right-0 z-10">
    //     {/* <nav className={styles.navbar}> */}
    //     <nav className="flex items-center justify-between p-4">
    //       <ul className="flex">
    //         <li className="p-2">
    //           <Link to="/">Home</Link>
    //         </li>
    //         <li className="p-2">
    //           <Link to="/about">About</Link>
    //         </li>
    //         <li className="p-2">
    //           <Link to="/contact">Contact</Link>
    //         </li>
    //         {/* <li className={styles.dropdown}> */}
    //         <li className="p-2">
    //           <a href="#">Services</a>
    //           {/* <ul className={styles["dropdown-menu"]}> */}
    //           <ul className="hidden">
    //             <li>
    //               <a href="#">Service 1</a>
    //             </li>
    //             <li>
    //               <a href="#">Service 2</a>
    //             </li>
    //             <li>
    //               <a href="#">Service 3</a>
    //             </li>
    //           </ul>
    //         </li>
    //       </ul>

    //       {workSpaces.selectedWorkSpace.id.length > 0 && (
    //         <div>
    //           <label>
    //             workspace
    //             <select
    //               value={stateSelectedWorkspace}
    //               onChange={handleChange}
    //               className="py-2 px-3 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
    //             >
    //               {workSpaces.selectedWorkSpace ? (
    //                 workSpaces.availableWorkSpaces.map((item: Workspace) => (
    //                   <option key={item.id} value={item.name}>
    //                     {item.name}
    //                   </option>
    //                 ))
    //               ) : (
    //                 <></>
    //               )}
    //             </select>
    //           </label>
    //         </div>
    //       )}

    //       <div className="relative group">
    //         <Link to="/account">
    //           <MdManageAccounts />
    //         </Link>
    //         <ul className="hidden bg-orange-400 absolute w-48 top-3/4 group-hover:block  transform -translate-x-1/2">
    //           <li>
    //             <p>signed in as</p>
    //             <p>
    //               <b>Testuser</b>
    //             </p>
    //           </li>
    //           <li>
    //             <Link to="/account">Account Settings</Link>
    //           </li>
    //           <li>
    //             <Link to="/login" onClick={signOut}>
    //               Logout
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>
    //     </nav>
    //   </header>
    //   <Outlet />
    // </>
  );
};

export default NavBar;
