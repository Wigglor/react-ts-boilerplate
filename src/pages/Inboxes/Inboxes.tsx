import { ReactElement } from "react";

const Home = (): ReactElement => {
  return (
    <>
      <div className="py-3">
        <div className="px-4 sm:px-7 mb-3">
          <h3 className="font-semibold text-gray-800 dark:text-neutral-200">My Inboxes</h3>
        </div>

        <div className="px-4 sm:px-7 flex">
          <div className="w-32 mr-4">
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
          </div>
          <div className="w-32">
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
                  Import Emails
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="pb-7 px-1 sm:px-5 sm:pb-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 lg:gap-5"></div>
      </div>
    </>
  );
};

export default Home;
