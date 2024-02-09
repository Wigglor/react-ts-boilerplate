/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const RESET_URL = "/resetpassword";

type FormData = {
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

const ResetPassword = (): ReactElement => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    // control,
    // reset,
    formState: { errors },
  } = useForm<FormData>();
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  // const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");
  const email = searchParams.get("email") as string;
  const password = watch("password");

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const response = await axios.post(
        RESET_URL,
        JSON.stringify({
          email: email,
          confirmationCode: code,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        setSuccessMsg("Successfully changed password!");
        navigate("/login", { replace: true });
      }
      // setSuccessMsg("Successfully changed password!");
    } catch (err: any) {
      const errorMessage = err.response.data.message;
      setErrMsg(errorMessage);
    }
    // reset();
  };

  return (
    <>
      <main className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Reset Password
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Back to sign in?
                <Link
                  className="ml-1 text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  to="/login"
                >
                  Sign in here
                </Link>
              </p>
              {errMsg && <div>{errMsg}</div>}
              {successMsg && <div>{successMsg}</div>}
            </div>

            <div className="mt-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-y-4">
                  <div>
                    <div className="flex justify-between items-center">
                      <label htmlFor="password" className="block text-sm mb-2 dark:text-white">
                        Password
                      </label>

                      {/* <Link
                        className="text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        to="/forgot-password"
                      >
                        Forgot your password?
                      </Link> */}
                    </div>
                    <div className="relative">
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
                        name="password"
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        required
                        aria-describedby="password-error"
                      />
                      {errors.password && <span role="alert">{errors.password.message}</span>}
                      <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
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
                    <p className="hidden text-xs text-red-600 mt-2" id="password-error">
                      8+ characters required
                    </p>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm mb-2 dark:text-white">
                      Confirm Password
                    </label>
                    <div className="relative">
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
                        name="confirmPassword"
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        required
                        aria-describedby="confirmPassword-error"
                      />
                      {errors.confirmPassword && (
                        <span role="alert">{errors.confirmPassword.message}</span>
                      )}

                      <div className="hidden absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3">
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
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      {/* <main>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Reset Password</h2>
        {errMsg && <div>{errMsg}</div>}
        {successMsg && <div>{successMsg}</div>}
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
          {errors.password && <span role="alert">{errors.password.message}</span>}

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
          {errors.confirmPassword && <span role="alert">{errors.confirmPassword.message}</span>}
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </main> */}
    </>
  );
};

export default ResetPassword;
