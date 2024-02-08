import { ReactElement, useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLogout from "../../hooks/useLogOut";
import useWorkSpaces from "../../hooks/useWorkSpaces";

type Workspace = {
  name: string;
  id: string;
};

interface ApiResponse {
  message: string;
}

const Home = (): ReactElement => {
  const logout = useLogout();
  const axiosPrivate = useAxiosPrivate();
  const { workSpaces, setWorkSpaces } = useWorkSpaces();
  const [stateSelectedWorkspace, setSelectedWorkspace] = useState<string>("");

  const [testData, setTestData] = useState<string>(() => {
    const testData = "test string";
    return testData;
  });
  useEffect(() => {
    const workSpace: string | undefined = workSpaces.selectedWorkSpace?.name;

    setSelectedWorkspace(workSpace);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
    // <>
    //   <nav className="bg-gray-500 z-10 mx-auto flex justify-between items-center">
    //     <div className="bg-gray-900">
    //       <div className="">
    //         <Link to="/">
    //           <CircleUserRound className="text-slate-50" />
    //         </Link>
    //       </div>
    //     </div>
    //     <div className="flex w-full flex-wrap items-center justify-between">
    //       <div className="relative inline-block text-left"></div>

    //       <div className="group">
    //         <CircleUserRound className="cursor-pointer" />
    //         <ul className="bg-white shadow-lg rounded-md border absolute hidden group-hover:block transition-all duration-500 ease right-2">
    //           <li className="px-2 ">
    //             <p>signed in as</p>
    //             <p>
    //               <b>Testuser</b>
    //             </p>
    //           </li>
    //           <li className="px-2">
    //             <Link to="/organization">Organization</Link>
    //           </li>
    //           <li className="px-2">
    //             <Link to="/account">Account Settings</Link>
    //           </li>
    //           <li className="px-2">
    //             <Link to="/login" onClick={signOut}>
    //               Logout
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </nav>

    //   <div className="flex h-full">
    //     <nav className="bg-gray-900 ">
    //       <div>
    //         <ul className="text-slate-50">
    //           <li>Dashboard</li>
    //           <li>Organisation</li>
    //           <li>Account</li>
    //         </ul>
    //       </div>
    //     </nav>
    //     <div className="bg-slate-500">
    //       <h1>Home Page</h1>
    //     </div>
    //   </div>
    // </>
    <div>
      <h1>Home Page </h1>
      <p>test style test style test style test style test style test style</p>
    </div>

    //   {/* {data ? <div>{data.message}</div> : <div>Loading...</div>} */}
    // </main>
  );
};

export default Home;
