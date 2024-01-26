/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const SIGNUP_URL = "/signup";

type FormData = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const Register = (): ReactElement => {
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

  const handleGoogleLogin = () => {
    // const cognitoAuthUrl = `https://test-2023-10.auth.eu-north-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=3drrlf4iharl544lebn61viqdm&identity_provider=Google&redirect_uri=http://localhost:8080/socialcallback&state=STATE&scope=openid+profile+aws.cognito.signin.user.admin`;
    const cognitoAuthUrl =
      "https://test-2023-10.auth.eu-north-1.amazoncognito.com/oauth2/authorize?identity_provider=Google&response_type=code&client_id=3drrlf4iharl544lebn61viqdm&redirect_uri=http://localhost:8080/socialcallback&state=STATEscope=email+openid+profile+aws.cognito.signin.user.admin&prompt=login";
    // "https://test-2023-10.auth.eu-north-1.amazoncognito.com/login?response_type=code&client_id=3drrlf4iharl544lebn61viqdm&redirect_uri=http://localhost:8080/socialcallback&state=STATE&scope=openid+profile+aws.cognito.signin.user.admin";
    // "https://test-2023-12.auth.eu-north-1.amazoncognito.com/oauth2/authorize?identity_provider=Google&response_type=code&client_id=4drb1mir2pvtr2auf1b7puj449&redirect_uri=http://localhost:8080/socialcallback&state=STATE&scope=email+openid+profile+aws.cognito.signin.user.admin";
    window.location.href = cognitoAuthUrl;
  };

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const response = await axios.post(
        SIGNUP_URL,
        JSON.stringify({
          username: data.username,
          password: data.password,
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
    <>
      {/* <main className="w-full max-w-md mx-auto p-6">
        <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign up</h1>
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
              <button
                type="button"
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              >
                <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                  <path
                    d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                    fill="#34A853"
                  />
                  <path
                    d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                    fill="#EB4335"
                  />
                </svg>
                Sign up with Google
              </button>

              <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                Or
              </div>

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
                      />
                      {errors.email && <span role="alert">{errors.email.message}</span>}
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
                    <p className="hidden text-xs text-red-600 mt-2" id="email-error">
                      Please include a valid email address so we can get back to you
                    </p>
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm mb-2 dark:text-white">
                      Password
                    </label>
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
                    <label htmlFor="firstName" className="block text-sm mb-2 dark:text-white">
                      First name
                    </label>
                    <div className="relative">
                      <input
                        id="firstName"
                        {...register("firstName", {
                          required: "required",
                          minLength: {
                            value: 5,
                            message: "min length is 5",
                          },
                        })}
                        type="text"
                        name="password"
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                        required
                        aria-describedby="password-error"
                      />

                      {errors.firstName && <span role="alert">{errors.firstName.message}</span>}
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
                    <label htmlFor="lastName" className="block text-sm mb-2 dark:text-white">
                      Last Name
                    </label>
                    <div className="relative">
                      <input
                        id="lastName"
                        {...register("lastName", {
                          required: "required",
                          minLength: {
                            value: 5,
                            message: "min length is 5",
                          },
                        })}
                        type="text"
                      />

                      {errors.lastName && <span role="alert">{errors.lastName.message}</span>}
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

                  <div className="flex items-center">
                    <div className="flex">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ms-3">
                      <label htmlFor="remember-me" className="text-sm dark:text-white">
                        I accept the{" "}
                        <a
                          className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          href="#"
                        >
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main> */}

      <main className="flex content-center flex-col w-1/2">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-500">
          <h2>Register</h2>
          {errMsg && <div>{errMsg}</div>}
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
            {errors.email && <span role="alert">{errors.email.message}</span>}
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
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              {...register("firstName", {
                required: "required",
                minLength: {
                  value: 5,
                  message: "min length is 5",
                },
              })}
              type="text"
            />
            {errors.firstName && <span role="alert">{errors.firstName.message}</span>}
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              {...register("lastName", {
                required: "required",
                minLength: {
                  value: 5,
                  message: "min length is 5",
                },
              })}
              type="text"
            />
            {errors.lastName && <span role="alert">{errors.lastName.message}</span>}
          </div>
          <button type="submit">Register</button>
          <div>
            <p>Or</p>
          </div>
          <div>
            <Link to="/login">Login</Link>
          </div>
        </form>
        <button onClick={handleGoogleLogin}>Login with Google</button>
      </main>

      {/* <main className={styles["login-container"]}>
        <form className={styles["login-form"]} onSubmit={handleSubmit(onSubmit)}>
          <h2>Register</h2>
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
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              {...register("firstName", {
                required: "required",
                minLength: {
                  value: 5,
                  message: "min length is 5",
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
                  value: 5,
                  message: "min length is 5",
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
          <button type="submit" className={styles["login-button"]}>
            Register
          </button>
          <div className={styles.or}>
            <p>Or</p>
          </div>
          <div className={styles["login-link"]}>
            <Link className={styles["login-link__text"]} to="/login">
              Login
            </Link>
          </div>
        </form>
        <button onClick={handleGoogleLogin}>Login with Google</button>
      </main> */}
    </>
  );
};

export default Register;
