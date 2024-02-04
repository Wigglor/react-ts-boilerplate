/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const FORGOT_URL = "/forgotpassword";

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
        FORGOT_URL,
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
    reset();
  };

  return (
    // <main>
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     <h2>Reset Password</h2>
    //     {errMsg && <div>{errMsg}</div>}
    //     <div>
    //       <label htmlFor="email">email</label>
    //       <input
    //         id="email"
    //         {...register("email", {
    //           required: "required",
    //           pattern: {
    //             value: /\S+@\S+\.\S+/,
    //             message: "Entered value does not match email format",
    //           },
    //         })}
    //         type="email"
    //       />
    //       {errors.email && <span role="alert">{errors.email.message}</span>}
    //     </div>
    //     <button type="submit">Send Reset Email</button>
    //   </form>
    // </main>

    <main className="w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Already have an account?
              <Link
                className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                to="/login"
              >
                Sign in here
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              {errMsg && <div>{errMsg}</div>}
              <div className="grid gap-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm mb-2 dark:text-white">
                    Email address
                  </label>
                  <div className="relative">
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
                  <p className="hidden text-xs text-red-600 mt-2" id="email-error">
                    Please include a valid email address so we can get back to you
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>

    // <main className={styles["login-container"]}>
    //   <form className={styles["login-form"]} onSubmit={handleSubmit(onSubmit)}>
    //     <h2>Reset Password</h2>
    //     {errMsg && <div className={styles["login-error"]}>{errMsg}</div>}
    //     <div>
    //       <label htmlFor="email">email</label>
    //       <input
    //         id="email"
    //         {...register("email", {
    //           required: "required",
    //           pattern: {
    //             value: /\S+@\S+\.\S+/,
    //             message: "Entered value does not match email format",
    //           },
    //         })}
    //         type="email"
    //       />
    //       {errors.email && (
    //         <span className={styles["error-validation"]} role="alert">
    //           {errors.email.message}
    //         </span>
    //       )}
    //     </div>
    //     <button type="submit" className={styles["login-button"]}>
    //       Send Reset Email
    //     </button>
    //   </form>
    // </main>
  );
};

export default ForgotPassword;
