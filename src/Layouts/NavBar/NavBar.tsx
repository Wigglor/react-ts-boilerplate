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
  const [stateSelectedWorkspace, setSelectedWorkspace] = useState<string>("");
  const axiosPrivate = useAxiosPrivate();

  /*useEffect(() => {
    const workSpace: string | undefined = workSpaces.selectedWorkSpace?.name;
    setSelectedWorkspace(workSpace);
    console.log(JSON.stringify(`selectedWorkspace: ${selectedWorkspace}`));
  }, [selectedWorkspace]);*/

  useEffect(() => {
    const workSpace: string | undefined = workSpaces.selectedWorkSpace?.name;
    setSelectedWorkspace(workSpace);
    console.log(JSON.stringify(`selectedWorkspace: ${stateSelectedWorkspace}`));
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    const selectedWorkSpace_ = workSpaces.availableWorkSpaces.find(
      (wp: Workspace) => wp.name === event.target.value,
    );
    setSelectedWorkspace(event.target.value);
    setWorkSpaces((prevState) => {
      return { ...prevState, selectedWorkSpace: selectedWorkSpace_! };
    });
    console.log(`setSelectedWorkspace: ${stateSelectedWorkspace}`);
    console.log(`workSpaces: ${JSON.stringify(workSpaces.selectedWorkSpace)}`);
  };

  const signOut = async () => {
    await logout();
  };
  return (
    <>
      <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
        <nav
          className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <a className="flex-none text-xl font-semibold dark:text-white" href="#">
              Home
            </a>
            <div className="sm:hidden">
              <button
                type="button"
                className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                data-hs-collapse="#navbar-with-mega-menu"
                aria-controls="navbar-with-mega-menu"
                aria-label="Toggle navigation"
              >
                <svg
                  className="hs-collapse-open:hidden flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            {workSpaces.selectedWorkSpace.id.length > 0 && (
              <>
                <label htmlFor="hs-hidden-select" className="sr-only">
                  workspace
                </label>
                <select
                  id="hs-hidden-select"
                  className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                  value={stateSelectedWorkspace}
                  onChange={handleChange}
                >
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
              </>
            )}
          </div>

          <div
            id="navbar-with-mega-menu"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
          >
            <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
              <a
                className="font-medium text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
                aria-current="page"
              >
                Landing
              </a>
              <a
                className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                Account
              </a>
              <a
                className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                Work
              </a>
              <a
                className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                href="#"
              >
                Blog
              </a>

              <div className="hs-dropdown [--strategy:static] sm:[--strategy:fixed] [--adaptive:none]">
                <button
                  id="hs-mega-menu-basic-dr"
                  type="button"
                  className="flex items-center w-full text-gray-600 hover:text-gray-400 font-medium dark:text-gray-400 dark:hover:text-gray-500 "
                >
                  <img
                    className="inline-block h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                    alt="Image Description"
                  ></img>
                  {/* Dropdown
                  <svg
                    className="ms-1 flex-shrink-0 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg> */}
                </button>

                <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 z-10 bg-white sm:shadow-md rounded-lg p-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute top-full sm:border before:-top-5 before:start-0 before:w-full before:h-5 hidden">
                  <a
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    href="#"
                  >
                    About
                  </a>
                  <div className="hs-dropdown relative [--strategy:static] sm:[--strategy:absolute] [--adaptive:none]">
                    <button
                      type="button"
                      className="w-full flex justify-between w-full items-center text-sm text-gray-800 rounded-lg py-2 px-3 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    >
                      Sub Menu
                      <svg
                        className="sm:-rotate-90 ms-2 flex-shrink-0 w-4 h-4 text-gray-600"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>

                    <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 sm:mt-2 bg-white sm:shadow-md rounded-lg p-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute sm:border before:-end-5 before:top-0 before:h-full before:w-5 top-0 end-full !mx-[10px]">
                      <a
                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                        href="#"
                      >
                        About
                      </a>
                      <a
                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                        href="#"
                      >
                        Downloads
                      </a>
                      <a
                        className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                        href="#"
                      >
                        Team Account
                      </a>
                    </div>
                  </div>

                  <a
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    href="#"
                  >
                    Downloads
                  </a>

                  <Link
                    className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                    to="/login"
                    onClick={signOut}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                ></img>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    Dashboard
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Team
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Projects
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Calendar
                  </a>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>

              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    ></img>
                  </button>
                </div>

                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    id="user-menu-item-1"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    id="user-menu-item-2"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a
              href="#"
              className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Team
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Projects
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Calendar
            </a>
          </div>
        </div>
      </nav>

      <header>
        <nav>
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
            <li>
              <a href="#">Services</a>
              <ul>
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
          <div className="hs-dropdown relative inline-flex">
            <button
              id="hs-dropdown-unstyled"
              type="button"
              className="hs-dropdown-toggle inline-flex justify-center items-center gap-x-2"
            >
              Actions
            </button>

            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 w-56 hidden z-10 mt-2 min-w-[15rem] bg-white"
              aria-labelledby="hs-dropdown-unstyled"
            >
              <a className="block" href="#">
                Newsletter
              </a>
              <a className="block" href="#">
                Purchases
              </a>
              <a className="block" href="#">
                Downloads
              </a>
              <a className="block" href="#">
                Team Account
              </a>
            </div>
          </div>

          {workSpaces.selectedWorkSpace.id.length > 0 && (
            <div>
              <label>
                workspace
                <select value={stateSelectedWorkspace} onChange={handleChange}>
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
          )}

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
