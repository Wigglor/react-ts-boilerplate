import {
  ArrowRightLeft,
  CircleDollarSign,
  CircleUserRound,
  Home,
  Menu,
  Sparkles,
} from "lucide-react";
import { ReactElement, useEffect, useState } from "react";
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
  const { workSpaces, setWorkSpaces } = useWorkSpaces();
  const [stateSelectedWorkspace, setSelectedWorkspace] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { setAuth, auth } = useAuth();

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

  //   const toggleSidenav = () => {
  //     setIsCollapsed(!isCollapsed);
  // };

  const signOut = async () => {
    await logout();
  };

  const sideNavItems = [
    { icon: <Sparkles />, text: "Premium", to: "/premium" },
    { icon: <ArrowRightLeft />, text: "Organization", to: "/organization" },
    { icon: <CircleUserRound />, text: "Account", to: "/account" },
    { icon: <CircleDollarSign />, text: "Billing", to: "/billing" },
    // { icon: <Binary />, text: "Payment Status", to: "/paymentstatus" },
    // Add other navigation items as needed
  ];

  return (
    <>
      {/* <NavBar />
      <SideNav /> */}
      <main className="h-full">
        <div className="flex h-full">
          {/* <nav className="bg-gray-900 w-1/12"> */}
          <nav
            className={`flex flex-col content-center transition-width duration-300 ${
              isCollapsed ? "w-16" : "w-1/12"
            } bg-zinc-900`}
          >
            <div className="bg-orange-400 flex flex-col justify-center items-center">
              <div className="">
                <Link to="/">
                  <Home className="text-slate-50" />
                </Link>
              </div>
            </div>
            {/* <div
              className={`transition-width duration-300 ${
                isCollapsed ? "w-12" : "w-48"
              } h-full fixed top-0 left-0 bg-gray-200 flex flex-col`}
            >
              {sideNavItems.map((item, index) => (
                <Link key={index} to={item.to} className="flex items-center">
                  {item.icon}
                  <span className={` ${isCollapsed ? "hidden" : "block"}`}>{item.text}</span>
                </Link>
              ))}
            </div> */}

            <div>
              {/* <ul className="text-slate-50 flex flex-col justify-center items-center"> */}
              <ul className={`text-slate-50 flex flex-col ${isCollapsed ? "items-center" : ""}`}>
                {sideNavItems.map((item, index) => (
                  <li key={index} className="">
                    <Link to={item.to} className="flex items-center">
                      {item.icon}
                      <span className={`ml-4 ${isCollapsed ? "hidden" : "block"}`}>
                        {item.text}
                      </span>
                    </Link>
                  </li>
                ))}

                {/* <li>Dashboard</li>
                <li>Organisation</li>
                <li>Account</li> */}
              </ul>
            </div>
          </nav>
          <div
            className={`transition-width duration-300 ${
              isCollapsed ? "w-[calc(100%-4rem)]" : "w-11/12"
            }`}
          >
            <nav className="bg-gray-500 z-10 mx-auto flex justify-between items-center">
              <div className="flex w-full flex-wrap items-center justify-between">
                {/* <div className="relative inline-block text-left"></div> */}
                <Menu onClick={() => setIsCollapsed(!isCollapsed)} />
                {workSpaces.selectedWorkSpace.id.length > 0 && (
                  <div>
                    <select
                      className="rounded-lg cursor-pointer p-0"
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
                  </div>
                )}
                <div className="group">
                  <CircleUserRound className="cursor-pointer" />
                  <ul className="bg-white shadow-lg rounded-md border absolute hidden group-hover:block transition-all duration-500 ease right-2">
                    <li className="px-2 ">
                      <p>signed in as</p>
                      <p>
                        {/* <b>Testuser</b> */}
                        <b>{auth.user}</b>
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
            </nav>
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default Navigation;
