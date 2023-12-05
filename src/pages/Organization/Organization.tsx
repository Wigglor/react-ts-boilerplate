import { ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
// import { axiosPrivate } from "../../api/axios";
import { AxiosError } from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styles from "./Organization.module.scss";

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
    setValue,
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [updateUsers, setUpdateUsers] = useState(false);

  useEffect(() => {
    // let isMounted = true;
    const controller = new AbortController();
    const getUser = async () => {
      try {
        const response: ApiResponse<User> = await axiosPrivate.post(
          "/subscription/users",
          JSON.stringify({
            workSpaceId: JSON.parse(localStorage.getItem("workSpace") as string)["id"],
            // accountEmail: data.email,
          }),
          {
            signal: controller.signal,
            withCredentials: true,
          },
        );
        console.log(JSON.stringify(response.data.result));
        // setUser(response.data.Username);
        setUser(response.data);
        // isMounted && setUser(response.data.result);
      } catch (err) {
        console.error(err);
      }
    };

    getUser();

    return () => {
      // isMounted = false;
      controller.abort();
    };
  }, [updateUsers]);

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    // event.preventDefault();
    try {
      const inviteResponse: ApiResponse<Invite> = await axiosPrivate.post(
        "/inviteuser",
        JSON.stringify({
          email: data.email,
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
    <main className={styles.Account}>
      {successMessage && <p className={styles["Account-success"]}>{successMessage}</p>}
      {errorMessage && <p className={styles["Account-error"]}>{errorMessage}</p>}
      <div></div>
      <div className={styles.info}>
        <div>
          <ul>
            {user &&
              user.result.memberships.map((membership) => (
                <li key={membership.id}>
                  <div>
                    <p>{membership.accountEmail}</p>
                    <p>status: {membership.user.verificationStatus}</p>
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
          {errors.email && (
            <span className={styles["error-validation"]} role="alert">
              {errors.email.message}
            </span>
          )}
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
};

export default Organization;
