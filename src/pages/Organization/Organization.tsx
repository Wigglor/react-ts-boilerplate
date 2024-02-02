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
  const [emailCheckValue, setEmailCheckValue] = useState("");

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

  const closeModal = () => {
    console.log("toggling modal");
    setDeleteEmail(null);
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

  if (!user) {
    return (
      <div>
        <p> loading account data....................................................</p>
      </div>
    );
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailCheckValue(e.target.value);
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
  return (
    <main>
      {successMessage && <p className="bg-green-600 p-3">{successMessage}</p>}
      {errorMessage && <p className="bg-red-600 p-3">{errorMessage}</p>}
      {deleteUserMessage && <p className="bg-green-600 p-3">{deleteUserMessage}</p>}
      {/* <div></div> */}
      {deleteEmail && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-300 z-40 flex justify-center items-center"
          onClick={closeModal}
        >
          <div className="bg-gray-100 text-black p-2" onClick={(e) => e.stopPropagation()}>
            {deleteUserErrorMessage && <p className="bg-red-600 p-3">{deleteUserErrorMessage}</p>}
            <p>
              Please type in the email: <i>{deleteEmail} to delete the user</i>
            </p>
            {/* <form onClick={(e) => deleteUser(e, deleteEmail)}> */}
            {/* <form onSubmit={deleteUser}> */}
            <input id="email" type="email" value={emailCheckValue} onChange={handleEmailChange} />
            <button type="button" onClick={() => handleDeleteClick(deleteEmail)}>
              Delete User
            </button>
            {/* </form> */}
          </div>
        </div>
      )}
      <div>
        <div>
          <ul>
            {user &&
              user.result.memberships.map((membership) => (
                <li key={membership.id}>
                  <div>
                    <p>{membership.accountEmail}</p>
                    <p>
                      acc email: {membership.accountEmail} - Verification Status:{" "}
                      {membership.user.verificationStatus}
                    </p>
                    <button onClick={() => deleteUserModal(membership.accountEmail)}>
                      Delete User
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>

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
          {errors.email && <span role="alert">{errors.email.message}</span>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
};

export default Organization;
