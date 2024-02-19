import {
  CircleDollarSign,
  CircleUserRound,
  Inbox,
  LogOut,
  Menu,
  Settings,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { ReactElement, useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogOut";
import useWorkSpaces from "../../hooks/useWorkSpaces";

type Workspace = {
  name: string;
  id: string;
};

const Navigation = (): ReactElement => {
  const logout = useLogout();
  // const { workSpaces, setWorkSpaces } = useWorkSpaces();
  const { workspaceData, updateWorkspaceData } = useWorkSpaces();
  const [stateSelectedWorkspace, setSelectedWorkspace] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { setAuth, auth } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const workSpace: string | undefined = workspaceData.selectedWorkSpace?.name;
    setSelectedWorkspace(workSpace);
    // const workSpace: string | undefined = workSpaces.selectedWorkSpace?.name;
    // setSelectedWorkspace(workSpace);
  }, []);
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
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // const selectedWorkSpace_ = workSpaces.availableWorkSpaces.find(
    const selectedWorkSpace_ = workspaceData.availableWorkSpaces.find(
      (wp: Workspace) => wp.name === event.target.value,
    );
    setSelectedWorkspace(event.target.value);
    const newWorkspaceData = { ...workspaceData };
    newWorkspaceData.availableWorkSpaces = workspaceData.availableWorkSpaces;
    newWorkspaceData.selectedWorkSpace = selectedWorkSpace_ as { name: string; id: string };
    updateWorkspaceData(newWorkspaceData);
    // updateWorkspaceData({
    //   availableWorkSpaces: workspaceData.availableWorkSpaces,
    //   selectedWorkSpace: selectedWorkSpace_ as { name: string; id: string },
    // });
    // TRY THE BELOW INSTEAD OF MUTATING EXISTING DATA
    /*updateWorkspaceData({
      // Use spread operator to create a new array instance if modifications are needed
      availableWorkSpaces: [...workspaceData.availableWorkSpaces],
    
      // Ensure selectedWorkSpace is treated as a new object
      selectedWorkSpace: {...selectedWorkSpace_ as { name: string; id: string }},
    });
    
    -- OR(???):
    const newWorkspaceData = {...workspaceData};
    newWorkspaceData.availableWorkSpaces = workspaceData.availableWorkSpaces
    newWorkspaceData.selectedWorkSpace = selectedWorkSpace_ as { name: string; id: string }
    updateWorkspaceData(newWorkspaceData)
    
    */

    // setWorkSpaces((prevState) => {
    //   return { ...prevState, selectedWorkSpace: selectedWorkSpace_! };
    // });
  };

  //   const toggleSidenav = () => {
  //     setIsCollapsed(!isCollapsed);
  // };

  const signOut = async () => {
    await logout();
  };

  const sideNavItems = [
    // { icon: <Sparkles width="18" height="18" />, text: "Premium", to: "/premium" },
    { icon: <Sparkles width="18" height="18" />, text: "Discover", to: "/premium" },
    { icon: <Inbox width="18" height="18" />, text: "Inboxes", to: "/inboxes" },
    { icon: <Users width="18" height="18" />, text: "People", to: "/organization" },
    { icon: <Settings width="18" height="18" />, text: "Account", to: "/account" },
    { icon: <CircleDollarSign width="18" height="18" />, text: "Billing", to: "/billing" },
    // { icon: <Binary />, text: "Payment Status", to: "/paymentstatus" },
    // Add other navigation items as needed
  ];

  return (
    <>
      {/* <NavBar />
      <SideNav /> */}
      <>
        <main className="h-full">
          {/* <main className="h-full"> */}
          <div className="flex h-full">
            {/* Sidenav */}
            <div
              // <nav
              // className={`flex flex-col content-center transition-width duration-300 ${
              // className={`flex flex-col content-center transition-width duration-300 hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all transform fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700 ${
              className={`flex h-full flex-col content-center transition-width duration-300  border-e border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${
                // className={`flex h-full flex-col content-center transition-width bg-slate-300 duration-300  border-e border-gray-200  overflow-y-auto dark:bg-gray-800 dark:border-gray-700 ${
                isCollapsed ? "w-16" : "w-1/12"
              }`}
            >
              <nav className="h-full ">
                <div className="bg-gray-50 flex p-4 flex-col justify-center items-center">
                  <div className="">
                    <Link to="/">
                      <Target className="text-slate-700" />
                    </Link>
                  </div>
                </div>

                <div className="p-4 pt-5">
                  <ul
                    className={`text-slate-700 flex flex-col  ${isCollapsed ? "items-center" : ""}`}
                  >
                    {sideNavItems.slice(0, 2).map((item, index) => (
                      <li key={index} className="">
                        <Link
                          to={item.to}
                          className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        >
                          {item.icon}
                          <span className={`${isCollapsed ? "hidden" : "block"}`}>{item.text}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 pt-5 mt-3 mb-1.5 border-t border-gray-200 first:border-transparent first:pt-0 dark:border-neutral-700 dark:first:border-transparent">
                  <ul
                    className={`text-slate-700 flex flex-col  ${isCollapsed ? "items-center" : ""}`}
                  >
                    {sideNavItems.slice(-3).map((item, index) => (
                      <li key={index} className="">
                        <Link
                          to={item.to}
                          className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        >
                          {item.icon}
                          <span className={`${isCollapsed ? "hidden" : "block"}`}>{item.text}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>
            <div
              className={`transition-width duration-300 text-sm"> ${
                isCollapsed ? "w-[calc(100%-4rem)]" : "w-11/12"
              }`}
            >
              <nav className="z-10 mx-auto flex  justify-between items-center py-2 border-gray-200 border-b">
                <div className="flex w-full flex-wrap items-center justify-between">
                  <Menu
                    className="ml-2 cursor-pointer"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                  />

                  {workspaceData.selectedWorkSpace.id.length > 0 && (
                    <div>
                      <select
                        // data-hs-select='{
                        //   "placeholder": "Select option...",
                        //   "toggleTag": "<button type=\"button\"></button>",
                        //   "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-2 ps-3 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600",
                        //   "dropdownClasses": "mt-2 z-50 w-full max-h-[300px] p-1 space-y-0.5 overflow-hidden overflow-y-auto bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900",
                        //   "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                        //   "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"><svg className=\"flex-shrink-0 w-3.5 h-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                        // }'
                        // className="hidden"
                        className="px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        value={stateSelectedWorkspace}
                        onChange={handleChange}
                      >
                        {workspaceData.selectedWorkSpace ? (
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

                  <div className="relative" ref={dropdownRef}>
                    <CircleUserRound
                      onClick={toggleDropdown}
                      className="cursor-pointer mr-2 text-slate-700"
                    />
                    {isOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md py-1 z-50">
                        <ul className="">
                          <li className="px-2 bg-gray-200 text-slate-700">
                            <p>signed in as</p>
                            <p>
                              <b>Testuser</b>
                            </p>
                          </li>
                          <Link
                            to="/organization"
                            className="cursor-pointer"
                            onClick={closeDropdown}
                          >
                            <li className="px-3 py-1.5 text-slate-700 hover:bg-gray-100">
                              <CircleUserRound width="18" height="18" className="inline" />
                              <span className="pl-2 text-slate-700">Organization</span>
                            </li>
                          </Link>
                          <Link to="/account" className="cursor-pointer" onClick={closeDropdown}>
                            <li className="px-3 py-1.5 text-slate-700 hover:bg-gray-100 ">
                              <Settings width="18" height="18" className="inline" />
                              <span className="pl-2 text-slate-700">Account Settings</span>
                            </li>
                          </Link>
                          <Link to="/login" className="cursor-pointer" onClick={signOut}>
                            <li className="px-3 py-1.5 text-slate-700 hover:bg-gray-100">
                              <LogOut width="18" height="18" className="inline" />
                              <span className="pl-2 text-slate-700">Logout</span>
                            </li>
                          </Link>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </nav>
              <Outlet />
            </div>
          </div>
        </main>
      </>
    </>
  );
};

export default Navigation;
