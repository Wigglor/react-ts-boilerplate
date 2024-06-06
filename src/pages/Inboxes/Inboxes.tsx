import { AxiosError } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

type AliasItems = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  alias: string;
  domainId: string;
  inboxName: string;
};

type Alias = {
  data: AliasItems[];
  // data: {
  //   id: string;
  //   createdAt: string;
  //   updatedAt: string;
  //   name: string;
  //   alias: string;
  //   domainId: string;
  //   inboxName: string;
  // }[];
};

type AliasInput = {
  inboxName: string;
};

const Inboxes = (): ReactElement => {
  const [addInbox, setAddInbox] = useState<boolean>(false);
  const [aliasStatus, setAliasStatus] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [aliases, setAliases] = useState<Alias>();
  const [searchVal, setSearchVal] = useState<string>("");
  const axiosPrivate = useAxiosPrivate();

  const {
    register: inboxNameForm,
    reset: resetInboxNameForm,
    handleSubmit: handleInboxNameForm,
    formState: { errors: inboxNameErrorsForm },
  } = useForm<AliasInput>();

  const toggleInbox = () => {
    resetInboxNameForm();
    setAddInbox((prev) => !prev);
  };

  const handleInboxNameClick: SubmitHandler<AliasInput> = async (data: AliasInput) => {
    console.log(`AliasInput: ${JSON.stringify(data)}`);
    try {
      // const workspaceResponse: ApiResponse<inboxNameResponse> = await axiosPrivate.post(
      await axiosPrivate.post(
        "/assign-alias",
        JSON.stringify({
          inboxName: data.inboxName,
        }),
        {
          withCredentials: true,
        },
      );

      resetInboxNameForm();
      setAddInbox((prev) => !prev);
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrorMessage(err.response?.data.message);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const getAliases = async () => {
      try {
        const response: ApiResponse<Alias> = await axiosPrivate.get(
          "/check-domain",

          {
            signal: controller.signal,
            withCredentials: true,
          },
        );

        if (response.data.data.length > 0) {
          setAliasStatus(true);
          setAliases(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getAliases();

    return () => {
      controller.abort();
    };
  }, []);

  const filteredData = aliases?.data.filter((item) =>
    item.inboxName.toLowerCase().includes(searchVal.toLowerCase()),
  ) as AliasItems[];

  if (!aliasStatus) {
    return <h1 className="p-6 bg-gray-800 text-gray-100">Loading...</h1>;
  }

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
                      <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                          Create an Inbox
                        </h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          Name the inbox - receive an email email alias
                        </p>
                      </div>

                      <div className="mt-5">
                        <form onSubmit={handleInboxNameForm(handleInboxNameClick)}>
                          <div className="grid gap-y-4">
                            <div>
                              <label htmlFor="email" className="block text-sm mb-2 dark:text-white">
                                Name Inbox
                              </label>
                              <input
                                id="inboxName"
                                type="text"
                                {...inboxNameForm("inboxName")}
                                name="inboxName"
                                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                                required
                              ></input>
                              {inboxNameErrorsForm.inboxName && (
                                <span className="bg-red-600 text-white p-2" role="alert">
                                  {inboxNameErrorsForm.inboxName.message}
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
        <div className="px-4 sm:mx-7 mb-3">
          <h3 className="font-semibold text-gray-800 dark:text-neutral-200">My Inboxes</h3>
          {/* CHANGE THIS LATER */}
          {errorMessage && (
            <p className="bg-red-60 p-3 text-white rounded-lg w-full">{errorMessage}</p>
          )}
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

      <div className="sm:mx-7 p-5 space-y-4 mb-4 flex flex-col bg-gray-700 border border-stone-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
        <div className="grid md:grid-cols-2 gap-y-2 md:gap-y-0 md:gap-x-5">
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
                <svg
                  className="flex-shrink-0 size-4 text-stone-500 dark:text-neutral-400"
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
                onChange={(e) => setSearchVal(e.target.value)}
                // onChange={(e) => filterSearch(e)}
                type="text"
                value={searchVal}
                className="py-[7px] px-3 ps-10 block w-full bg-stone-100 border-transparent rounded-lg text-sm placeholder:text-stone-500 focus:border-gray-500 focus:ring-gray-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:border-transparent dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:ring-neutral-600"
                placeholder="Search inbox"
              ></input>
            </div>
          </div>

          <div className="flex md:justify-end items-center gap-x-2">
            {/* <div className="hs-dropdown [--auto-close:inside] inline-flex">
              <button
                id="hs-pro-dnic"
                type="button"
                className="py-2 px-2.5 inline-flex items-center gap-x-1.5 text-xs font-medium rounded-lg border border-stone-200 bg-white text-stone-800 shadow-sm hover:bg-stone-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              >
                25 Jul - 25 Aug
                <svg
                  className="flex-shrink-0 size-3.5"
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
                className="hs-dropdown-menu hs-dropdown-open:opacity-100 w-[318px] sm:w-[636px] transition-[opacity,margin] duration opacity-0 hidden z-50 bg-white rounded-xl shadow-[0_10px_40px_10px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_10px_rgba(0,0,0,0.2)] dark:bg-neutral-900"
                aria-labelledby="hs-pro-dnic"
              >
                <div className="sm:flex">
                  <div className="p-3 space-y-0.5">
                    <div className="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3">
                      <div className="col-span-1">
                        <button
                          type="button"
                          className="size-8 flex justify-center items-center text-stone-800 hover:bg-stone-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                        >
                          <svg
                            className="flex-shrink-0 size-4"
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
                        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative flex text-nowrap w-full cursor-pointer text-start font-medium text-stone-800 hover:text-stone-600 focus:outline-none focus:text-stone-600 before:absolute before:inset-0 before:z-[1] dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300",
                        "dropdownClasses": "mt-2 z-50 w-32 max-h-72 p-1 space-y-0.5 bg-white border border-stone-200 rounded-lg shadow-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-thumb]:bg-stone-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                        "optionClasses": "p-2 w-full text-sm text-stone-800 cursor-pointer hover:bg-stone-100 rounded-lg focus:outline-none focus:bg-stone-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                        "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-stone-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
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

                        <span className="text-stone-800 dark:text-neutral-200">/</span>

                        <div className="relative">
                          <select
                            data-hs-select='{
                        "placeholder": "Select year",
                        "toggleTag": "<button type=\"button\"></button>",
                        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative flex text-nowrap w-full cursor-pointer text-start font-medium text-stone-800 hover:text-stone-600 focus:outline-none focus:text-stone-600 before:absolute before:inset-0 before:z-[1] dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300",
                        "dropdownClasses": "mt-2 z-50 w-20 max-h-72 p-1 space-y-0.5 bg-white border border-stone-200 rounded-lg shadow-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-thumb]:bg-stone-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                        "optionClasses": "p-2 w-full text-sm text-stone-800 cursor-pointer hover:bg-stone-100 rounded-lg focus:outline-none focus:bg-stone-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                        "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-stone-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
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
                          className="opacity-0 pointer-events-none size-8 flex justify-center items-center text-stone-800 hover:bg-stone-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                        >
                          <svg
                            className="flex-shrink-0 size-4"
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
                      <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                        Mo
                      </span>
                      <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                        Tu
                      </span>
                      <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                        We
                      </span>
                      <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                        Th
                      </span>
                      <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                        Fr
                      </span>
                      <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                        Sa
                      </span>
                      <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                        Su
                      </span>
                    </div>
                    <div className="flex">
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                          disabled
                        >
                          26
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                          disabled
                        >
                          27
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                          disabled
                        >
                          28
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                          disabled
                        >
                          29
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                          disabled
                        >
                          30
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          1
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          2
                        </button>
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          3
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          4
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          5
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          6
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          7
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          8
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          9
                        </button>
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          10
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          11
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          12
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          13
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          14
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          15
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          16
                        </button>
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          17
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          18
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          19
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          20
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          21
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          22
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          23
                        </button>
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          24
                        </button>
                      </div>
                      <div className="bg-stone-100 rounded-s-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center bg-green-600 border border-transparent text-sm font-medium text-white hover:border-green-600 rounded-full dark:bg-green-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:hover:border-neutral-700"
                        >
                          25
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          26
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          27
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          28
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          29
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          30
                        </button>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          31
                        </button>
                      </div>
                      <div className="bg-gradient-to-r from-stone-100 dark:from-stone-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                          disabled
                        >
                          1
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                          disabled
                        >
                          2
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                          disabled
                        >
                          3
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                          disabled
                        >
                          4
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                          disabled
                        >
                          5
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                          disabled
                        >
                          6
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 space-y-0.5">
                    <div className="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3">
                      <div className="col-span-1">
                        <button
                          type="button"
                          className="opacity-0 pointer-events-none size-8 flex justify-center items-center text-stone-800 hover:bg-stone-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                        >
                          <svg
                            className="flex-shrink-0 size-4"
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
                        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative flex text-nowrap w-full cursor-pointer text-start font-medium text-stone-800 hover:text-stone-600 focus:outline-none focus:text-stone-600 before:absolute before:inset-0 before:z-[1] dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300",
                        "dropdownClasses": "mt-2 z-50 w-32 max-h-72 p-1 space-y-0.5 bg-white border border-stone-200 rounded-lg shadow-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-thumb]:bg-stone-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                        "optionClasses": "p-2 w-full text-sm text-stone-800 cursor-pointer hover:bg-stone-100 rounded-lg focus:outline-none focus:bg-stone-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                        "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-stone-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
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

                        <span className="text-stone-800 dark:text-neutral-200">/</span>

                        <div className="relative">
                          <select
                            data-hs-select='{
                        "placeholder": "Select year",
                        "toggleTag": "<button type=\"button\"></button>",
                        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative flex text-nowrap w-full cursor-pointer text-start font-medium text-stone-800 hover:text-stone-600 focus:outline-none focus:text-stone-600 before:absolute before:inset-0 before:z-[1] dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300",
                        "dropdownClasses": "mt-2 z-50 w-20 max-h-72 p-1 space-y-0.5 bg-white border border-stone-200 rounded-lg shadow-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-stone-100 [&::-webkit-scrollbar-thumb]:bg-stone-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                        "optionClasses": "p-2 w-full text-sm text-stone-800 cursor-pointer hover:bg-stone-100 rounded-lg focus:outline-none focus:bg-stone-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                        "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 size-3.5 text-stone-800 dark:text-neutral-200\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
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
                          className="size-8 flex justify-center items-center text-stone-800 hover:bg-stone-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                        >
                          <svg
                            className="flex-shrink-0 size-4"
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
                      <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                        Mo
                      </span>
                      <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                        Tu
                      </span>
                      <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                        We
                      </span>
                      <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                        Th
                      </span>
                      <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                        Fr
                      </span>
                      <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                        Sa
                      </span>
                      <span className="m-px w-10 block text-center text-sm text-stone-500 dark:text-neutral-500">
                        Su
                      </span>
                    </div>
                    <div className="flex">
                      <div className="bg-gradient-to-l from-stone-100 dark:from-stone-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                          disabled
                        >
                          31
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                        >
                          1
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                        >
                          2
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                        >
                          3
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                        >
                          4
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          5
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          6
                        </button>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          7
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          8
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          9
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          10
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          11
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          12
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          13
                        </button>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          14
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          15
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          16
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          17
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          18
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          19
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          20
                        </button>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          21
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          22
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          23
                        </button>
                      </div>
                      <div className="bg-stone-100 first:rounded-s-full last:rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          24
                        </button>
                      </div>
                      <div className="bg-stone-100 rounded-e-full dark:bg-neutral-800">
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center bg-green-600 border border-transparent text-sm font-medium text-white hover:border-green-600 rounded-full dark:bg-green-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:hover:border-neutral-700"
                        >
                          25
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          26
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          27
                        </button>
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          28
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          29
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          30
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 rounded-full hover:border-green-600 hover:text-green-600 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:border-green-600 focus:text-green-600 dark:text-neutral-200"
                        >
                          31
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                          disabled
                        >
                          1
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                          disabled
                        >
                          2
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                          disabled
                        >
                          3
                        </button>
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                          disabled
                        >
                          4
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                          disabled
                        >
                          5
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                          disabled
                        >
                          6
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                          disabled
                        >
                          7
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                          disabled
                        >
                          8
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                          disabled
                        >
                          9
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="m-px size-10 flex justify-center items-center border border-transparent text-sm text-stone-800 hover:border-green-600 hover:text-green-600 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:text-neutral-200 dark:hover:border-neutral-500 dark:focus:bg-neutral-700"
                          disabled
                        >
                          10
                        </button>
                      </div>
                    </div>
                    <div className="pt-4 flex justify-end gap-x-2">
                      <button
                        type="button"
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-stone-200 bg-white text-stone-800 shadow-sm hover:bg-stone-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                        data-hs-overlay="#hs-pro-edmad"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="py-2 px-3  inline-flex justify-center items-center gap-x-2 text-xs font-semibold rounded-lg border border-transparent bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-green-500"
                        data-hs-overlay="#hs-pro-edmad"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="hs-dropdown [--auto-close:inside] [--placement:bottom-right] relative inline-flex">
              <button
                id="hs-pro-dupfind"
                type="button"
                className="py-2 px-2.5 inline-flex items-center gap-x-1.5 text-xs rounded-lg border border-stone-200 bg-white text-stone-800 shadow-sm hover:bg-stone-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-stone-100 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              >
                <svg
                  className="flex-shrink-0 size-3.5"
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
                  <line x1="21" x2="14" y1="4" y2="4" />
                  <line x1="10" x2="3" y1="4" y2="4" />
                  <line x1="21" x2="12" y1="12" y2="12" />
                  <line x1="8" x2="3" y1="12" y2="12" />
                  <line x1="21" x2="16" y1="20" y2="20" />
                  <line x1="12" x2="3" y1="20" y2="20" />
                  <line x1="14" x2="14" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="10" y2="14" />
                  <line x1="16" x2="16" y1="18" y2="22" />
                </svg>
                Filter
                <span className="font-medium text-[10px] py-0.5 px-[5px] bg-stone-800 text-white leading-3 rounded-full dark:bg-neutral-500">
                  7
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:mx-7 grid grid-cols-1 sm:grid-cols-4 gap-3">
        {aliases && (
          <>
            {/* {aliases.data.map((item) => ( */}
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="p-4 group relative flex flex-col border border-gray-200 bg-white hover:border-gray-300 dark:bg-neutral-800 dark:border-neutral-700/50 dark:hover:border-neutral-700 rounded-lg"
              >
                <div className="h-full flex gap-x-5">
                  <div className="grow">
                    <div className="h-full flex flex-col">
                      <div>
                        <Link
                          to={`/inboxes/${item.id}`}
                          state={{ inboxName: item.inboxName, alias: item.alias }}
                        >
                          <h3 className="inline-flex items-center gap-x-1 font-medium text-gray-800 dark:text-neutral-200">
                            {item.inboxName}
                          </h3>
                          <p>{item.id}</p>
                        </Link>

                        <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                          Alias: {item.alias}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Inboxes;
