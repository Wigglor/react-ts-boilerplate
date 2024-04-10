import { AxiosError } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

type inboxNameResponse = {
  uniqueAlias: {
    id: string;
    inboxName: string;
    alias: string;
    createdAt: string;
    updatedAt: string;
    accountId: string;
  };
};

type Alias = {
  data: {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    alias: string;
    domainId: string;
  }[];
};

type AliasInput = {
  inboxName: string;
};

const Inboxes = (): ReactElement => {
  const [addInbox, setAddInbox] = useState<boolean>(false);
  const [aliasStatus, setAliasStatus] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [aliases, setAliases] = useState<Alias>();
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
        <div className="px-4 sm:px-7 mb-3">
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

      <div className="pb-7 px-1 sm:px-5 sm:pb-10">
        <div className="">
          {aliasStatus ? (
            <h1 className="bg-gray-800 p-6 z-50">
              {aliases && (
                <>
                  <div>
                    {aliases.data.map((item) => (
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
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Inboxes;
