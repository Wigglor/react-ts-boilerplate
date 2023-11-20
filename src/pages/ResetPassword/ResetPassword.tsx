/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import styles from "./ResetPassword.module.scss";

const RESET_URL = "/forgotpassword";

type FormData = {
  // username: string;
  // email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

const ResetPassword = (): ReactElement => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const { setAuth, auth } = useAuth();
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state?.from?.pathname || "/";
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");
  const email = searchParams.get("email") as string;
  const password = watch("password");
  console.log(code);
  console.log(email);

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const response = await axios.post(
        RESET_URL,
        JSON.stringify({
          email: email,
          confirmationCode: code,
          password: data.password,
          confirmPassword: data.confirmPassword,
          // email: data.email,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      /*if (response.status === 200) {
        navigate("/login", { replace: true });
      } else {
        console.log(JSON.stringify(response));
      }*/
      setSuccessMsg("Successfully changed password!");
    } catch (err: any) {
      const errorMessage = err.response.data.message;
      setErrMsg(errorMessage);
    }
    // reset();
  };

  return (
    <main className={styles["reset-container"]}>
      <form className={styles["reset-form"]} onSubmit={handleSubmit(onSubmit)}>
        <h2>Reset Password</h2>
        {errMsg && <div className={styles["reset-error"]}>{errMsg}</div>}
        {successMsg && <div className={styles["reset-success"]}>{successMsg}</div>}
        <div>
          <label htmlFor="password">password</label>
          <input
            id="password"
            {...register("password", {
              required: "required",
              minLength: {
                value: 5,
                message: "min length is 5",
              },
            })}
            type="password"
          />
          {errors.password && (
            <span className={styles["error-validation"]} role="alert">
              {errors.password.message}
            </span>
          )}

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            {...register("confirmPassword", {
              validate: (value) => value === password || "The passwords do not match",
              required: "required",
              minLength: {
                value: 5,
                message: "min length is 5",
              },
            })}
            type="password"
          />
          {errors.confirmPassword && (
            <span className={styles["error-validation"]} role="alert">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <button type="submit" className={styles["login-button"]}>
          Reset Password
        </button>
      </form>
    </main>
  );
};

export default ResetPassword;
