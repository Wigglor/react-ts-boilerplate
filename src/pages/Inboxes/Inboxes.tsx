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
    <>
      {/* <div className="mt-6 ml-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 gap-2 lg:gap-4">
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
      </div> */}

      <div className="py-3">
        <div className="px-4 sm:px-7 mb-3">
          <h3 className="font-semibold text-gray-800 dark:text-neutral-200">My Inboxes</h3>
        </div>

        <div className="px-4 sm:px-7">
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
                <p className="truncate text-xs xl:text-sm font-medium text-gray-800 group-hover:text-blue-600 group-focus:text-blue-600 dark:text-neutral-200 dark:group-hover:text-neutral-400 dark:group-focus:text-neutral-400">
                  Add Inbox
                </p>
              </div>
            </a>

            {/* <a
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
            </a> */}
            {/* <a
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
            </a> */}
            {/* <a
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
            </a> */}
            {/* <a
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
            </a> */}

            <div className="hs-dropdown relative inline-flex [--auto-close:inside]">
              <button
                id="hs-pro-dnwpd"
                type="button"
                className="inline-flex items-center text-start font-semibold text-gray-800 align-middle disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:text-gray-500 dark:text-white dark:focus:text-neutral-200"
              >
                Notion
                <svg
                  className="flex-shrink-0 w-4 h-4 ms-1"
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

              <div
                className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-60 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-900 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]"
                aria-labelledby="hs-pro-dnwpd"
              >
                <div className="p-1 space-y-0.5">
                  <a
                    className="py-2 px-3 block w-full text-start bg-gray-100 rounded-lg disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:bg-neutral-800 dark:focus:bg-neutral-800"
                    href="#"
                  >
                    <div className="flex gap-x-2">
                      <div className="self-center">
                        <svg
                          className="flex-shrink-0 w-5 h-5 text-gray-500 dark:text-neutral-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>
                      </div>
                      <svg
                        className="flex-shrink-0 w-8 h-8"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.7438 0.940745C6.84695 1.30308 2.6841 1.63631 2.48837 1.67533C1.9396 1.77319 1.44038 2.14544 1.20563 2.63537L1 3.06646L1.01982 13.3407L1.04893 23.615L1.36234 24.2517C1.53886 24.6042 2.73365 26.2499 4.0362 27.9439C6.61221 31.2836 6.79802 31.47 7.77726 31.5679C8.06156 31.597 10.1966 31.4991 12.5081 31.3622C14.8295 31.2154 18.5508 30.99 20.7842 30.863C30.3233 30.2839 29.8334 30.3328 30.3815 29.8627C31.0672 29.2947 31.0183 30.2251 31.0474 17.7377C31.0672 7.15003 31.0573 6.45509 30.9006 6.13177C30.7148 5.76943 30.3815 5.51487 26.0329 2.45885C23.1243 0.421704 22.9186 0.313932 21.6155 0.294111C21.0772 0.274911 16.6307 0.568497 11.7438 0.940745ZM22.752 2.28232C23.1633 2.46814 26.1704 4.56412 26.6108 4.9661C26.7284 5.08378 26.7675 5.18164 26.7086 5.24048C26.5717 5.35817 7.96245 6.465 7.42421 6.38634C7.17956 6.34732 6.81722 6.20052 6.61159 6.06302C5.75932 5.48514 3.64413 3.75149 3.64413 3.62452C3.64413 3.29129 3.57538 3.29129 11.8714 2.69421C13.4582 2.58644 16.0633 2.39071 17.6502 2.26312C21.0871 1.98874 22.1159 1.99865 22.752 2.28232ZM28.6677 7.63996C28.8046 7.77685 28.9223 8.04132 28.9613 8.29589C28.9904 8.53125 29.0102 12.9189 28.9904 18.0313C28.9613 26.8067 28.9514 27.3555 28.7848 27.61C28.6869 27.7667 28.4912 27.9333 28.3438 27.9823C27.9331 28.1489 8.43318 29.2557 8.03183 29.138C7.84601 29.0891 7.59083 28.9324 7.45394 28.7955L7.21858 28.541L7.18947 19.0799C7.16965 12.4395 7.18947 9.5012 7.26813 9.23672C7.32697 9.041 7.47376 8.80564 7.60136 8.72759C7.77788 8.60991 8.93364 8.51205 12.9101 8.2773C15.7016 8.1206 20.0206 7.85613 22.4987 7.70933C28.3933 7.34638 28.3741 7.34638 28.6677 7.63996Z"
                          className="fill-black dark:fill-neutral-200"
                          fill="currentColor"
                        />
                        <path
                          d="M23.4277 10.8818C22.3698 10.9506 21.4296 11.0484 21.3218 11.1073C20.9985 11.2739 20.8028 11.5483 20.7638 11.8617C20.7347 12.185 20.8325 12.224 21.8898 12.3516L22.35 12.4104V16.5925C22.35 19.0799 22.311 20.7256 22.2621 20.6767C22.2131 20.6178 20.8226 18.5027 19.167 15.9756C17.512 13.4392 16.1407 11.3525 16.1209 11.3333C16.1011 11.3135 15.024 11.3724 13.7313 11.4609C12.1445 11.5687 11.273 11.6666 11.0965 11.7644C10.8122 11.9112 10.4988 12.4303 10.4988 12.7734C10.4988 12.979 10.871 13.0868 11.6545 13.0868H12.0658V25.1139L11.4 25.3196C10.8809 25.4763 10.7044 25.5741 10.6165 25.7698C10.4598 26.1031 10.4697 26.4066 10.6264 26.4066C10.6852 26.4066 11.792 26.3378 13.0649 26.2598C15.582 26.113 15.8657 26.0442 16.1302 25.5252C16.2088 25.3685 16.277 25.2019 16.277 25.1529C16.277 25.1139 15.9345 24.9962 15.5226 24.8984C15.1014 24.8005 14.6802 24.7027 14.5923 24.6828C14.4257 24.6339 14.4157 24.3304 14.4157 20.1186V15.6033L17.3931 20.2753C20.5173 25.1721 20.9093 25.7308 21.3893 25.9755C21.987 26.2889 23.5051 26.0733 24.2688 25.5741L24.5042 25.4273L24.524 18.7479L24.5531 12.0586L25.0722 11.9608C25.6891 11.8431 25.9734 11.5594 25.9734 11.0695C25.9734 10.7561 25.9536 10.7362 25.66 10.7462C25.4847 10.7542 24.4757 10.813 23.4277 10.8818Z"
                          className="fill-black dark:fill-neutral-200"
                          fill="currentColor"
                        />
                      </svg>
                      <div className="grow">
                        <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                          Notion
                        </p>
                        <p className="text-xs text-gray-500 dark:text-neutral-500">notion.so</p>
                      </div>
                      <div className="ms-auto self-center">
                        <svg
                          className="flex-shrink-0 w-4 h-4 text-gray-800 dark:text-gray-200"
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
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>
                  </a>
                  <a
                    className="py-2 px-3 block w-full text-start rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                    href="#"
                  >
                    <div className="flex gap-x-2">
                      <div className="self-center">
                        <svg
                          className="flex-shrink-0 w-5 h-5 text-gray-500 dark:text-neutral-500"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        </svg>
                      </div>
                      <svg
                        className="flex-shrink-0 w-8 h-8"
                        width="33"
                        height="32"
                        viewBox="0 0 33 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.0001 0C7.16461 0 0 7.34466 0 16.405C0 23.6533 4.5845 29.8026 10.9419 31.9718C11.7415 32.1236 12.0351 31.6159 12.0351 31.1826C12.0351 30.7915 12.0202 29.4991 12.0134 28.1283C7.56202 29.1207 6.62276 26.1927 6.62276 26.1927C5.89494 24.2965 4.84626 23.7924 4.84626 23.7924C3.39464 22.7742 4.95568 22.795 4.95568 22.795C6.5624 22.9108 7.40843 24.4856 7.40843 24.4856C8.83545 26.9936 11.1514 26.2685 12.0645 25.8495C12.208 24.789 12.6227 24.0654 13.0803 23.6558C9.5265 23.2408 5.79054 21.8342 5.79054 15.5483C5.79054 13.7573 6.41559 12.2938 7.43917 11.1449C7.27303 10.7317 6.72541 9.0632 7.59415 6.80351C7.59415 6.80351 8.93772 6.36259 11.9953 8.48512C13.2715 8.12152 14.6403 7.93934 16.0001 7.93316C17.3598 7.93934 18.7296 8.12152 20.0083 8.48512C23.0623 6.36259 24.404 6.80351 24.404 6.80351C25.2748 9.0632 24.727 10.7317 24.5608 11.1449C25.5867 12.2938 26.2075 13.7572 26.2075 15.5483C26.2075 21.8491 22.4645 23.2366 18.9017 23.6426C19.4755 24.1518 19.9869 25.1502 19.9869 26.6806C19.9869 28.8756 19.9683 30.6422 19.9683 31.1826C19.9683 31.6192 20.2563 32.1307 21.0674 31.9696C27.4213 29.798 32 23.6509 32 16.405C32 7.34466 24.8364 0 16.0001 0Z"
                          className="fill-black dark:fill-neutral-200"
                          fill="currentColor"
                        />
                        <path
                          d="M5.99251 23.3693C5.95737 23.4508 5.83213 23.4752 5.71832 23.4194C5.60224 23.3658 5.53699 23.2547 5.57464 23.1728C5.60915 23.089 5.73438 23.0655 5.8502 23.1219C5.96653 23.1753 6.03279 23.2875 5.99251 23.3693ZM6.77955 24.0893C6.70326 24.1619 6.55405 24.1282 6.45279 24.0135C6.34813 23.8991 6.32856 23.7463 6.40598 23.6726C6.48466 23.6001 6.62935 23.634 6.73425 23.7485C6.83891 23.8641 6.85924 24.0161 6.77943 24.0894M7.31952 25.0105C7.22139 25.0804 7.06102 25.0149 6.96201 24.869C6.864 24.7232 6.864 24.5482 6.96414 24.4781C7.06353 24.408 7.22139 24.471 7.32178 24.6158C7.41965 24.7641 7.41965 24.9391 7.31939 25.0107M8.23255 26.0775C8.14484 26.1766 7.95811 26.1501 7.82133 26.0147C7.68154 25.8825 7.64252 25.6947 7.73048 25.5955C7.8192 25.4962 8.00705 25.5241 8.14484 25.6583C8.28375 25.7903 8.32604 25.9795 8.23255 26.0775ZM9.41262 26.4378C9.3741 26.5662 9.19415 26.6246 9.01295 26.57C8.832 26.5138 8.71354 26.3633 8.75006 26.2335C8.7877 26.1041 8.9684 26.0433 9.15098 26.1017C9.33168 26.1577 9.45027 26.307 9.41262 26.4378ZM10.7558 26.5905C10.7603 26.7258 10.6066 26.838 10.4164 26.8405C10.225 26.8447 10.0703 26.7352 10.0683 26.6022C10.0683 26.4656 10.2185 26.3544 10.4097 26.3512C10.6 26.3473 10.7558 26.456 10.7558 26.5905ZM12.0752 26.5386C12.098 26.6706 11.9658 26.8063 11.7769 26.8423C11.5912 26.877 11.4193 26.7956 11.3955 26.6647C11.3725 26.5294 11.5072 26.3939 11.6926 26.3588C11.8818 26.3251 12.0511 26.4044 12.0752 26.5386Z"
                          className="fill-black dark:fill-neutral-200"
                          fill="currentColor"
                        />
                      </svg>
                      <div className="grow">
                        <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                          Github
                        </p>
                        <p className="text-xs text-gray-500 dark:text-neutral-500">github.com</p>
                      </div>
                      <div className="ms-auto self-center">
                        <svg
                          className="hidden flex-shrink-0 w-4 h-4"
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
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>

                <div className="p-1 border-t border-gray-200 dark:border-neutral-800">
                  <button
                    type="button"
                    className="w-full flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                  >
                    <svg
                      className="flex-shrink-0 w-4 h-4"
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
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 12h8" />
                      <path d="M12 8v8" />
                    </svg>
                    Add another project
                  </button>
                </div>

                <div className="p-1 border-t border-gray-200 dark:border-neutral-800">
                  <button
                    type="button"
                    className="w-full flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 disabled:opacity-50 focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                  >
                    Sign out
                    <span className="ms-auto text-xs text-gray-500 dark:text-neutral-500">
                      preline@site.com
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5 pb-3 px-4 sm:pt-7 sm:px-7">
        <div className="flex flex-wrap justify-between items-center gap-1 sm:gap-5">
          <div className="relative inline-flex items-center">
            <span className="me-1 text-xs sm:text-sm text-gray-500 dark:text-neutral-500">
              Filter:
            </span>
            <select
              data-hs-select='{
              "placeholder": "Filter",
              "toggleTag": "<button type=\"button\"></button>",
              "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-1 ps-1.5 pe-7 inline-flex flex-shrink-0 justify-center items-center gap-x-1.5 border border-transparent text-sm text-gray-800 rounded-lg hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:bg-gray-100 before:absolute before:inset-0 before:z-[1] dark:text-neutral-200 dark:bg-neutral-900 dark:hover:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
              "dropdownClasses": "start-0 mt-2 p-1 z-50 w-40 sm:w-44 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-800",
              "optionClasses": "flex items-center gap-x-3 py-2 px-3 text-xs sm:text-[13px] text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700",
              "optionTemplate": "<div className=\"flex items-center w-full\"><div className=\"me-2 sm:me-3\" data-icon></div><span data-title></span><span className=\"hidden hs-selected:block ms-auto\"><svg className=\"flex-shrink-0 w-3.5 h-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
            }'
              className="hidden"
            >
              {/* <option value="">Choose</option>
              <option
                selected
                data-hs-select-option='{
              "icon": "<svg className=\"flex-shrink-0 w-3 h-3 sm:w-3.5 sm:h-3.5\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"M7 2h10\"/><path d=\"M5 6h14\"/><rect width=\"18\" height=\"12\" x=\"3\" y=\"10\" rx=\"2\"/></svg>"}'
              >
                All files
              </option>
              <option
                data-hs-select-option='{
              "icon": "<svg className=\"flex-shrink-0 w-3 h-3 sm:w-3.5 sm:h-3.5\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z\"/><polyline points=\"14 2 14 8 20 8\"/><line x1=\"16\" x2=\"8\" y1=\"13\" y2=\"13\"/><line x1=\"16\" x2=\"8\" y1=\"17\" y2=\"17\"/><line x1=\"10\" x2=\"8\" y1=\"9\" y2=\"9\"/></svg>"}'
              >
                Documents
              </option>
              <option
                data-hs-select-option='{
              "icon": "<svg className=\"flex-shrink-0 w-3 h-3 sm:w-3.5 sm:h-3.5\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" ry=\"2\"/><circle cx=\"9\" cy=\"9\" r=\"2\"/><path d=\"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21\"/></svg>"}'
              >
                Images
              </option>
              <option
                data-hs-select-option='{
              "icon": "<svg className=\"flex-shrink-0 w-3 h-3 sm:w-3.5 sm:h-3.5\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"16 18 22 12 16 6\"/><polyline points=\"8 6 2 12 8 18\"/></svg>"}'
              >
                Snippets
              </option>
              <option
                data-hs-select-option='{
              "icon": "<svg className=\"flex-shrink-0 w-3 h-3 sm:w-3.5 sm:h-3.5\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z\"/><polyline points=\"14 2 14 8 20 8\"/><path d=\"M8 13h2\"/><path d=\"M8 17h2\"/><path d=\"M14 13h2\"/><path d=\"M14 17h2\"/></svg>"}'
              >
                Spreadsheets
              </option>
              <option
                data-hs-select-option='{
              "icon": "<svg className=\"flex-shrink-0 w-3 h-3 sm:w-3.5 sm:h-3.5\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"/><path d=\"M15.54 8.46a5 5 0 0 1 0 7.07\"/><path d=\"M19.07 4.93a10 10 0 0 1 0 14.14\"/></svg>"}'
              >
                Audio
              </option>
              <option
                data-hs-select-option='{
              "icon": "<svg className=\"flex-shrink-0 w-3 h-3 sm:w-3.5 sm:h-3.5\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"m22 8-6 4 6 4V8Z\"/><rect width=\"14\" height=\"12\" x=\"2\" y=\"6\" rx=\"2\" ry=\"2\"/></svg>"}'
              >
                Videos
              </option> */}
            </select>

            <div className="absolute top-1/2 end-2 sm:end-1.5 -translate-y-1/2">
              <svg
                className="flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4 text-gray-700 dark:text-neutral-300"
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
            </div>
          </div>

          <div className="flex justify-end items-center gap-x-2">
            <div className="relative inline-flex items-center">
              <span className="me-1 text-xs sm:text-sm text-gray-500 dark:text-neutral-500">
                Sort:
              </span>
              <select
                data-hs-select='{
                "placeholder": "Sort",
                "toggleTag": "<button type=\"button\"></button>",
                "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-1 ps-1.5 pe-7 inline-flex flex-shrink-0 justify-center items-center gap-x-1.5 border border-transparent text-sm text-gray-800 rounded-lg hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:bg-gray-100 before:absolute before:inset-0 before:z-[1] dark:text-neutral-200 dark:bg-neutral-900 dark:hover:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
                "dropdownClasses": "end-0 mt-2 p-1 z-50 w-32 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-800",
                "optionClasses": "flex items-center gap-x-3 py-2 px-3 text-xs sm:text-[13px] text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700",
                "optionTemplate": "<div className=\"flex justify-between items-center w-full\"><span data-title></span><span className=\"hidden hs-selected:block\"><svg className=\"flex-shrink-0 w-3.5 h-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
              }'
                className="hidden"
              >
                {/* <option value="">Choose</option>
                <option selected>Newest file</option>
                <option>Oldest file</option>
                <option>A to Z</option>
                <option>Z to A</option> */}
              </select>

              <div className="absolute top-1/2 end-2 sm:end-1.5 -translate-y-1/2">
                <svg
                  className="flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4 text-gray-700 dark:text-neutral-300"
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
              </div>
            </div>
            <div className="flex items-center">
              <a
                className="flex flex-shrink-0 justify-center items-center w-[30px] h-[30px] bg-gray-100 border-md text-gray-800 rounded-md disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-200 dark:bg-neutral-700 dark:text-neutral-200 dark:focus:bg-neutral-600"
                href="#"
              >
                <svg
                  className="flex-shrink-0 w-4 h-4"
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
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
              </a>
              <a
                className="flex flex-shrink-0 justify-center items-center w-[30px] h-[30px] border-md text-gray-800 rounded-md disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:focus:text-neutral-500"
                href="#"
              >
                <svg
                  className="flex-shrink-0 w-4 h-4"
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
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-7 px-1 sm:px-5 sm:pb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 lg:gap-5">
          <div className="relative rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800">
            <a
              className="p-2 block rounded-xl focus:outline-none focus:bg-gray-100 dark:focus:bg-neutral-800"
              href="#"
            >
              <div className="py-8 px-4 bg-gray-100 border border-gray-200 rounded-lg dark:bg-neutral-800 dark:border-neutral-700">
                {/* <img
                  src="../../assets/img/pro/files-previews/img1.jpg"
                  alt="Image Description"
                ></img> */}
              </div>
              <div className="pt-2">
                <p className="truncate text-sm font-medium text-gray-800 dark:text-neutral-200">
                  Analytics
                </p>
                <p className="mt-1 truncate text-xs text-gray-500 dark:text-neutral-500">
                  Edited a minute ago
                </p>
              </div>
            </a>

            <div className="absolute top-3 end-3">
              <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                <button
                  id="hs-pro-fd1"
                  type="button"
                  className="w-7 h-7 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  <svg
                    className="flex-shrink-0 w-4 h-4"
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
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>

                <div
                  className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-800 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]"
                  aria-labelledby="hs-pro-fd1"
                >
                  <div className="p-1">
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-pro-detm"
                    >
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
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        <path d="m15 5 4 4" />
                      </svg>
                      Edit file
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
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
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      Add to favorites
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
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
                        <rect width="20" height="5" x="2" y="4" rx="2" />
                        <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
                        <path d="M10 13h4" />
                      </svg>
                      Archive file
                    </button>

                    <div className="my-1 border-t border-gray-200 dark:border-neutral-700"></div>

                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-red-600 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-red-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-pro-dtlam"
                    >
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
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                      Delete file
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800">
            <a
              className="p-2 block rounded-xl focus:outline-none focus:bg-gray-100 dark:focus:bg-neutral-800"
              href="#"
            >
              <div className="py-8 px-4 bg-gray-100 border border-gray-200 rounded-lg dark:bg-neutral-800 dark:border-neutral-700">
                {/* <img
                  src="../../assets/img/pro/files-previews/img2.jpg"
                  alt="Image Description"
                ></img> */}
              </div>
              <div className="pt-2">
                <p className="truncate text-sm font-medium text-gray-800 dark:text-neutral-200">
                  User Profile
                </p>
                <p className="mt-1 truncate text-xs text-gray-500 dark:text-neutral-500">
                  Edited 1 hour ago
                </p>
              </div>
            </a>

            <div className="absolute top-3 end-3">
              <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                <button
                  id="hs-pro-fd2"
                  type="button"
                  className="w-7 h-7 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  <svg
                    className="flex-shrink-0 w-4 h-4"
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
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>

                <div
                  className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-800 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]"
                  aria-labelledby="hs-pro-fd2"
                >
                  <div className="p-1">
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-pro-detm"
                    >
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
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        <path d="m15 5 4 4" />
                      </svg>
                      Edit file
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
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
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      Add to favorites
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
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
                        <rect width="20" height="5" x="2" y="4" rx="2" />
                        <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
                        <path d="M10 13h4" />
                      </svg>
                      Archive file
                    </button>

                    <div className="my-1 border-t border-gray-200 dark:border-neutral-700"></div>

                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-red-600 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-red-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-pro-dtlam"
                    >
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
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                      Delete file
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800">
            <a
              className="p-2 block rounded-xl focus:outline-none focus:bg-gray-100 dark:focus:bg-neutral-800"
              href="#"
            >
              <div className="py-8 px-4 bg-gray-100 border border-gray-200 rounded-lg dark:bg-neutral-800 dark:border-neutral-700">
                {/* <img
                  src="../../assets/img/pro/files-previews/img3.jpg"
                  alt="Image Description"
                ></img> */}
              </div>
              <div className="pt-2">
                <p className="truncate text-sm font-medium text-gray-800 dark:text-neutral-200">
                  Payment
                </p>
                <p className="mt-1 truncate text-xs text-gray-500 dark:text-neutral-500">
                  Edited 1 day ago
                </p>
              </div>
            </a>

            <div className="absolute top-3 end-3">
              <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                <button
                  id="hs-pro-fd3"
                  type="button"
                  className="w-7 h-7 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  <svg
                    className="flex-shrink-0 w-4 h-4"
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
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>

                <div
                  className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-800 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]"
                  aria-labelledby="hs-pro-fd3"
                >
                  <div className="p-1">
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-pro-detm"
                    >
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
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        <path d="m15 5 4 4" />
                      </svg>
                      Edit file
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
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
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      Add to favorites
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
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
                        <rect width="20" height="5" x="2" y="4" rx="2" />
                        <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
                        <path d="M10 13h4" />
                      </svg>
                      Archive file
                    </button>

                    <div className="my-1 border-t border-gray-200 dark:border-neutral-700"></div>

                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-red-600 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-red-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-pro-dtlam"
                    >
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
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                      Delete file
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800">
            <a
              className="p-2 block rounded-xl focus:outline-none focus:bg-gray-100 dark:focus:bg-neutral-800"
              href="#"
            >
              <div className="py-8 px-4 bg-gray-100 border border-gray-200 rounded-lg dark:bg-neutral-800 dark:border-neutral-700">
                {/* <img
                  src="../../assets/img/pro/files-previews/img4.jpg"
                  alt="Image Description"
                ></img> */}
              </div>
              <div className="pt-2">
                <p className="truncate text-sm font-medium text-gray-800 dark:text-neutral-200">
                  Employee Attendance
                </p>
                <p className="mt-1 truncate text-xs text-gray-500 dark:text-neutral-500">
                  Edited 1 week ago
                </p>
              </div>
            </a>

            <div className="absolute top-3 end-3">
              <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                <button
                  id="hs-pro-fd4"
                  type="button"
                  className="w-7 h-7 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  <svg
                    className="flex-shrink-0 w-4 h-4"
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
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>

                <div
                  className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-800 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]"
                  aria-labelledby="hs-pro-fd4"
                >
                  <div className="p-1">
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-pro-detm"
                    >
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
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        <path d="m15 5 4 4" />
                      </svg>
                      Edit file
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
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
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      Add to favorites
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
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
                        <rect width="20" height="5" x="2" y="4" rx="2" />
                        <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
                        <path d="M10 13h4" />
                      </svg>
                      Archive file
                    </button>

                    <div className="my-1 border-t border-gray-200 dark:border-neutral-700"></div>

                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-red-600 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-red-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-pro-dtlam"
                    >
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
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                      Delete file
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800">
            <a
              className="p-2 block rounded-xl focus:outline-none focus:bg-gray-100 dark:focus:bg-neutral-800"
              href="#"
            >
              <div className="py-8 px-4 bg-gray-100 border border-gray-200 rounded-lg dark:bg-neutral-800 dark:border-neutral-700">
                {/* <img
                  src="../../assets/img/pro/files-previews/img5.jpg"
                  alt="Image Description"
                ></img> */}
              </div>
              <div className="pt-2">
                <p className="truncate text-sm font-medium text-gray-800 dark:text-neutral-200">
                  Examples
                </p>
                <p className="mt-1 truncate text-xs text-gray-500 dark:text-neutral-500">
                  Edited 1 week ago
                </p>
              </div>
            </a>

            <div className="absolute top-3 end-3">
              <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                <button
                  id="hs-pro-fd5"
                  type="button"
                  className="w-7 h-7 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  <svg
                    className="flex-shrink-0 w-4 h-4"
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
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>

                <div
                  className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-800 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]"
                  aria-labelledby="hs-pro-fd5"
                >
                  <div className="p-1">
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-pro-detm"
                    >
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
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        <path d="m15 5 4 4" />
                      </svg>
                      Edit file
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
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
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      Add to favorites
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
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
                        <rect width="20" height="5" x="2" y="4" rx="2" />
                        <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
                        <path d="M10 13h4" />
                      </svg>
                      Archive file
                    </button>

                    <div className="my-1 border-t border-gray-200 dark:border-neutral-700"></div>

                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-red-600 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-red-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-pro-dtlam"
                    >
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
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                      Delete file
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800">
            <a
              className="p-2 block rounded-xl focus:outline-none focus:bg-gray-100 dark:focus:bg-neutral-800"
              href="#"
            >
              <div className="py-8 px-4 bg-gray-100 border border-gray-200 rounded-lg dark:bg-neutral-800 dark:border-neutral-700">
                {/* <img
                  src="../../assets/img/pro/files-previews/img6.jpg"
                  alt="Image Description"
                ></img> */}
              </div>
              <div className="pt-2">
                <p className="truncate text-sm font-medium text-gray-800 dark:text-neutral-200">
                  Dashboard
                </p>
                <p className="mt-1 truncate text-xs text-gray-500 dark:text-neutral-500">
                  Edited 2 weeks ago
                </p>
              </div>
            </a>

            <div className="absolute top-3 end-3">
              <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                <button
                  id="hs-pro-fd6"
                  type="button"
                  className="w-7 h-7 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  <svg
                    className="flex-shrink-0 w-4 h-4"
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
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>

                <div
                  className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-800 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]"
                  aria-labelledby="hs-pro-fd6"
                >
                  <div className="p-1">
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-pro-detm"
                    >
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
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        <path d="m15 5 4 4" />
                      </svg>
                      Edit file
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
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
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      Add to favorites
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
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
                        <rect width="20" height="5" x="2" y="4" rx="2" />
                        <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
                        <path d="M10 13h4" />
                      </svg>
                      Archive file
                    </button>

                    <div className="my-1 border-t border-gray-200 dark:border-neutral-700"></div>

                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-red-600 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-red-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-pro-dtlam"
                    >
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
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                      Delete file
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800">
            <a
              className="p-2 block rounded-xl focus:outline-none focus:bg-gray-100 dark:focus:bg-neutral-800"
              href="#"
            >
              <div className="py-8 px-4 bg-gray-100 border border-gray-200 rounded-lg dark:bg-neutral-800 dark:border-neutral-700">
                {/* <img
                  src="../../assets/img/pro/files-previews/img7.jpg"
                  alt="Image Description"
                ></img> */}
              </div>
              <div className="pt-2">
                <p className="truncate text-sm font-medium text-gray-800 dark:text-neutral-200">
                  Welcome Page
                </p>
                <p className="mt-1 truncate text-xs text-gray-500 dark:text-neutral-500">
                  Edited 2 weeks ago
                </p>
              </div>
            </a>

            <div className="absolute top-3 end-3">
              <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                <button
                  id="hs-pro-fd7"
                  type="button"
                  className="w-7 h-7 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  <svg
                    className="flex-shrink-0 w-4 h-4"
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
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>

                <div
                  className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-800 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]"
                  aria-labelledby="hs-pro-fd7"
                >
                  <div className="p-1">
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-pro-detm"
                    >
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
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        <path d="m15 5 4 4" />
                      </svg>
                      Edit file
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
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
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      Add to favorites
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
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
                        <rect width="20" height="5" x="2" y="4" rx="2" />
                        <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
                        <path d="M10 13h4" />
                      </svg>
                      Archive file
                    </button>

                    <div className="my-1 border-t border-gray-200 dark:border-neutral-700"></div>

                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-red-600 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-red-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-pro-dtlam"
                    >
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
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                      Delete file
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800">
            <a
              className="p-2 block rounded-xl focus:outline-none focus:bg-gray-100 dark:focus:bg-neutral-800"
              href="#"
            >
              <div className="py-8 px-4 bg-gray-100 border border-gray-200 rounded-lg dark:bg-neutral-800 dark:border-neutral-700">
                {/* <img
                  src="../../assets/img/pro/files-previews/img8.jpg"
                  alt="Image Description"
                ></img> */}
              </div>
              <div className="pt-2">
                <p className="truncate text-sm font-medium text-gray-800 dark:text-neutral-200">
                  Plan &amp; Billing
                </p>
                <p className="mt-1 truncate text-xs text-gray-500 dark:text-neutral-500">
                  Edited 3 months ago
                </p>
              </div>
            </a>

            <div className="absolute top-3 end-3">
              <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                <button
                  id="hs-pro-fd8"
                  type="button"
                  className="w-7 h-7 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  <svg
                    className="flex-shrink-0 w-4 h-4"
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
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>

                <div
                  className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-800 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]"
                  aria-labelledby="hs-pro-fd8"
                >
                  <div className="p-1">
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-pro-detm"
                    >
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
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        <path d="m15 5 4 4" />
                      </svg>
                      Edit file
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
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
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      Add to favorites
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
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
                        <rect width="20" height="5" x="2" y="4" rx="2" />
                        <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
                        <path d="M10 13h4" />
                      </svg>
                      Archive file
                    </button>

                    <div className="my-1 border-t border-gray-200 dark:border-neutral-700"></div>

                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-red-600 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-red-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-pro-dtlam"
                    >
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
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                      Delete file
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative rounded-xl hover:bg-gray-100 dark:hover:bg-neutral-800">
            <a
              className="p-2 block rounded-xl focus:outline-none focus:bg-gray-100 dark:focus:bg-neutral-800"
              href="#"
            >
              <div className="py-8 px-4 bg-gray-100 border border-gray-200 rounded-lg dark:bg-neutral-800 dark:border-neutral-700">
                {/* <img
                  src="../../assets/img/pro/files-previews/img9.jpg"
                  alt="Image Description"
                ></img> */}
              </div>
              <div className="pt-2">
                <p className="truncate text-sm font-medium text-gray-800 dark:text-neutral-200">
                  Users
                </p>
                <p className="mt-1 truncate text-xs text-gray-500 dark:text-neutral-500">
                  Edited 4 months ago
                </p>
              </div>
            </a>

            <div className="absolute top-3 end-3">
              <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                <button
                  id="hs-pro-fd9"
                  type="button"
                  className="w-7 h-7 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:bg-neutral-700 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  <svg
                    className="flex-shrink-0 w-4 h-4"
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
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </button>

                <div
                  className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-40 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-800 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]"
                  aria-labelledby="hs-pro-fd9"
                >
                  <div className="p-1">
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-pro-detm"
                    >
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
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        <path d="m15 5 4 4" />
                      </svg>
                      Edit file
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
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
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      Add to favorites
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    >
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
                        <rect width="20" height="5" x="2" y="4" rx="2" />
                        <path d="M4 9v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
                        <path d="M10 13h4" />
                      </svg>
                      Archive file
                    </button>

                    <div className="my-1 border-t border-gray-200 dark:border-neutral-700"></div>

                    <button
                      type="button"
                      className="w-full flex items-center gap-x-3 py-1.5 px-2 rounded-lg text-[13px] font-normal text-red-600 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-red-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                      data-hs-overlay="#hs-pro-dtlam"
                    >
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
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                      Delete file
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
