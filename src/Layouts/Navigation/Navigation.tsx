import { CircleUserRound, Home } from "lucide-react";
import { ReactElement, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
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
      {/* <NavBar />
      <SideNav /> */}
      <main className="h-full">
        <div className="flex h-full">
          <nav className="bg-gray-900 w-1/12">
            <div className="bg-gray-900">
              <div className="">
                <Link to="/">
                  <Home className="text-slate-50" />
                </Link>
              </div>
            </div>
            <div>
              <ul className="text-slate-50">
                <li>Dashboard</li>
                <li>Organisation</li>
                <li>Account</li>
              </ul>
            </div>
          </nav>
          <div className="w-11/12">
            <nav className="bg-gray-500 z-10 mx-auto flex justify-between items-center">
              <div className="flex w-full flex-wrap items-center justify-between">
                <div className="relative inline-block text-left"></div>
                {workSpaces.selectedWorkSpace.id.length > 0 && (
                  <div>
                    <select
                      className="rounded-lg cursor-pointer"
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
                        <b>Testuser</b>
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
