import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// import { axiosPrivate } from "../../api/axios";
import { AxiosError } from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useWorkSpaces from "../../hooks/useWorkSpaces";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// interface UserAttribute {
//   Name: string;
//   Value: string;
// }

interface MembershipsAttribute {
  // Name: string;
  // Value: string;
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
    // Username: string;
    // UserAttributes: UserAttribute[];
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

type FormData = {
  email: string;
};

const Organization = (): ReactElement => {
  const {
    // setValue,
    handleSubmit,
    register,
    // control,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [deleteUserMessage, setDeleteUserMessage] = useState<string | null>(null);
  const [deleteUserErrorMessage, setDeleteUserErrorMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [updateUsers, setUpdateUsers] = useState(false);
  const { workSpaces /*setWorkSpaces*/ } = useWorkSpaces();
  const [deleteEmail, setDeleteEmail] = useState<string | null>(null);
  const [inviteEmail, setInviteEmail] = useState<boolean>(false);
  const [emailCheckValue, setEmailCheckValue] = useState<string>("");

  const deleteUserModal = (email: string) => {
    console.log(JSON.stringify(email));
    // if (paidPlan !== true) {
    //   setSelectedPrice(price);
    // }
    setDeleteEmail(email);
    setEmailCheckValue("");
    if (deleteUserErrorMessage !== null) {
      setDeleteUserErrorMessage(null);
    }
  };

  const inviteUserModal = () => {
    setInviteEmail(true);
  };

  const closeDeleteModal = () => {
    setDeleteEmail(null);
  };

  const closeInviteModal = () => {
    setInviteEmail(false);
    reset();
  };

  useEffect(() => {
    console.log(`selectedWorkSpace: ${workSpaces.selectedWorkSpace.id}`);
    const controller = new AbortController();
    const getUser = async () => {
      try {
        const response: ApiResponse<User> = await axiosPrivate.post(
          "/subscription/users",
          JSON.stringify({
            workSpaceId: workSpaces.selectedWorkSpace.id,
          }),
          {
            signal: controller.signal,
            withCredentials: true,
          },
        );
        setUser(response.data);
      } catch (err) {
        console.log("error in organization");
        console.error(err);
      }
    };

    getUser();

    return () => {
      controller.abort();
    };
  }, [updateUsers, workSpaces]);

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const inviteResponse: ApiResponse<Invite> = await axiosPrivate.post(
        "/inviteuser",
        JSON.stringify({
          email: data.email,
          companyId: workSpaces.selectedWorkSpace.id,
        }),
        {
          withCredentials: true,
        },
      );
      setUpdateUsers((prev) => !prev);
      reset();
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
      console.log(`${emailCheckValue} is equal to ${email}`);
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
        console.log(JSON.stringify(deleteUserResponse));
        setDeleteUserMessage("User deleted!");
        setDeleteEmail(null);
        setEmailCheckValue("");
      } catch (err) {
        if (err instanceof AxiosError) {
          setDeleteUserErrorMessage(err.response?.data.message);
        }
      }
    } else {
      console.log(`${emailCheckValue} is NOT equal to ${email}`);
      setDeleteUserErrorMessage("Please submit the correct email address");
    }
  };

  if (!user) {
    return (
      <div>
        <p> loading account data....................................................</p>
      </div>
    );
  }
  return (
    <main className="flex justify-center items-center h-full">
      {successMessage && <p className="bg-green-600 p-3">{successMessage}</p>}
      {deleteUserMessage && <p className="bg-green-600 p-3">{deleteUserMessage}</p>}

      {deleteEmail && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-300 bg-opacity-80 z-40 flex justify-center items-center"
          onClick={closeDeleteModal}
        >
          <div
            className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-7">
              <div className="text-center">
                {/* <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  Forgot password?
                </h1> */}
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
                      Email address
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

          {/* <div className="bg-gray-100 text-black p-2" onClick={(e) => e.stopPropagation()}>
            {deleteUserErrorMessage && <p className="bg-red-600 p-3">{deleteUserErrorMessage}</p>}
            <p>
              Please type in the email: <i>{deleteEmail} to delete the user</i>
            </p>
            <input
              id="email"
              type="email"
              value={emailCheckValue}
              onChange={(e) => handleEmailChange(e, "setEmailCheckValue")}
            />
            <button type="button" onClick={() => handleDeleteClick(deleteEmail)}>
              Delete User
            </button>
          </div> */}
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
                  <p className="bg-red-600 p-3 text-white rounded-lg w-full">{errorMessage}</p>
                )}
                <div className="text-center">
                  <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                    Invite User
                  </h1>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Provider the email you want to send an invite to
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

            {/* <div className="bg-gray-100 text-black p-2" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="email">email</label>
              <input
                id="email"
                {...register("email", {
                  required: "required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
                type="email"
              />
              {errors.email && (
                <span className="bg-red-600 text-white p-2" role="alert">
                  {errors.email.message}
                </span>
              )}
              <button type="submit">Invite User</button>
            </form>
          </div> */}
          </div>
        </div>
      )}
      <div>
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                  <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Users for this workspace
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
                        <th scope="col" className="ps-6 py-3 text-start">
                          {/* <label htmlFor="hs-at-with-checkboxes-main" className="flex">
                              <input
                                type="checkbox"
                                className="shrink-0 border-gray-300 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                id="hs-at-with-checkboxes-main"
                              ></input>
                              <span className="sr-only">Checkbox</span>
                            </label> */}
                        </th>

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

                        {/* <th scope="col" className="px-6 py-3 text-start">
                            <div className="flex items-center gap-x-2">
                              <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                Portfolio
                              </span>
                            </div>
                          </th> */}

                        <th scope="col" className="px-6 py-3 text-start">
                          {/* <div className="flex items-center gap-x-2">
                              <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                Created
                              </span>
                            </div> */}
                        </th>

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
                                <button
                                  className="inline-flex items-center gap-x-1 text-sm text-red-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                  onClick={() => deleteUserModal(membership.accountEmail)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-semibold text-gray-800 dark:text-gray-200">6</span>{" "}
                        results
                      </p>
                    </div>

                    <div>
                      <div className="inline-flex gap-x-2">
                        <button
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
                        </button>
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
  );
};

export default Organization;
