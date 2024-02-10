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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-2 lg:gap-4">
      <a
        className="p-4 group flex flex-col bg-white border border-gray-200 rounded-xl focus:outline-none dark:bg-neutral-900 dark:border-neutral-700"
        href="#"
      >
        <div className="mb-4 flex flex-col justify-center items-center h-full">
          <span className="flex justify-center items-center h-12 w-12 xl:h-16 xl:w-16 mx-auto border-2 border-dotted border-gray-300 text-gray-400 rounded-2xl dark:border-neutral-700 dark:text-neutral-500">
            <svg
              className="flex-shrink-0 w-5 h-5"
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
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </span>
        </div>
        <div className="text-center mt-auto">
          <p className="truncate text-xs xl:text-sm font-medium text-gray-800 group-hover:text-pink-600 group-focus:text-pink-600 dark:text-neutral-200 dark:group-hover:text-neutral-400 dark:group-focus:text-neutral-400">
            Blank page
          </p>
        </div>
      </a>

      <a
        className="p-4 group flex flex-col bg-white border border-gray-200 rounded-xl focus:outline-none dark:bg-neutral-900 dark:border-neutral-700"
        href="#"
      >
        <div className="mb-4 flex flex-col justify-center items-center h-full">
          <span className="flex justify-center items-center h-12 w-12 xl:h-16 xl:w-16 mx-auto bg-teal-50 text-white rounded-2xl dark:bg-teal-800/30">
            <svg
              className="flex-shrink-0 w-5 h-5 xl:w-6 xl:h-6 text-teal-600 dark:text-teal-500"
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
              <path d="M2 3h20" />
              <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
              <path d="m7 21 5-5 5 5" />
            </svg>
          </span>
        </div>
        <div className="text-center mt-auto">
          <p className="truncate text-xs xl:text-sm font-medium text-gray-800 group-hover:text-pink-600 group-focus:text-pink-600 dark:text-neutral-200 dark:group-hover:text-neutral-400 dark:group-focus:text-neutral-400">
            Whiteboard
          </p>
        </div>
      </a>

      <a
        className="p-4 group flex flex-col bg-white border border-gray-200 rounded-xl focus:outline-none dark:bg-neutral-900 dark:border-neutral-700"
        href="#"
      >
        <div className="mb-4 flex flex-col justify-center items-center h-full">
          <span className="flex justify-center items-center h-12 w-12 xl:h-16 xl:w-16 mx-auto bg-indigo-50 text-white rounded-2xl dark:bg-indigo-800/30">
            <svg
              className="flex-shrink-0 w-5 h-5 xl:w-6 xl:h-6 text-indigo-600 dark:text-indigo-500"
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
              <path d="M9 5v4" />
              <rect width="4" height="6" x="7" y="9" rx="1" />
              <path d="M9 15v2" />
              <path d="M17 3v2" />
              <rect width="4" height="8" x="15" y="5" rx="1" />
              <path d="M17 13v3" />
              <path d="M3 3v18h18" />
            </svg>
          </span>
        </div>
        <div className="text-center mt-auto">
          <p className="truncate text-xs xl:text-sm font-medium text-gray-800 group-hover:text-pink-600 group-focus:text-pink-600 dark:text-neutral-200 dark:group-hover:text-neutral-400 dark:group-focus:text-neutral-400">
            Diagram Basics
          </p>
        </div>
      </a>

      <a
        className="p-4 group flex flex-col bg-white border border-gray-200 rounded-xl focus:outline-none dark:bg-neutral-900 dark:border-neutral-700"
        href="#"
      >
        <div className="mb-4 flex flex-col justify-center items-center h-full">
          <span className="flex justify-center items-center h-12 w-12 xl:h-16 xl:w-16 mx-auto bg-yellow-50 text-white rounded-2xl dark:bg-yellow-800/30">
            <svg
              className="flex-shrink-0 w-5 h-5 xl:w-6 xl:h-6 text-yellow-600 dark:text-yellow-500"
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
              <path d="M16 3h5v5" />
              <path d="M8 3H3v5" />
              <path d="M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3" />
              <path d="m15 9 6-6" />
            </svg>
          </span>
        </div>
        <div className="text-center mt-auto">
          <p className="truncate text-xs xl:text-sm font-medium text-gray-800 group-hover:text-pink-600 group-focus:text-pink-600 dark:text-neutral-200 dark:group-hover:text-neutral-400 dark:group-focus:text-neutral-400">
            Empathy Maps
          </p>
        </div>
      </a>

      <a
        className="p-4 group flex flex-col bg-pink-50 rounded-xl focus:outline-none dark:bg-pink-800/20"
        href="#"
      >
        <div className="mb-4 flex flex-col justify-center items-center h-full">
          <span className="flex justify-center items-center h-12 w-12 xl:h-16 xl:w-16 mx-auto bg-pink-200/50 text-white rounded-2xl dark:bg-pink-800/30">
            <svg
              className="flex-shrink-0 w-5 h-5 xl:w-6 xl:h-6 text-pink-600 dark:text-pink-500"
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
              <path d="M7 2h10" />
              <path d="M5 6h14" />
              <rect width="18" height="12" x="3" y="10" rx="2" />
            </svg>
          </span>
        </div>
        <div className="text-center mt-auto">
          <p className="truncate flex justify-center items-center gap-x-1 text-xs xl:text-sm font-medium text-gray-800 group-hover:text-pink-600 group-focus:text-pink-600 dark:text-neutral-200 dark:group-hover:text-neutral-400 dark:group-focus:text-neutral-400">
            All templates
            <svg
              className="flex-shrink-0 w-3.5 h-3.5"
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
              <path
                className="lg:opacity-0 lg:-translate-x-1 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 lg:group-focus:opacity-100 lg:group-focus:translate-x-0 lg:transition"
                d="M5 12h14"
              />
              <path
                className="lg:-translate-x-1.5 lg:group-hover:translate-x-0 lg:group-focus:translate-x-0 lg:transition"
                d="m12 5 7 7-7 7"
              />
            </svg>
          </p>
        </div>
      </a>
    </div>
  );
};

export default Home;
