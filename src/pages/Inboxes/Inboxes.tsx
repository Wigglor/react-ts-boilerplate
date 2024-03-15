import { ReactElement, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

type FormData = {
  inbox: string;
};

type Alias = {
  data: {
    alias: {
      id: string;
      createdAt: string;
      updatedAt: string;
      name: string;
      alias: string;
      domainId: string;
    }[];
  };
};

const Inboxes = (): ReactElement => {
  const [addInbox, setAddInbox] = useState<boolean>(false);
  const [aliasStatus, setAliasStatus] = useState<boolean>(false);
  const [aliases, setAliases] = useState<Alias>();
  const axiosPrivate = useAxiosPrivate();
  const {
    // setValue,
    handleSubmit,
    register,
    // control,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const toggleInbox = () => {
    setAddInbox((prev) => !prev);
  };

  useEffect(() => {
    const controller = new AbortController();
    const getAliases = async () => {
      try {
        const response: ApiResponse<Alias> = await axiosPrivate.get(
          "/get-aliases",

          {
            signal: controller.signal,
            withCredentials: true,
          },
        );

        if (response.data.data.alias !== null) {
          console.log("domain IS NOT null");
          setAliasStatus(true);
          setAliases(response.data);
        } else if (response.data?.data === null) {
          console.log("domain IS null");
        }
        // console.log(JSON.stringify(response.data.data));
      } catch (err) {
        console.error(err);
      }
    };
    getAliases();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <div className="py-3">
        {addInbox && (
          <>
            {createPortal(
              <div
                className="fixed top-0 left-0 w-full h-full bg-gray-300 bg-opacity-80 z-40 flex justify-center items-center"
                onClick={toggleInbox}
              >
                <div className="" onClick={(e) => e.stopPropagation()}>
                  <div className=" bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-4 sm:p-7">
                      {/* {errorMessage && (
                        <p className="bg-red-60 p-3 text-white rounded-lg w-full">{errorMessage}</p>
                      )} */}
                      <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                          Create an Inbox
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          Name the inbox - receive an email email alias
                        </p>
                      </div>

                      <div className="mt-5">
                        <form>
                          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                          <div className="grid gap-y-4">
                            <div>
                              <label htmlFor="email" className="block text-sm mb-2 dark:text-white">
                                Name Inbox
                              </label>
                              <input
                                type="text"
                                id="inbox"
                                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                required
                                aria-describedby="email-error"
                                {...register("inbox", {
                                  required: "required",
                                  minLength: {
                                    value: 2,
                                    message: "min length is 2",
                                  },
                                })}
                              ></input>

                              {errors.inbox && (
                                <span className="bg-red-600 text-white p-2" role="alert">
                                  {errors.inbox.message}
                                </span>
                              )}
                              <div className="relative">
                                <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                  <svg
                                    className="h-5 w-5 text-red-500"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                    aria-hidden="true"
                                  >
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                  </svg>
                                </div>
                              </div>
                              <p className="hidden text-xs text-red-600 mt-2" id="email-error">
                                Please include a valid email address so we can get back to you
                              </p>
                            </div>

                            <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t dark:bg-gray-800 dark:border-gray-700">
                              <button
                                onClick={toggleInbox}
                                type="button"
                                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                data-hs-overlay="#hs-notifications"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              >
                                Create Inbox
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>,
              document.getElementById("overlay-root") as HTMLElement,
            )}
          </>
        )}
        <div className="px-4 sm:px-7 mb-3">
          <h3 className="font-semibold text-gray-800 dark:text-neutral-200">My Inboxes</h3>
        </div>

        <div className="px-4 sm:px-7 flex">
          <div className="w-32 mr-4">
            <a
              className="p-4 group flex flex-col bg-white border border-gray-200 rounded-xl focus:outline-none dark:bg-neutral-900 dark:border-neutral-700"
              href="#"
              onClick={toggleInbox}
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
        </div>
      </div>

      <div className="xl:p-5 space-y-4 flex flex-col xl:bg-white xl:border xl:border-gray-200 xl:shadow-sm xl:rounded-xl dark:xl:bg-neutral-800 dark:xl:border-neutral-700">
        <div className="flex justify-between items-center gap-x-2">
          <h2 className="font-semibold text-gray-800 dark:text-neutral-200">9 results</h2>

          <div className="flex justify-end items-center gap-x-2">
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-1.5 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-hs-overlay="#hs-pro-datm"
            >
              <svg
                className="hidden sm:block flex-shrink-0 w-4 h-4"
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" x2="12" y1="3" y2="15" />
              </svg>
              Upload file
            </button>

            <div className="p-[3px] flex items-center bg-white border border-gray-200 rounded-lg dark:bg-neutral-800 dark:border-neutral-700">
              <a
                className="inline-flex flex-shrink-0 justify-center items-center w-[30px] h-[30px] border-md text-gray-800 rounded-md disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:focus:text-neutral-500 bg-gray-100 focus:bg-gray-200 focus:text-gray-800 dark:focus:text-neutral-200 dark:bg-neutral-700 dark:focus:bg-neutral-600"
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
                className="inline-flex flex-shrink-0 justify-center items-center w-[30px] h-[30px] border-md text-gray-800 rounded-md disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:focus:text-neutral-500 "
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

        <div className="py-4 grid md:grid-cols-2 gap-y-2 md:gap-y-0 md:gap-x-5 border-y border-gray-200 dark:border-neutral-700">
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                <svg
                  className="flex-shrink-0 w-4 h-4 text-gray-500 dark:text-neutral-400"
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
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <input
                type="text"
                className="py-2 px-3 ps-10 pe-16 block w-full bg-gray-200 xl:bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:ring-neutral-600"
                placeholder="Search by file name or keyword"
              ></input>
            </div>
          </div>

          <div className="flex justify-end items-center flex-wrap gap-x-1">
            <div className="hs-dropdown relative inline-flex [--auto-close:inside]">
              <button
                id="hs-pro-dupfind"
                type="button"
                className="p-2 whitespace-nowrap inline-flex justify-center items-center gap-x-2 border border-transparent text-gray-500 text-sm rounded-lg hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:bg-neutral-700"
              >
                In
                <svg
                  className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-neutral-600"
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
                className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-48 transition-[opacity,margin] duration opacity-0 hidden z-10 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-900 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]"
                aria-labelledby="hs-pro-dupfind"
              >
                <div className="p-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                      <svg
                        className="flex-shrink-0 w-3.5 h-3.5 text-gray-500 dark:text-neutral-400"
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
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="py-2 px-3 ps-10 pe-16 block w-full border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                      placeholder="Ex. #digital"
                    ></input>
                  </div>

                  <span className="mt-3 mb-1 ps-1 block text-xs text-gray-500 dark:text-neutral-500">
                    Recent
                  </span>

                  <div className="flex items-center gap-x-3 py-2 px-3 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                    <input
                      type="checkbox"
                      className="shrink-0 border-gray-200 w-3.5 h-3.5 rounded text-blue-600 focus:ring-offset-0 dark:bg-neutral-800 dark:border-neutral-700"
                      id="hs-pro-dupfindch1"
                    ></input>
                    <label
                      htmlFor="hs-pro-dupfindch1"
                      className="flex flex-1 items-center gap-x-3 cursor-pointer text-sm text-gray-800 dark:text-neutral-300"
                    >
                      #supportteam
                    </label>
                  </div>

                  <div className="flex items-center gap-x-3 py-2 px-3 cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800">
                    <input
                      type="checkbox"
                      className="shrink-0 border-gray-200 w-3.5 h-3.5 rounded text-blue-600 focus:ring-offset-0 dark:bg-neutral-800 dark:border-neutral-700"
                      id="hs-pro-dupfindch2"
                    ></input>
                    <label
                      htmlFor="hs-pro-dupfindch2"
                      className="flex flex-1 items-center gap-x-3 cursor-pointer text-sm text-gray-800 dark:text-neutral-300"
                    >
                      #Subscription
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="hs-dropdown inline-flex [--auto-close:inside]">
              <button
                id="hs-pro-dnic"
                type="button"
                className="p-2 whitespace-nowrap inline-flex justify-center items-center gap-x-2 border border-transparent text-gray-500 text-sm rounded-lg hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:bg-neutral-700"
              >
                Date
                <svg
                  className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-neutral-600"
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
                className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-[318px] transition-[opacity,margin] duration opacity-0 hidden z-50 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-900 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]"
                aria-labelledby="hs-pro-dnic"
              >
                <div className="p-3 space-y-0.5">
                  <div className="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3">
                    <div className="col-span-1">
                      <button
                        type="button"
                        className="w-8 h-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                          <path d="m15 18-6-6 6-6" />
                        </svg>
                      </button>
                    </div>

                    <div className="col-span-3 flex justify-center items-center gap-x-1">
                      <div className="relative">
                        <select
                          data-hs-select='{
                      "placeholder": "Select month",
                      "toggleTag": "<button type=\"button\"></button>",
                      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative flex text-nowrap w-full cursor-pointer text-start font-medium text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600 before:absolute before:inset-0 before:z-[1] dark:text-neutral-200 dark:hover:text-gray-300 dark:focus:text-gray-300",
                      "dropdownClasses": "mt-2 z-50 w-32 max-h-[300px] p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                      "optionClasses": "p-2 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-slate-800",
                      "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 w-3.5 h-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                    }'
                          className="hidden"
                        >
                          <option value="0">January</option>
                          <option value="1">February</option>
                          <option value="2">March</option>
                          <option value="3">April</option>
                          <option value="4">May</option>
                          <option value="5">June</option>
                          <option value="6" selected>
                            July
                          </option>
                          <option value="7">August</option>
                          <option value="8">September</option>
                          <option value="9">October</option>
                          <option value="10">November</option>
                          <option value="11">December</option>
                        </select>
                      </div>

                      <span className="text-gray-800 dark:text-neutral-200">/</span>

                      <div className="relative">
                        <select
                          data-hs-select='{
                      "placeholder": "Select year",
                      "toggleTag": "<button type=\"button\"></button>",
                      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative flex text-nowrap w-full cursor-pointer text-start font-medium text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600 before:absolute before:inset-0 before:z-[1] dark:text-neutral-200 dark:hover:text-gray-300 dark:focus:text-gray-300",
                      "dropdownClasses": "mt-2 z-50 w-20 max-h-[300px] p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                      "optionClasses": "p-2 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-slate-800",
                      "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 w-3.5 h-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                    }'
                          className="hidden"
                        >
                          <option selected>2023</option>
                          <option>2024</option>
                          <option>2025</option>
                          <option>2026</option>
                          <option>2027</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-span-1 flex justify-end">
                      <button
                        type="button"
                        className="w-8 h-8 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                      >
                        <svg
                          className="flex-shrink-0 w-4 h-4"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex pb-1.5">
                    <span className="m-px w-10 block text-center text-sm text-gray-500 dark:text-neutral-500">
                      Mo
                    </span>
                    <span className="m-px w-10 block text-center text-sm text-gray-500 dark:text-neutral-500">
                      Tu
                    </span>
                    <span className="m-px w-10 block text-center text-sm text-gray-500 dark:text-neutral-500">
                      We
                    </span>
                    <span className="m-px w-10 block text-center text-sm text-gray-500 dark:text-neutral-500">
                      Th
                    </span>
                    <span className="m-px w-10 block text-center text-sm text-gray-500 dark:text-neutral-500">
                      Fr
                    </span>
                    <span className="m-px w-10 block text-center text-sm text-gray-500 dark:text-neutral-500">
                      Sa
                    </span>
                    <span className="m-px w-10 block text-center text-sm text-gray-500 dark:text-neutral-500">
                      Su
                    </span>
                  </div>

                  <div className="flex">
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                        disabled
                      >
                        26
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                        disabled
                      >
                        27
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                        disabled
                      >
                        28
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                        disabled
                      >
                        29
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                        disabled
                      >
                        30
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        1
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        2
                      </button>
                    </div>
                  </div>

                  <div className="flex">
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        3
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        4
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        5
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        6
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        7
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        8
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        9
                      </button>
                    </div>
                  </div>

                  <div className="flex">
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        10
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        11
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        12
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        13
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        14
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        15
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        16
                      </button>
                    </div>
                  </div>

                  <div className="flex">
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        17
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        18
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        19
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center bg-blue-600 border border-transparent text-sm font-medium text-white hover:border-blue-600 rounded-full dark:bg-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100 dark:hover:border-neutral-700"
                      >
                        20
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        21
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        22
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        23
                      </button>
                    </div>
                  </div>

                  <div className="flex">
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        24
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        25
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        26
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        27
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        28
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        29
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        30
                      </button>
                    </div>
                  </div>

                  <div className="flex">
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                      >
                        31
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                        disabled
                      >
                        1
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                        disabled
                      >
                        2
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                        disabled
                      >
                        3
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                        disabled
                      >
                        4
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                        disabled
                      >
                        5
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="m-px w-10 h-10 flex justify-center items-center border border-transparent text-sm text-gray-800 rounded-full hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-blue-600 focus:text-blue-600 dark:text-neutral-200"
                        disabled
                      >
                        6
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <select
                data-hs-select='{
            "placeholder": "Filter",
            "toggleTag": "<button type=\"button\"></button>",
            "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative p-2 pe-8 inline-flex flex-shrink-0 justify-center items-center gap-x-1.5 border border-transparent text-sm text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:bg-gray-100 before:absolute before:inset-0 before:z-[1] dark:text-neutral-400 dark:xl:bg-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:bg-neutral-700",
            "dropdownClasses": "end-0 mt-2 p-1 space-y-0.5 z-50 w-40 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-900",
            "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 flex gap-x-3 py-1.5 px-2 text-[13px] text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
            "optionTemplate": "<div class=\"flex items-center w-full\"><div class=\"me-2 sm:me-3\" data-icon></div><span data-title></span><span class=\"hidden hs-selected:block ms-auto\"><svg class=\"flex-shrink-0 w-3.5 h-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
          }'
                className="hidden"
              >
                <option value="">Choose</option>
                <option
                  selected
                  data-hs-select-option='{
            "icon": "<svg class=\"flex-shrink-0 w-3 h-3 sm:w-3.5 sm:h-3.5\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"M7 2h10\"/><path d=\"M5 6h14\"/><rect width=\"18\" height=\"12\" x=\"3\" y=\"10\" rx=\"2\"/></svg>"}'
                >
                  All files
                </option>
                <option
                  data-hs-select-option='{
            "icon": "<svg class=\"flex-shrink-0 w-3 h-3 sm:w-3.5 sm:h-3.5\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z\"/><polyline points=\"14 2 14 8 20 8\"/><line x1=\"16\" x2=\"8\" y1=\"13\" y2=\"13\"/><line x1=\"16\" x2=\"8\" y1=\"17\" y2=\"17\"/><line x1=\"10\" x2=\"8\" y1=\"9\" y2=\"9\"/></svg>"}'
                >
                  Documents
                </option>
                <option
                  data-hs-select-option='{
            "icon": "<svg class=\"flex-shrink-0 w-3 h-3 sm:w-3.5 sm:h-3.5\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" ry=\"2\"/><circle cx=\"9\" cy=\"9\" r=\"2\"/><path d=\"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21\"/></svg>"}'
                >
                  Images
                </option>
                <option
                  data-hs-select-option='{
            "icon": "<svg class=\"flex-shrink-0 w-3 h-3 sm:w-3.5 sm:h-3.5\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"16 18 22 12 16 6\"/><polyline points=\"8 6 2 12 8 18\"/></svg>"}'
                >
                  Snippets
                </option>
                <option
                  data-hs-select-option='{
            "icon": "<svg class=\"flex-shrink-0 w-3 h-3 sm:w-3.5 sm:h-3.5\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z\"/><polyline points=\"14 2 14 8 20 8\"/><path d=\"M8 13h2\"/><path d=\"M8 17h2\"/><path d=\"M14 13h2\"/><path d=\"M14 17h2\"/></svg>"}'
                >
                  Spreadsheets
                </option>
                <option
                  data-hs-select-option='{
            "icon": "<svg class=\"flex-shrink-0 w-3 h-3 sm:w-3.5 sm:h-3.5\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polygon points=\"11 5 6 9 2 9 2 15 6 15 11 19 11 5\"/><path d=\"M15.54 8.46a5 5 0 0 1 0 7.07\"/><path d=\"M19.07 4.93a10 10 0 0 1 0 14.14\"/></svg>"}'
                >
                  Audio
                </option>
                <option
                  data-hs-select-option='{
            "icon": "<svg class=\"flex-shrink-0 w-3 h-3 sm:w-3.5 sm:h-3.5\" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><path d=\"m22 8-6 4 6 4V8Z\"/><rect width=\"14\" height=\"12\" x=\"2\" y=\"6\" rx=\"2\" ry=\"2\"/></svg>"}'
                >
                  Videos
                </option>
              </select>

              <div className="absolute top-1/2 end-2.5 -translate-y-1/2">
                <svg
                  className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-neutral-600"
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

            <div className="relative flex items-center">
              <span className="me-1 text-sm text-gray-800 dark:text-neutral-200">Sort:</span>
              <select
                data-hs-select='{
            "placeholder": "Sort",
            "toggleTag": "<button type=\"button\"></button>",
            "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative p-2 pe-8 inline-flex flex-shrink-0 justify-center items-center gap-x-1.5 border border-transparent text-sm text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-800 focus:outline-none focus:bg-gray-100 before:absolute before:inset-0 before:z-[1] dark:text-neutral-400 dark:xl:bg-neutral-800 dark:hover:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:bg-neutral-700",
            "dropdownClasses": "end-0 mt-2 p-1 space-y-0.5 z-50 w-32 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-900",
            "optionClasses": "hs-selected:bg-gray-100 dark:hs-selected:bg-neutral-800 flex gap-x-3 py-1.5 px-2 text-[13px] text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800",
            "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 w-3.5 h-3.5 text-gray-800 dark:text-neutral-200\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z\"/></svg></span></div>"
          }'
                className="hidden"
              >
                <option value="">Choose</option>
                <option selected>Newest first</option>
                <option>Oldest file</option>
                <option>A to Z</option>
                <option>Z to A</option>
              </select>

              <div className="absolute top-1/2 end-2.5 -translate-y-1/2">
                <svg
                  className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-neutral-600"
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
          </div>
        </div>
        <div className="pb-7 px-1 sm:px-5 sm:pb-10">
          {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 lg:gap-5"> */}
          <div className="">
            {aliasStatus ? (
              <h1 className="bg-gray-800 p-6 z-50">
                {aliases && (
                  <>
                    <div>
                      {aliases.data.alias.map((item) => (
                        <div className="text-gray-100" key={item.id}>
                          <p>{item.alias}</p>
                          <p>{item.name}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </h1>
            ) : (
              // <h2 className="">You have no inboxes yet. Please go ahead and add some</h2>
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 xl:gap-5">
                <div className="flex flex-col bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                  <div className="relative group">
                    <div className="h-36 sm:h-[170px] flex flex-col justify-center items-center">
                      <svg
                        className="flex-shrink-0 w-16 h-16"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.3333 32C14.2773 32 16.6667 29.6106 16.6667 26.6666V21.3333H11.3333C8.38933 21.3333 6 23.7226 6 26.6666C6 29.6106 8.38933 32 11.3333 32Z"
                          fill="#0ACF83"
                        />
                        <path
                          d="M6 16C6 13.056 8.38933 10.6667 11.3333 10.6667H16.6667V21.3334H11.3333C8.38933 21.3334 6 18.944 6 16Z"
                          fill="#A259FF"
                        />
                        <path
                          d="M6 5.33333C6 2.38933 8.38933 0 11.3333 0H16.6667V10.6667H11.3333C8.38933 10.6667 6 8.27733 6 5.33333Z"
                          fill="#F24E1E"
                        />
                        <path
                          d="M16.6667 0H22C24.944 0 27.3334 2.38933 27.3334 5.33333C27.3334 8.27733 24.944 10.6667 22 10.6667H16.6667V0Z"
                          fill="#FF7262"
                        />
                        <path
                          d="M27.3334 16C27.3334 18.944 24.944 21.3334 22 21.3334C19.056 21.3334 16.6667 18.944 16.6667 16C16.6667 13.056 19.056 10.6667 22 10.6667C24.944 10.6667 27.3334 13.056 27.3334 16Z"
                          fill="#1ABCFE"
                        />
                      </svg>
                    </div>

                    <div className="absolute top-3 end-3 group-hover:opacity-100 lg:opacity-0">
                      <div className="p-0.5 sm:p-1 inline-flex items-center bg-white border border-gray-200 lg:shadow rounded-lg dark:bg-neutral-800 dark:border-neutral-700">
                        <div className="hs-tooltip inline-block">
                          <a
                            className="hs-tooltip-toggle w-[30px] h-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            href="https://images.unsplash.com/photo-1635776062360-af423602aff3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
                            target="_blank"
                            download
                            rel="noreferrer"
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
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" x2="12" y1="15" y2="3" />
                            </svg>
                          </a>

                          <span
                            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                            role="tooltip"
                          >
                            Download
                          </span>
                        </div>

                        <div className="hs-tooltip inline-block">
                          <button
                            type="button"
                            className="hs-tooltip-toggle w-[30px] h-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            data-hs-overlay="#hs-pro-dupfmsh"
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
                              <circle cx="18" cy="5" r="3" />
                              <circle cx="6" cy="12" r="3" />
                              <circle cx="18" cy="19" r="3" />
                              <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                              <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                            </svg>
                          </button>

                          <span
                            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                            role="tooltip"
                          >
                            Share
                          </span>
                        </div>

                        <div className="w-px h-5 mx-1 bg-gray-200 dark:bg-neutral-700"></div>

                        <div className="hs-tooltip inline-block">
                          <button
                            type="button"
                            className="hs-tooltip-toggle w-[30px] h-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-red-600 hover:bg-red-100  disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-red-100 dark:text-red-500 dark:hover:bg-red-500/20 dark:focus:bg-red-500/20"
                            data-hs-overlay="#hs-pro-dupfmdl"
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
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              <line x1="10" x2="10" y1="11" y2="17" />
                              <line x1="14" x2="14" y1="11" y2="17" />
                            </svg>
                          </button>

                          <span
                            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                            role="tooltip"
                          >
                            Delete
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 flex items-center gap-x-3">
                    <span className="flex flex-shrink-0 justify-center items-center w-7 h-7 sm:w-[38px] sm:h-[38px] bg-white border border-gray-200 rounded-lg sm:rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
                      <svg
                        className="flex-shrink-0 w-3.5 h-3.5 sm:w-5 sm:h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14 4.5V14a2 2 0 0 1-2 2h-2v-1h2a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.928 15.849v-3.337h1.136v-.662H0v.662h1.134v3.337h.794Zm4.689-3.999h-.894L4.9 13.289h-.035l-.832-1.439h-.932l1.228 1.983-1.24 2.016h.862l.853-1.415h.035l.85 1.415h.907l-1.253-1.992 1.274-2.007Zm1.93.662v3.337h-.794v-3.337H6.619v-.662h3.064v.662H8.546Z"
                        />
                      </svg>
                    </span>

                    <div className="grow truncate">
                      <p className="block truncate text-sm font-semibold text-gray-800 dark:text-neutral-200">
                        Preline UI Figma.fig
                      </p>
                      <p className="block truncate text-xs text-gray-500 dark:text-neutral-500">
                        James Aug 5th, 2021
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                  <div className="relative group">
                    <div className="h-36 sm:h-[170px] flex flex-col justify-center items-center">
                      <svg
                        className="flex-shrink-0 w-16 h-16"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.0324 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 15.8079L25.9844 18.3197L31.9364 15.8079V8.86395L20.0324 1.91994Z"
                          fill="#21A366"
                        />
                        <path
                          d="M8.12839 8.86395H20.0324V15.8079H8.12839V8.86395Z"
                          fill="#107C41"
                        />
                        <path
                          d="M30.614 1.91994H20.0324V8.86395H31.9364V3.24228C31.9364 2.89158 31.7971 2.55523 31.5491 2.30725C31.3011 2.05926 30.9647 1.91994 30.614 1.91994Z"
                          fill="#33C481"
                        />
                        <path
                          d="M20.0324 15.8079H8.12839V28.3736C8.12839 28.7243 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.6959 9.45071 29.6959H30.6141C30.9647 29.6959 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7243 31.9364 28.3736V22.7519L20.0324 15.8079Z"
                          fill="#185C37"
                        />
                        <path
                          d="M20.0324 15.8079H31.9364V22.7519H20.0324V15.8079Z"
                          fill="#107C41"
                        />
                        <path
                          opacity="0.1"
                          d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z"
                          fill="black"
                        />
                        <path
                          opacity="0.2"
                          d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                          fill="black"
                        />
                        <path
                          opacity="0.2"
                          d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z"
                          fill="black"
                        />
                        <path
                          opacity="0.2"
                          d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z"
                          fill="black"
                        />
                        <path
                          d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16402 23.7439 0.827672 23.6047 0.579686 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579686 8.25922C0.827672 8.01122 1.16402 7.87194 1.51472 7.87194Z"
                          fill="#107C41"
                        />
                        <path
                          d="M3.69711 20.7679L6.90722 15.794L3.96694 10.8479H6.33286L7.93791 14.0095C8.08536 14.3091 8.18688 14.5326 8.24248 14.68H8.26328C8.36912 14.4407 8.47984 14.2079 8.5956 13.9817L10.3108 10.8479H12.4822L9.46656 15.7663L12.5586 20.7679H10.2473L8.3932 17.2959C8.30592 17.148 8.23184 16.9927 8.172 16.8317H8.14424C8.09016 16.9891 8.01824 17.1399 7.92998 17.2811L6.02236 20.7679H3.69711Z"
                          fill="white"
                        />
                      </svg>
                    </div>

                    <div className="absolute top-3 end-3 group-hover:opacity-100 lg:opacity-0">
                      <div className="p-0.5 sm:p-1 inline-flex items-center bg-white border border-gray-200 lg:shadow rounded-lg dark:bg-neutral-800 dark:border-neutral-700">
                        <div className="hs-tooltip inline-block">
                          <a
                            className="hs-tooltip-toggle w-[30px] h-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            href="https://images.unsplash.com/photo-1635776062360-af423602aff3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
                            target="_blank"
                            download
                            rel="noreferrer"
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
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" x2="12" y1="15" y2="3" />
                            </svg>
                          </a>

                          <span
                            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                            role="tooltip"
                          >
                            Download
                          </span>
                        </div>

                        <div className="hs-tooltip inline-block">
                          <button
                            type="button"
                            className="hs-tooltip-toggle w-[30px] h-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            data-hs-overlay="#hs-pro-dupfmsh"
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
                              <circle cx="18" cy="5" r="3" />
                              <circle cx="6" cy="12" r="3" />
                              <circle cx="18" cy="19" r="3" />
                              <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                              <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                            </svg>
                          </button>

                          <span
                            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                            role="tooltip"
                          >
                            Share
                          </span>
                        </div>

                        <div className="w-px h-5 mx-1 bg-gray-200 dark:bg-neutral-700"></div>

                        <div className="hs-tooltip inline-block">
                          <button
                            type="button"
                            className="hs-tooltip-toggle w-[30px] h-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-red-600 hover:bg-red-100  disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-red-100 dark:text-red-500 dark:hover:bg-red-500/20 dark:focus:bg-red-500/20"
                            data-hs-overlay="#hs-pro-dupfmdl"
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
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              <line x1="10" x2="10" y1="11" y2="17" />
                              <line x1="14" x2="14" y1="11" y2="17" />
                            </svg>
                          </button>

                          <span
                            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                            role="tooltip"
                          >
                            Delete
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 flex items-center gap-x-3">
                    <span className="flex flex-shrink-0 justify-center items-center w-7 h-7 sm:w-[38px] sm:h-[38px] bg-white border border-gray-200 rounded-lg sm:rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
                      <svg
                        className="flex-shrink-0 w-3.5 h-3.5 sm:w-5 sm:h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14 4.5V14a2 2 0 0 1-2 2h-2v-1h2a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.928 15.849v-3.337h1.136v-.662H0v.662h1.134v3.337h.794Zm4.689-3.999h-.894L4.9 13.289h-.035l-.832-1.439h-.932l1.228 1.983-1.24 2.016h.862l.853-1.415h.035l.85 1.415h.907l-1.253-1.992 1.274-2.007Zm1.93.662v3.337h-.794v-3.337H6.619v-.662h3.064v.662H8.546Z"
                        />
                      </svg>
                    </span>

                    <div className="grow truncate">
                      <p className="block truncate text-sm font-semibold text-gray-800 dark:text-neutral-200">
                        weekly_report.xls
                      </p>
                      <p className="block truncate text-xs text-gray-500 dark:text-neutral-500">
                        James Oct 17th, 2021
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col bg-white border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                  <div className="relative group">
                    <div className="h-36 sm:h-[170px] flex flex-col justify-center items-center">
                      <svg
                        className="flex-shrink-0 w-12 h-12 text-gray-400 dark:text-neutral-600"
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
                        <line x1="21" x2="3" y1="6" y2="6" />
                        <line x1="15" x2="3" y1="12" y2="12" />
                        <line x1="17" x2="3" y1="18" y2="18" />
                      </svg>
                    </div>

                    <div className="absolute top-3 end-3 group-hover:opacity-100 lg:opacity-0">
                      <div className="p-0.5 sm:p-1 inline-flex items-center bg-white border border-gray-200 lg:shadow rounded-lg dark:bg-neutral-800 dark:border-neutral-700">
                        <div className="hs-tooltip inline-block">
                          <a
                            className="hs-tooltip-toggle w-[30px] h-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            href="https://images.unsplash.com/photo-1635776062360-af423602aff3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
                            target="_blank"
                            download
                            rel="noreferrer"
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
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" x2="12" y1="15" y2="3" />
                            </svg>
                          </a>

                          <span
                            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                            role="tooltip"
                          >
                            Download
                          </span>
                        </div>

                        <div className="hs-tooltip inline-block">
                          <button
                            type="button"
                            className="hs-tooltip-toggle w-[30px] h-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                            data-hs-overlay="#hs-pro-dupfmsh"
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
                              <circle cx="18" cy="5" r="3" />
                              <circle cx="6" cy="12" r="3" />
                              <circle cx="18" cy="19" r="3" />
                              <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
                              <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
                            </svg>
                          </button>

                          <span
                            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                            role="tooltip"
                          >
                            Share
                          </span>
                        </div>

                        <div className="w-px h-5 mx-1 bg-gray-200 dark:bg-neutral-700"></div>

                        <div className="hs-tooltip inline-block">
                          <button
                            type="button"
                            className="hs-tooltip-toggle w-[30px] h-[30px] inline-flex justify-center items-center gap-x-2 rounded-lg border border-transparent text-red-600 hover:bg-red-100  disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-red-100 dark:text-red-500 dark:hover:bg-red-500/20 dark:focus:bg-red-500/20"
                            data-hs-overlay="#hs-pro-dupfmdl"
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
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              <line x1="10" x2="10" y1="11" y2="17" />
                              <line x1="14" x2="14" y1="11" y2="17" />
                            </svg>
                          </button>

                          <span
                            className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg dark:bg-neutral-700"
                            role="tooltip"
                          >
                            Delete
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 flex items-center gap-x-3">
                    <span className="flex flex-shrink-0 justify-center items-center w-7 h-7 sm:w-[38px] sm:h-[38px] bg-white border border-gray-200 rounded-lg sm:rounded-lg dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
                      <svg
                        className="flex-shrink-0 w-3.5 h-3.5 sm:w-5 sm:h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM4.151 15.29a1.176 1.176 0 0 1-.111-.449h.764a.578.578 0 0 0 .255.384c.07.049.154.087.25.114.095.028.201.041.319.041.164 0 .301-.023.413-.07a.559.559 0 0 0 .255-.193.507.507 0 0 0 .084-.29.387.387 0 0 0-.152-.326c-.101-.08-.256-.144-.463-.193l-.618-.143a1.72 1.72 0 0 1-.539-.214 1.001 1.001 0 0 1-.352-.367 1.068 1.068 0 0 1-.123-.524c0-.244.064-.457.19-.639.128-.181.304-.322.528-.422.225-.1.484-.149.777-.149.304 0 .564.05.779.152.217.102.384.239.5.41.12.17.186.359.2.566h-.75a.56.56 0 0 0-.12-.258.624.624 0 0 0-.246-.181.923.923 0 0 0-.37-.068c-.216 0-.387.05-.512.152a.472.472 0 0 0-.185.384c0 .121.048.22.144.3a.97.97 0 0 0 .404.175l.621.143c.217.05.406.12.566.211a1 1 0 0 1 .375.358c.09.148.135.335.135.56 0 .247-.063.466-.188.656a1.216 1.216 0 0 1-.539.439c-.234.105-.52.158-.858.158-.254 0-.476-.03-.665-.09a1.404 1.404 0 0 1-.478-.252 1.13 1.13 0 0 1-.29-.375Zm-3.104-.033a1.32 1.32 0 0 1-.082-.466h.764a.576.576 0 0 0 .074.27.499.499 0 0 0 .454.246c.19 0 .33-.055.422-.164.091-.11.137-.265.137-.466v-2.745h.791v2.725c0 .44-.119.774-.357 1.005-.237.23-.565.345-.985.345a1.59 1.59 0 0 1-.568-.094 1.145 1.145 0 0 1-.407-.266 1.14 1.14 0 0 1-.243-.39Zm9.091-1.585v.522c0 .256-.039.47-.117.641a.862.862 0 0 1-.322.387.877.877 0 0 1-.47.126.883.883 0 0 1-.47-.126.87.87 0 0 1-.32-.387 1.55 1.55 0 0 1-.117-.641v-.522c0-.258.039-.471.117-.641a.87.87 0 0 1 .32-.387.868.868 0 0 1 .47-.129c.177 0 .333.043.47.129a.862.862 0 0 1 .322.387c.078.17.117.383.117.641Zm.803.519v-.513c0-.377-.069-.701-.205-.973a1.46 1.46 0 0 0-.59-.63c-.253-.146-.559-.22-.916-.22-.356 0-.662.074-.92.22a1.441 1.441 0 0 0-.589.628c-.137.271-.205.596-.205.975v.513c0 .375.068.699.205.973.137.271.333.48.589.626.258.145.564.217.92.217.357 0 .663-.072.917-.217.256-.146.452-.355.589-.626.136-.274.205-.598.205-.973Zm1.29-.935v2.675h-.746v-3.999h.662l1.752 2.66h.032v-2.66h.75v4h-.656l-1.761-2.676h-.032Z"
                        />
                      </svg>
                    </span>

                    <div className="grow truncate">
                      <p className="block truncate text-sm font-semibold text-gray-800 dark:text-neutral-200">
                        gitignore.json
                      </p>
                      <p className="block truncate text-xs text-gray-500 dark:text-neutral-500">
                        James Apr 21st, 2020
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* separate here */}
      <div
        id="hs-pro-dupfmdl"
        className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none [--close-when-click-inside:true] dark:hs-overlay-backdrop-open:bg-neutral-900/90"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-md sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="relative max-h-full w-full overflow-hidden flex flex-col bg-white rounded-xl pointer-events-auto shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-800 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]">
            <div className="absolute top-2 end-4 z-10">
              <button
                type="button"
                className="w-8 h-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                data-hs-overlay="#hs-pro-dupfmdl"
              >
                <span className="sr-only">Close modal</span>
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-neutral-200">
                Are you sure?
              </h3>
              <p className="mt-1 text-gray-500 dark:text-neutral-500">
                Are you sure you want to delete this file?
              </p>

              <div className="mt-4 flex justify-end gap-x-3">
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  data-hs-overlay="#hs-pro-dupfmdl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Yes, I’m sure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="hs-pro-dupfmsh"
        className="hs-overlay hidden w-full h-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none [--close-when-click-inside:true] dark:hs-overlay-backdrop-open:bg-neutral-900/90"
      >
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-md sm:w-full m-3 sm:mx-auto h-[calc(100%-3.5rem)] min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="relative max-h-full w-full overflow-hidden flex flex-col bg-white rounded-xl pointer-events-auto shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:bg-neutral-800 dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)]">
            <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-neutral-700">
              <h3 className="font-semibold text-gray-800 dark:text-neutral-200">Share this file</h3>

              <button
                type="button"
                className="w-8 h-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600"
                data-hs-overlay="#hs-pro-dupfmsh"
              >
                <span className="sr-only">Close modal</span>
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
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            </div>

            <form>
              <div className="p-4 space-y-4">
                <input
                  type="text"
                  className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                  placeholder="Search for team or person"
                ></input>

                <textarea
                  id="hs-pro-daemdc"
                  className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:placeholder:text-white/60 dark:focus:ring-neutral-600"
                  rows={3}
                  placeholder="Add a message, if you’d like."
                ></textarea>

                <div className="p-3 flex items-center gap-x-3 border border-gray-200 rounded-xl dark:border-neutral-700">
                  <img
                    className="w-[38px] h-[38px] object-cover rounded-md"
                    src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80"
                    alt="Image Description"
                  ></img>

                  <div className="grow truncate">
                    <p className="block truncate text-sm font-semibold text-gray-800 dark:text-neutral-200">
                      gradient.png
                    </p>
                    <p className="block truncate text-xs text-gray-500 dark:text-neutral-500">
                      James Sep 2nd, 2022
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 flex justify-between gap-x-2">
                <div className="w-full">
                  <button
                    type="button"
                    className="py-2 px-2.5 inline-flex justify-center items-center gap-x-1 rounded-lg bg-gray-100 font-medium text-xs text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
                  >
                    <svg
                      className="flex-shrink-0 w-3 h-3"
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
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    Copy link
                  </button>
                </div>

                <div className="w-full flex justify-end items-center gap-x-2">
                  <button
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                    data-hs-overlay="#hs-pro-dupfmsh"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    data-hs-overlay="#hs-pro-dupfmsh"
                  >
                    Share
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inboxes;
