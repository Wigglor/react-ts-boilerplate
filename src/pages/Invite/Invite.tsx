/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import styles from "./Invite.module.scss";

const COMPLETE_INVITE_URL = "/complete-invite";

type FormData = {
  username: string;
  email: string;
  tempPassword: string;
  newPassword: string;
  firstName: string;
  lastName: string;
};

const Invite = (): ReactElement => {
  const {
    setValue,
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const { setAuth, auth } = useAuth();
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const from = location.state?.from?.pathname || "/";

  const code = searchParams.get("code");
  const email = searchParams.get("email") as string;

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const response = await axios.post(
        COMPLETE_INVITE_URL,
        JSON.stringify({
          tempPassword: data.tempPassword,
          newPassword: data.newPassword,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      if (response.status === 201) {
        navigate("/login", { replace: true });
      } else {
        console.log(response);
      }
    } catch (err: any) {
      const errorMessage = err.response.data.message;
      setErrMsg(errorMessage);
    }
    // reset();
  };

  return (
    <main className={styles["login-container"]}>
      <form className={styles["login-form"]} onSubmit={handleSubmit(onSubmit)}>
        <h2>Complete Signup!</h2>
        {errMsg && <div className={styles["login-error"]}>{errMsg}</div>}
        <div>
          {/* <label htmlFor="username">username</label>

          <input
            id="username"
            {...register("username", {
              required: "required",
              minLength: {
                value: 5,
                message: "min length is 5",
              },
            })}
            type="text"
          />
          {errors.username && (
            <span className={styles["error-validation"]} role="alert">
              *{errors.username.message}
            </span>
          )} */}

          <label htmlFor="email">email</label>
          <input
            id="email"
            value={email}
            {...register("email", {
              //   value: email,
              disabled: true,
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
          <label htmlFor="tempPassword">Temporary Password</label>
          <input
            id="tempPassword"
            {...register("tempPassword", {
              required: "required",
              minLength: {
                value: 5,
                message: "min length is 5",
              },
            })}
            type="password"
          />
          {errors.tempPassword && (
            <span className={styles["error-validation"]} role="alert">
              {errors.tempPassword.message}
            </span>
          )}
          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            {...register("newPassword", {
              required: "required",
              minLength: {
                value: 5,
                message: "min length is 5",
              },
            })}
            type="password"
          />
          {errors.newPassword && (
            <span className={styles["error-validation"]} role="alert">
              {errors.newPassword.message}
            </span>
          )}
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            {...register("firstName", {
              required: "required",
              minLength: {
                value: 1,
                message: "min length is 1",
              },
            })}
            type="text"
          />
          {errors.firstName && (
            <span className={styles["error-validation"]} role="alert">
              {errors.firstName.message}
            </span>
          )}
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            {...register("lastName", {
              required: "required",
              minLength: {
                value: 1,
                message: "min length is 1",
              },
            })}
            type="text"
          />
          {errors.lastName && (
            <span className={styles["error-validation"]} role="alert">
              {errors.lastName.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className={styles["login-button"]}
          onClick={() => setValue("email", email)}
        >
          Signup
        </button>
      </form>
    </main>
  );
};

export default Invite;
