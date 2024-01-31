import { ReactElement, useEffect, useState } from "react";
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [updateUsers, setUpdateUsers] = useState(false);
  const { workSpaces /*setWorkSpaces*/ } = useWorkSpaces();
  const [deleteEmail, setDeleteEmail] = useState<string | null>(null);

  const deleteUserModal = (email: string) => {
    console.log(JSON.stringify(email));
    // if (paidPlan !== true) {
    //   setSelectedPrice(price);
    // }
    setDeleteEmail(email);
  };

  const deleteUser = (event: any, email: string) => {
    console.log(event.target.value);
    console.log(email);
    // if (paidPlan !== true) {
    //   setSelectedPrice(price);
    // }
    // setDeleteEmail(email);
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

  return (
    <main>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      {/* <div></div> */}
      {deleteEmail && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-300 z-40 flex justify-center items-center"
          onClick={closeModal}
        >
          <div className="bg-gray-100 text-black p-2" onClick={(e) => e.stopPropagation()}>
            <p>
              Please type in the email: <i>{deleteEmail} to delete the user</i>
            </p>
            <form onClick={(e) => deleteUser(e, deleteEmail)}>
              <input id="email" type="email" />
              <button type="submit">Delete User</button>
            </form>
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
