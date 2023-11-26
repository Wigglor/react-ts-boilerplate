import { ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { axiosPrivate } from "../../api/axios";
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
  const navigate = useNavigate();
  useEffect(() => {
    // let isMounted = true;
    const controller = new AbortController();
    const getUser = async () => {
      try {
        const response: ApiResponse<User> = await axiosPrivate.post("/subscription/users", {
          signal: controller.signal,
          withCredentials: true,
        });
        console.log(JSON.stringify(response.data.result));
        // setUser(response.data.Username);
        setUser(response.data);
        // isMounted && setUser(response.data.result);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUser();

    return () => {
      // isMounted = false;
      controller.abort();
    };
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    // event.preventDefault();
    const inviteResponse: ApiResponse<Invite> = await axiosPrivate.post(
      "/inviteuser",
      JSON.stringify({
        email: data.email,
      }),
      {
        withCredentials: true,
      },
    );
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
      {/* <form onSubmit={(e) => handleSubmit(e, selectedPrice.id)}> */}
      <div className={styles.info}>
        <div>
          <ul>
            {user &&
              user.result.memberships.map((membership) => (
                <li key={membership.id}>{membership.accountEmail}</li>
              ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">email</label>
          <input
            id="email"
            {...register("email", {
              //   value: email,
              required: "required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
            // placeholder={email}
            type="email"
          />
          {errors.email && (
            <span className={styles["error-validation"]} role="alert">
              {errors.email.message}
            </span>
          )}
          <button type="submit">Submit</button>
        </form>
        {/* <button>Close</button> */}
      </div>
    </main>
  );
};

export default Organization;
