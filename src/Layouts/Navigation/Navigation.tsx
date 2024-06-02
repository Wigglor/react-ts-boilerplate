import {
  BarChart4,
  CircleDollarSign,
  CircleUserRound,
  Home,
  Inbox,
  LogOut,
  Menu,
  Settings,
  Sparkles,
  Target,
  User,
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
  const sidebarItems = [
    { icon: Home, text: "Home" },
    { icon: User, text: "Profile" },
    { icon: Settings, text: "Settings" },
  ];

  const logout = useLogout();
  const { workspaceData, updateWorkspaceData } = useWorkSpaces();
  const [stateSelectedWorkspace, setSelectedWorkspace] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expanded, setExpanded] = useState(true);
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
    const selectedWorkSpace_ = workspaceData.availableWorkSpaces.find(
      (wp: Workspace) => wp.name === event.target.value,
    );
    setSelectedWorkspace(event.target.value);
    const newWorkspaceData = { ...workspaceData };
    newWorkspaceData.availableWorkSpaces = workspaceData.availableWorkSpaces;
    newWorkspaceData.selectedWorkSpace = selectedWorkSpace_ as { name: string; id: string };
    updateWorkspaceData(newWorkspaceData);
  };

  const toggleSidenav = () => {
    console.log("toggling sidenav");
    setIsCollapsed(!isCollapsed);
  };

  const signOut = async () => {
    await logout();
  };

  const sideNavItems = [
    {
      icon: Sparkles,
      text: "Discover",
      to: "/premium",
    },
    {
      icon: BarChart4,
      text: "Analytics",
      to: "/analytics",
    },
    {
      icon: Inbox,
      text: "Inboxes",
      to: "/inboxes",
    },
    {
      icon: Users,
      text: "People",
      to: "/organization",
    },
    {
      icon: Settings,
      text: "Account",
      to: "/account",
    },
    {
      icon: CircleDollarSign,
      text: "Billing",
      to: "/billing",
    },
  ];

  return (
    <>
      <div className="bg-gray-50 dark:bg-neutral-950">
        <header
          className={`${
            isCollapsed ? "lg:ms-[96px]" : "lg:ms-[192px]"
          } transition-all duration-300 fixed top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-30 bg-white border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700`}
        >
          <div
            className="flex justify-between basis-full items-center w-full py-2.5 px-2 sm:px-5"
            aria-label="Global"
          >
            <Menu className="ml-2 cursor-pointer" onClick={() => toggleSidenav()} />

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
                    <Link to="/organization" className="cursor-pointer" onClick={closeDropdown}>
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
        </header>

        <aside
          className={`bg-gray-800 hs-overlay transition-all duration-300 transform hidden fixed inset-y-0 start-0 z-30 border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 dark:border-neutral-700  ${
            isCollapsed ? "w-24" : "w-48"
          }`}
        >
          <div className="">
            <div className="flex justify-center bg-gray-800 basis-full items-center w-full py-2.5">
              <Link to="/">
                <Target className="text-white/80" />
              </Link>
            </div>
            <div className="flex flex-col justify-between">
              <div className="p-4 pt-5 flex justify-center">
                <ul className={` text-white/80  ${isCollapsed ? "items-center" : ""}`}>
                  {sideNavItems.slice(0, 3).map((item, index) => (
                    <li key={index} className="flex items-center p-2">
                      <Link
                        to={item.to}
                        className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white/80 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      >
                        <item.icon className="w-6 h-6 mx-auto" />
                        <div
                          className={`flex-1 overflow-hidden ${
                            isCollapsed ? "w-0" : "w-auto"
                          } transition-all duration-300`}
                        >
                          <span
                            className={`opacity-0 ${
                              !isCollapsed ? "opacity-100 delay-100" : ""
                            } transition-opacity duration-200`}
                          >
                            {item.text}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute bottom-0 inset-x-0 p-4 pt-5 mt-3 mb-1.5 border-t border-gray-200 first:border-transparent first:pt-0 dark:border-neutral-700 dark:first:border-transparent">
                {workspaceData.selectedWorkSpace.id.length > 0 && (
                  <div>
                    <select
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
                <ul className={` text-white/80 ${isCollapsed ? "items-center" : ""}`}>
                  {sideNavItems.slice(-3).map((item, index) => (
                    <li key={index} className="flex items-center p-2">
                      <Link
                        to={item.to}
                        className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white/80 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      >
                        <item.icon className="w-6 h-6 mx-auto" />
                        <div
                          className={`flex-1 overflow-hidden ${
                            isCollapsed ? "w-0" : "w-auto"
                          } transition-all duration-300`}
                        >
                          <span
                            className={`opacity-0 ${
                              !isCollapsed ? "opacity-100 delay-100" : ""
                            } transition-opacity duration-200`}
                          >
                            {item.text}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </aside>

        <main
          id="content"
          role="main"
          className={`transition-all duration-300 transform ${
            isCollapsed ? "lg:ms-[96px]" : "lg:ms-[192px]"
          } h-screen pt-[59px]`}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Navigation;
