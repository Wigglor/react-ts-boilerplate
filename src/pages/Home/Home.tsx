import { CircleUserRound } from "lucide-react";
import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLogout from "../../hooks/useLogOut";
import useWorkSpaces from "../../hooks/useWorkSpaces";
// import axios from "axios";
// import styles from "./Home.module.scss";
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
  /*const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosProd.get("index");
        // const response = await axios.get("http://16.170.240.223:3000/index");
        setData(response.data);

        console.log(response.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPost();
  }, []);*/

  return (
    <>
      <header className="bg-gray-500 z-10 flex-no-wrap relative flex items-center">
        <div className="bg-gray-900 w-1/12">
          <div className="flex">
            <Link to="/">
              <CircleUserRound className="text-slate-50" />
            </Link>
          </div>
        </div>
        <div className="flex w-full flex-wrap items-center justify-between">
          <div className="relative inline-block text-left"></div>

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
      </header>
      <div className="flex h-full">
        <aside className="bg-gray-900 w-1/12">
          <div>
            <ul className="text-slate-50">
              <li>Dashboard</li>
              <li>Organisation</li>
              <li>Account</li>
            </ul>
          </div>
        </aside>
        {/* <div className="bg-slate-500 w-[calc(56%-120px)]"> */}
        <div className="bg-slate-500 w-11/12">
          <h1>Home Page</h1>
        </div>
      </div>
    </>
    // <main>
    //   <h1>Home Page </h1>
    //   <p>test style test style test style test style test style test style</p>
    // </main>

    //   {/* {data ? <div>{data.message}</div> : <div>Loading...</div>} */}
    // </main>
  );
};

export default Home;
