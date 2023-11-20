/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import styles from "./ForgotPassword.module.scss";

const RESET_URL = "/forgotpassword";

type FormData = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const ForgotPassword = (): ReactElement => {
  const {
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
  const from = location.state?.from?.pathname || "/";

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const response = await axios.post(
        RESET_URL,
        JSON.stringify({
          username: data.username,
          password: data.password,
          email: data.email,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      if (response.status === 201) {
        navigate("/register-confirmation", { replace: true });
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
        <h2>Reset Password</h2>
        {errMsg && <div className={styles["login-error"]}>{errMsg}</div>}
        <div>
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
        </div>
        <button type="submit" className={styles["login-button"]}>
          Send Reset Email
        </button>
      </form>
    </main>
  );
};

export default ForgotPassword;
