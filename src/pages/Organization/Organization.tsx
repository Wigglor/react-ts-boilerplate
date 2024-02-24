import { AxiosError } from "axios";
import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useWorkSpaces from "../../hooks/useWorkSpaces";
// import axios from "axios";

interface ApiResponse<T> {
  status: number;
  success: boolean;
  message: string;
  data: T;
}

interface MembershipsAttribute {
  createdAt: string;
  updatedAt: string;
  id: string;
  roleAccess: string;
  accountEmail: string;
  companyId: string;
  userId: string;
  user: UserInvite;
}

interface User {
  result: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    accessLevel: string;
    accountId: string;
    memberships: MembershipsAttribute[];
  };
}

interface Membership {
  createdAt: string;
  updatedAt: string;
  id: string;
  roleAccess: string;
  accountEmail: string;
  companyId: string;
  userId: string;
}

interface UserInvite {
  createdAt: string;
  updatedAt: string;
  id: string;
  cognitoId: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  verificationStatus: string;
  setup: string;
}

interface Invite {
  result: {
    memberships: Membership;
    user: UserInvite;
  };
}

interface workspaceResponse {
  workspace: Workspace;
}

type FormData = {
  email: string;
};

type RequireAuthProps = {
  allowedRoles: string[];
};

type Workspace = {
  name: string;
  id: string;
};
type WorkspaceInput = {
  workspace: string;
};

const Organization = ({ allowedRoles }: RequireAuthProps): ReactElement => {
  const {
    // setValue,
    handleSubmit,
    register,
    // control,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const {
    register: workspaceForm,
    reset: resetAddworkspaceForm,
    handleSubmit: handleAddWorkspaceForm,
    formState: { errors: workspaceErrorsForm },
  } = useForm<WorkspaceInput>();

  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [deleteUserMessage, setDeleteUserMessage] = useState<number | null>(null);
  const [deleteUserErrorMessage, setDeleteUserErrorMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [updateUsers, setUpdateUsers] = useState(false);
  // const { workSpaces /*setWorkSpaces*/ } = useWorkSpaces();
  const { workspaceData, updateWorkspaceData } = useWorkSpaces();
  const [deleteEmail, setDeleteEmail] = useState<string | null>(null);
  const [inviteEmail, setInviteEmail] = useState<boolean>(false);
  const [AddWorkspace, setAddWorkspace] = useState<boolean>(false);
  const [deleteEmailConfirmation, setDeleteEmailConfirmation] = useState<boolean>(false);
  const [emailCheckValue, setEmailCheckValue] = useState<string>("");
  const [stateSelectedWorkspace, setSelectedWorkspace] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("handleChange....");
    // const selectedWorkSpace_ = workSpaces.availableWorkSpaces.find(
    const selectedWorkSpace_ = workspaceData.availableWorkSpaces.find(
      (wp: Workspace) => wp.name === event.target.value,
    );
    setSelectedWorkspace(event.target.value);
    const newWorkspaceData = { ...workspaceData };
    newWorkspaceData.availableWorkSpaces = workspaceData.availableWorkSpaces;
    newWorkspaceData.selectedWorkSpace = selectedWorkSpace_ as { name: string; id: string };
    updateWorkspaceData(newWorkspaceData);
    // updateWorkspaceData({
    //   availableWorkSpaces: workspaceData.availableWorkSpaces,
    //   selectedWorkSpace: selectedWorkSpace_ as { name: string; id: string },
    // });
    // TRY THE BELOW INSTEAD OF MUTATING EXISTING DATA
    /*updateWorkspaceData({
      // Use spread operator to create a new array instance if modifications are needed
      availableWorkSpaces: [...workspaceData.availableWorkSpaces],
    
      // Ensure selectedWorkSpace is treated as a new object
      selectedWorkSpace: {...selectedWorkSpace_ as { name: string; id: string }},
    });
    
    -- OR(???):
    const newWorkspaceData = {...workspaceData};
    newWorkspaceData.availableWorkSpaces = workspaceData.availableWorkSpaces
    newWorkspaceData.selectedWorkSpace = selectedWorkSpace_ as { name: string; id: string }
    updateWorkspaceData(newWorkspaceData)
    
    */

    // setWorkSpaces((prevState) => {
    //   return { ...prevState, selectedWorkSpace: selectedWorkSpace_! };
    // });
  };

  const deleteUserModal = (email: string) => {
    // if (paidPlan !== true) {
    //   setSelectedPrice(price);
    // }
    setDeleteEmail(email);
    setEmailCheckValue("");
    if (deleteUserErrorMessage !== null) {
      setDeleteUserErrorMessage(null);
    }
  };

  const addWorkspaceModal = () => {
    setAddWorkspace(true);
  };

  const closeWorkspaceModal = () => {
    setAddWorkspace(false);
    resetAddworkspaceForm();
  };

  const inviteUserModal = () => {
    setInviteEmail(true);
  };

  const closeDeleteModal = () => {
    setDeleteEmail(null);
    setDeleteEmailConfirmation(false);
  };

  const closeInviteModal = () => {
    setInviteEmail(false);
    reset();
  };
  // Perhaps use a better fetching technique here. useMemo?
  useEffect(() => {
    const controller = new AbortController();
    const getUser = async () => {
      try {
        const response: ApiResponse<User> = await axiosPrivate.post(
          "/subscription/users",
          JSON.stringify({
            workSpaceId: workspaceData.selectedWorkSpace.id,
            // workSpaceId: workSpaces.selectedWorkSpace.id,
          }),
          {
            signal: controller.signal,
            withCredentials: true,
          },
        );

        setUser(response.data);
      } catch (err) {
        console.error(err);
      }
      // finally {
      //   // isMounted && setIsLoading(false);
      //   setIsLoading(false);
      // }
    };
    if (allowedRoles?.includes(auth?.role as string) && auth?.role === "ADMIN") {
      getUser();
    }

    return () => {
      controller.abort();
    };
  }, [updateUsers, workspaceData]);

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const inviteResponse: ApiResponse<Invite> = await axiosPrivate.post(
        "/inviteuser",
        JSON.stringify({
          email: data.email,
          companyId: workspaceData.selectedWorkSpace.id,
          // companyId: workSpaces.selectedWorkSpace.id,
        }),
        {
          withCredentials: true,
        },
      );
      setUpdateUsers((prev) => !prev);
      reset();
      setInviteEmail(false);
      setSuccessMessage("Invite sent!");
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrorMessage(err.response?.data.message);
      }
    }
  };

  const setters = {
    setEmailCheckValue,
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>, key: keyof typeof setters) => {
    const setter = setters[key];
    setter(e.target.value);
  };

  const handleDeleteClick = async (email: string) => {
    if (emailCheckValue === email) {
      try {
        const deleteUserResponse: ApiResponse<string> = await axiosPrivate.post(
          "/remove-user",
          JSON.stringify({
            email: email,
          }),
          {
            withCredentials: true,
          },
        );
        setUpdateUsers((prev) => !prev);
        setDeleteUserMessage(deleteUserResponse.status);
        // setDeleteEmail(null);
        setDeleteEmailConfirmation(true);
        setEmailCheckValue("");
      } catch (err) {
        if (err instanceof AxiosError) {
          setDeleteUserErrorMessage(err.response?.data.message);
        }
      }
    } else {
      setDeleteUserErrorMessage("Please submit the correct email address");
    }
  };

  // const handleWorkspaceClick = async (workspace: string) => {
  const handleWorkspaceClick: SubmitHandler<WorkspaceInput> = async (data: WorkspaceInput) => {
    try {
      const workspaceResponse: ApiResponse<workspaceResponse> = await axiosPrivate.post(
        "/subscription/workspace",
        JSON.stringify({
          workspace: data.workspace,
        }),
        {
          withCredentials: true,
        },
      );

      resetAddworkspaceForm();
      setAddWorkspace(false);
      console.log(JSON.stringify(workspaceResponse.data.workspace));
      // const addedWorkspace = [
      //   {
      //     name: workspaceResponse.data.workspace.name,
      //     id: workspaceResponse.data.workspace.id,
      //   },
      // ];
      const newWorkspaceData = { ...workspaceData };
      console.log(JSON.stringify(newWorkspaceData));
      // console.log(JSON.stringify(addedWorkspace));
      newWorkspaceData.availableWorkSpaces.push(
        ...[
          {
            name: workspaceResponse.data.workspace.name,
            id: workspaceResponse.data.workspace.id,
          },
        ],
      );
      console.log(JSON.stringify(newWorkspaceData));
      updateWorkspaceData(newWorkspaceData);
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrorMessage(err.response?.data.message);
      }
    }
  };

  // if (!user) {
  //   return (
  //     <div>
  //       <p> loading account data....................................................</p>
  //     </div>
  //   );
  // }
  return allowedRoles?.includes(auth?.role as string) && auth?.role === "ADMIN" ? (
    // <main className="flex justify-center items-center h-full">

    <main className="h-full">
      <div className="flex justify-center items-center">
        {/* {successMessage && <p className="bg-green-600 p-3">{successMessage}</p>} */}
        {/* <p className="absolute bg-green-600 p-3">testing error msg{successMessage}</p> */}
        {/* {deleteUserMessage && <p className="bg-green-600 p-3 absolute">{deleteUserMessage}</p>} */}

        {deleteEmail && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-gray-300 bg-opacity-80 z-40 flex justify-center items-center"
            onClick={closeDeleteModal}
          >
            {deleteEmailConfirmation ? (
              <>
                <div
                  className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4 sm:p-7">
                    <div className="text-center">
                      {deleteUserMessage === 200 ? (
                        <>{<p className="bg-green-50 p-3">User sucessfully deleted</p>}</>
                      ) : (
                        <>
                          <p className="-50 p-3">{deleteUserMessage} An error occurred</p>
                        </>
                      )}
                    </div>

                    <div className="mt-5">
                      {deleteUserErrorMessage && (
                        <p className="bg-red-50 p-3">{deleteUserErrorMessage}</p>
                      )}
                      <div className="grid gap-y-4">
                        <div>
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
                        </div>
                        <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t dark:bg-gray-800 dark:border-gray-700">
                          <button
                            onClick={closeDeleteModal}
                            type="button"
                            className="w-full py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                            data-hs-overlay="#hs-notifications"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4 sm:p-7">
                    <div className="text-center">
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Please type in the email: <i>{deleteEmail} to delete the user</i>
                      </p>
                    </div>

                    <div className="mt-5">
                      {deleteUserErrorMessage && (
                        <p className="bg-red-600 p-3">{deleteUserErrorMessage}</p>
                      )}
                      <div className="grid gap-y-4">
                        <div>
                          <label htmlFor="email" className="block text-sm mb-2 dark:text-white">
                            Email address:
                          </label>
                          <div className="relative">
                            <input
                              id="email"
                              type="email"
                              value={emailCheckValue}
                              onChange={(e) => handleEmailChange(e, "setEmailCheckValue")}
                              name="email"
                              className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                              required
                              aria-describedby="email-error"
                            ></input>
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
                        </div>
                        <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t dark:bg-gray-800 dark:border-gray-700">
                          <button
                            onClick={closeDeleteModal}
                            type="button"
                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                            data-hs-overlay="#hs-notifications"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteClick(deleteEmail)}
                            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            Delete User
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        {inviteEmail && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-gray-300 bg-opacity-80 z-40 flex justify-center items-center"
            onClick={closeInviteModal}
          >
            <div className="" onClick={(e) => e.stopPropagation()}>
              <div className=" bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div className="p-4 sm:p-7">
                  {errorMessage && (
                    <p className="bg-red-60 p-3 text-white rounded-lg w-full">{errorMessage}</p>
                  )}
                  <div className="text-center">
                    <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                      Invite User
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      Provide the email you want to send an invite to
                    </p>
                  </div>

                  <div className="mt-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid gap-y-4">
                        <div>
                          <label htmlFor="email" className="block text-sm mb-2 dark:text-white">
                            Email address
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                            required
                            aria-describedby="email-error"
                            {...register("email", {
                              required: "required",
                              pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Entered value does not match email format",
                              },
                            })}
                          ></input>

                          {errors.email && (
                            <span className="bg-red-600 text-white p-2" role="alert">
                              {errors.email.message}
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
                            onClick={closeInviteModal}
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
                            Invite User
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {AddWorkspace && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-gray-300 bg-opacity-80 z-40 flex justify-center items-center"
            onClick={closeWorkspaceModal}
          >
            <div
              className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                    Add New Workspace
                  </h1>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Name your workspace
                  </p>
                </div>

                <div className="mt-5">
                  {deleteUserErrorMessage && (
                    <p className="bg-red-600 p-3">{deleteUserErrorMessage}</p>
                  )}
                  <div className="mt-5">
                    <form onSubmit={handleAddWorkspaceForm(handleWorkspaceClick)}>
                      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                      <div className="grid gap-y-4">
                        <div>
                          <input
                            id="workspace"
                            type="text"
                            {...workspaceForm("workspace")}
                            name="workspace"
                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                            required
                          ></input>
                          {workspaceErrorsForm.workspace && (
                            <span className="bg-red-600 text-white p-2" role="alert">
                              {workspaceErrorsForm.workspace.message}
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
                            onClick={closeWorkspaceModal}
                            type="button"
                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                            data-hs-overlay="#hs-notifications"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            // onClick={() => handleWorkspaceClick("test wp")}
                            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            Add Workspace
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                  {/* <div className="grid gap-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm mb-2 dark:text-white">
                        Email address:
                      </label>
                      <div className="relative">
                        <input
                          id="email"
                          type="email"
                          value={emailCheckValue}
                          onChange={(e) => handleEmailChange(e, "setEmailCheckValue")}
                          name="email"
                          className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          required
                          aria-describedby="email-error"
                        ></input>
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
                    </div>
                    <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t dark:bg-gray-800 dark:border-gray-700">
                      <button
                        onClick={closeWorkspaceModal}
                        type="button"
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        data-hs-overlay="#hs-notifications"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleWorkspaceClick("test wp")}
                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      >
                        Add Workspace
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          // <div
          //   className="fixed top-0 left-0 w-full h-full bg-gray-300 bg-opacity-80 z-40 flex justify-center items-center"
          //   onClick={closeWorkspaceModal}
          // >
          //   <div className="" onClick={(e) => e.stopPropagation()}>
          //     <div className=" bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          //       <div className="p-4 sm:p-7">
          //         {errorMessage && (
          //           <p className="bg-red-60 p-3 text-white rounded-lg w-full">{errorMessage}</p>
          //         )}
          //         <div className="text-center">
          //           <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
          //             Add New Workspace
          //           </h1>
          //           <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          //             Name your workspace
          //           </p>
          //         </div>

          //         <div className="mt-5">
          //           <form onSubmit={handleSubmit(onSubmit)}>
          //             <div className="grid gap-y-4">
          //               <div>

          //              <input
          //                     id="workspace"
          //                     type="text"
          //                     value={emailCheckValue}
          //                     onChange={(e) => handleEmailChange(e, "setEmailCheckValue")}

          //                     name="workspace"
          //                     className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
          //                     required

          //                   ></input>

          //                 <div className="relative">
          //                   <div className="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
          //                     <svg
          //                       className="h-5 w-5 text-red-500"
          //                       width="16"
          //                       height="16"
          //                       fill="currentColor"
          //                       viewBox="0 0 16 16"
          //                       aria-hidden="true"
          //                     >
          //                       <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
          //                     </svg>
          //                   </div>
          //                 </div>
          //                 <p className="hidden text-xs text-red-600 mt-2" id="email-error">
          //                   Please include a valid email address so we can get back to you
          //                 </p>
          //               </div>

          //               <div className="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t dark:bg-gray-800 dark:border-gray-700">
          //                 <button
          //                   onClick={closeWorkspaceModal}
          //                   type="button"
          //                   className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          //                   data-hs-overlay="#hs-notifications"
          //                 >
          //                   Cancel
          //                 </button>
          //                 <button
          //                   type="submit"
          //                   onClick={() => handleDeleteClick("test wp")}
          //                   className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          //                 >
          //                   Add Workspace
          //                 </button>
          //               </div>
          //             </div>
          //           </form>
          //         </div>
          //       </div>
          //     </div>
          //   </div>
          // </div>
        )}

        {/* {isLoading ? (
          <h1 className="bg-blue-500 p-6 z-50">Page is loading.....</h1>
        ) : ( */}
        <div className="">
          <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="relative"></div>
            <div className="p-5 mb-4 flex justify-center bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <a
                className="block py-2 px-3 sm:p-4 group bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                href="#"
                onClick={addWorkspaceModal}
              >
                <div className="flex gap-x-2 sm:gap-x-4">
                  <span className="mt-1 flex-shrink-0 w-8 h-8 flex justify-center items-center bg-gray-100 text-gray-800 rounded-full group-hover:bg-gray-200 dark:bg-neutral-700 dark:text-white dark:group-hover:bg-neutral-600">
                    <svg
                      className="w-5 h-5 rounded-full"
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

                  <div className="grow">
                    <p className="font-semibold text-lg text-gray-800 dark:text-white">
                      Add New Workspace
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                          Users for workspace: <span>{workspaceData.selectedWorkSpace.name}</span>
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Invite and delete users.
                        </p>
                      </div>

                      <div>
                        <div className="inline-flex gap-x-2">
                          <button
                            onClick={inviteUserModal}
                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            <svg
                              className="flex-shrink-0 w-3 h-3"
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                            Invite User
                          </button>
                        </div>
                      </div>
                    </div>
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-slate-800">
                        <tr>
                          <th scope="col" className="ps-6 py-3 text-start"></th>

                          <th scope="col" className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start">
                            <div className="flex items-center gap-x-2">
                              <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                Email
                              </span>
                            </div>
                          </th>

                          <th scope="col" className="px-6 py-3 text-start">
                            <div className="flex items-center gap-x-2">
                              <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                Status
                              </span>
                            </div>
                          </th>

                          <th scope="col" className="px-6 py-3 text-start">
                            <div className="flex items-center gap-x-2">
                              <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                Created
                              </span>
                            </div>
                          </th>

                          <th scope="col" className="px-6 py-3 text-start"></th>

                          <th scope="col" className="px-6 py-3 text-end"></th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {user &&
                          user.result.memberships.map((membership) => (
                            <tr key={membership.id}>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="ps-6 py-3"></div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                                  <div className="flex items-center gap-x-3">
                                    <div className="grow">
                                      <span className="block text-sm text-gray-500">
                                        {membership.accountEmail}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  {membership.user.verificationStatus === "VERIFIED" ? (
                                    <>
                                      <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                                        <svg
                                          className="w-2.5 h-2.5"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="currentColor"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                        </svg>

                                        {membership.user.verificationStatus}
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full dark:bg-yellow-500/10 dark:text-yellow-500">
                                        <svg
                                          className="w-2.5 h-2.5"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          fill="currentColor"
                                          viewBox="0 0 16 16"
                                        >
                                          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                        </svg>
                                        {membership.user.verificationStatus}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </td>

                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="text-sm text-gray-500">
                                    {membership.user.createdAt}
                                  </span>
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-1.5">
                                  {membership.roleAccess === "USER" ? (
                                    <button
                                      className="inline-flex items-center gap-x-1 text-sm text-red-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                      onClick={() => deleteUserModal(membership.accountEmail)}
                                    >
                                      Delete
                                    </button>
                                  ) : (
                                    <>Admin</>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-semibold text-gray-800 dark:text-gray-200">
                            {user?.result.memberships.length}
                          </span>{" "}
                          results
                        </p>
                      </div>

                      <div>
                        <div className="inline-flex gap-x-2">
                          {/* <button
                            type="button"
                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
                            Prev
                          </button>

                          <button
                            type="button"
                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            Next
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
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  ) : (
    <p>This page can only be accessed by Admin users.</p>
  );
};

export default Organization;
