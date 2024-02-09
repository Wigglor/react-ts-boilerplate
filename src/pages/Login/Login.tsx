import { ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useWorkSpaces from "../../hooks/useWorkSpaces";

// import { useGoogleLogin } from "@react-oauth/google";

const LOGIN_URL = "/signin";

type LoginFormValues = {
  // username: string;
  email: string;
  password: string;
};

interface Item {
  company: {
    name: string;
    id: string;
  };
}

type GoogleUser = {
  credential: string;
  clientId: string;
  select_by: string;
};

const Login = (): ReactElement => {
  // const { setAuth, persist, setPersist } = useAuth();
  const { auth, setAuth, persist, setPersist } = useAuth();
  const { workSpaces, setWorkSpaces } = useWorkSpaces();
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [googleUser, setGoogleUser] = useState<GoogleUser | undefined>(undefined);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>();

  const handleGoogleLogin = () => {
    // const cognitoAuthUrl = `https://test-2023-10.auth.eu-north-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=3drrlf4iharl544lebn61viqdm&identity_provider=Google&redirect_uri=http://localhost:8080/socialcallback&state=STATE&scope=openid+profile+aws.cognito.signin.user.admin`;
    const cognitoAuthUrl =
      "https://test-2023-10.auth.eu-north-1.amazoncognito.com/oauth2/authorize?identity_provider=Google&response_type=code&client_id=3drrlf4iharl544lebn61viqdm&redirect_uri=http://localhost:8080/socialcallback&state=STATE&scope=email+openid+profile+aws.cognito.signin.user.admin";
    // "https://test-2023-10.auth.eu-north-1.amazoncognito.com/login?response_type=code&client_id=3drrlf4iharl544lebn61viqdm&redirect_uri=http://localhost:8080/socialcallback&state=STATE&scope=openid+profile+aws.cognito.signin.user.admin";
    // "https://test-2023-12.auth.eu-north-1.amazoncognito.com/oauth2/authorize?identity_provider=Google&response_type=code&client_id=4drb1mir2pvtr2auf1b7puj449&redirect_uri=http://localhost:8080/socialcallback&state=STATE&scope=email+openid+profile+aws.cognito.signin.user.admin";
    window.location.href = cognitoAuthUrl;
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  // const getAwsCredentials = async (googleToken: string) => {
  //   const AwsBody = new URLSearchParams({
  //     grant_type: "authorization_code",
  //     client_id: "3drrlf4iharl544lebn61viqdm",
  //     redirect_uri: "http://localhost:8080/socialcallback",
  //     code: googleToken,
  //   });
  //   console.log(AwsBody.toString());
  //   try {
  //     const response = await axios.post(
  //       // "https://test-2023-10.auth.eu-north-1.amazoncognito.com/oauth2/token",
  //       "/social-token",
  //       // AwsBody.toString(),
  //       // AwsBody,
  //       { googleToken: googleToken },
  //       // JSON.stringify(AwsBody),
  //       // {
  //       //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //       //   // withCredentials: true,
  //       // },
  //     );
  //     console.log(response);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const login = useGoogleLogin({
  //   onSuccess: (codeResponse) => {
  //     console.log(codeResponse);
  //     // getAwsCredentials(codeResponse.code);
  //   },
  //   // flow: "auth-code",
  // });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data: LoginFormValues) => {
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: data.email, password: data.password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      const accessToken = response?.data.accessToken;
      setAuth({
        user: data.email,
        accessToken: accessToken,
        role: response?.data.role,
        setup: response?.data.setup,
        currentPeriodEnds: response?.data.user.memberships[0]?.company?.account.currentPeriodEnds,
        plan: response?.data.user.memberships[0]?.company?.account.plan?.name,
      });
      const workSpaces = response?.data.user.memberships.map((item: Item) => {
        return { name: item.company.name, id: item.company.id };
      }); // extend this and return obj with company id etc as well

      if (response.data.setup !== "PENDING" && response.data.user.memberships.length > 0) {
        setWorkSpaces({
          availableWorkSpaces: workSpaces,
          selectedWorkSpace: {
            name: response?.data.user.memberships[0].company.name,
            id: response?.data.user.memberships[0].company.id,
          },
        });
      }

      if (response?.data.setup === "PENDING") {
        navigate("/onboarding", { replace: true });
      } else {
        navigate(from, { replace: true });
        // navigate("/organization", { replace: true });
      }
    } catch (err: any) {
      const errorMessage = err.response.data.message;
      setErrMsg(errorMessage);
    }
    reset();
  };
  return (
    // <GoogleOAuthProvider clientId="523632201518-emi1ioba9vvudkc2u8on28gph5cc2cu0.apps.googleusercontent.com">
    <main className="w-full max-w-md mx-auto p-6">
      {/* <main className="flex flex-col items-center content-center"> */}
      {/* <div className="w-6/12 self-center"> */}
      {/* <div>
        <form onSubmit={handleSubmit(onSubmit)} className=" bg-slate-400">
          <h2>Login</h2>
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
            {errors.email && <span role="alert">*{errors.email.message}</span>}

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
          </div>
          <button type="submit">Login</button>

          <div>
            <p>Or</p>
          </div>
          <div>
            <Link to="/register">Register</Link>
          </div>
          <div>
            <Link to="/forgot-password">Forgot your password?</Link>
          </div>
        </form>

        <button onClick={handleGoogleLogin}>Login with Google</button>
      </div> */}
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Dont have an account yet?
              <Link
                className="ml-1 text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                to="/register"
              >
                Register
              </Link>
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Need another verification email?
              <Link
                className="ml-1 text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                to="/resend-verification"
              >
                Verify Email
              </Link>
            </p>
          </div>

          <div className="mt-5">
            <button
              onClick={handleGoogleLogin}
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
              Sign in with Google
            </button>

            <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
              Or
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
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
                    {errors.email && <span role="alert">*{errors.email.message}</span>}
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
                  <div className="flex justify-between items-center">
                    <label htmlFor="password" className="block text-sm mb-2 dark:text-white">
                      Password
                    </label>

                    <Link
                      className="text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      to="/forgot-password"
                    >
                      Forgot your password?
                    </Link>
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

                <div className="flex items-center">
                  <div className="flex">
                    <input
                      id="persist"
                      name="persist"
                      type="checkbox"
                      onChange={togglePersist}
                      checked={persist}
                      className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600  focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                    ></input>
                  </div>
                  <div className="ms-3">
                    <label htmlFor="persist" className="text-sm dark:text-white">
                      Remember me
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
    // </GoogleOAuthProvider>
  );
};

//   return (
//     // <GoogleOAuthProvider clientId="523632201518-emi1ioba9vvudkc2u8on28gph5cc2cu0.apps.googleusercontent.com">
//     <main className={styles["login-container"]}>
//       <form className={styles["login-form"]} onSubmit={handleSubmit(onSubmit)}>
//         <h2>Login</h2>
//         {errMsg && <div className={styles["login-error"]}>{errMsg}</div>}
//         <div>
//           <label htmlFor="email">email</label>

//           <input
//             id="email"
//             {...register("email", {
//               required: "required",
//               pattern: {
//                 value: /\S+@\S+\.\S+/,
//                 message: "Entered value does not match email format",
//               },
//             })}
//             type="email"
//           />
//           {errors.email && (
//             <span className={styles["error-validation"]} role="alert">
//               *{errors.email.message}
//             </span>
//           )}
//           {/* <input
//             id="username"
//             {...register("username", {
//               required: "required",
//               minLength: {
//                 value: 5,
//                 message: "min length is 5",
//               },
//             })}
//             type="text"
//           />
//           {errors.username && (
//             <span className={styles["error-validation"]} role="alert">
//               *{errors.username.message}
//             </span>
//           )} */}
//           <label htmlFor="password">password</label>
//           <input
//             id="password"
//             {...register("password", {
//               required: "required",
//               minLength: {
//                 value: 5,
//                 message: "min length is 5",
//               },
//             })}
//             type="password"
//           />
//           {errors.password && (
//             <span className={styles["error-validation"]} role="alert">
//               {errors.password.message}
//             </span>
//           )}
//         </div>
//         <button type="submit" className={styles["login-button"]}>
//           Login
//         </button>
//         {/* <GoogleLogin
//           onSuccess={(credentialResponse) => {
//             console.log(credentialResponse);
//             console.log(credentialResponse);

//             // setGoogleUser(credentialResponse);
//           }}
//           onError={() => {
//             console.log("Login Failed");
//           }}
//           useOneTap
//         />
//         ; */}
//         {/* <button onClick={handleGoogleLogin}>Login with Google</button> */}
//         {/* <button onClick={() => login()}>Sign in with Google 🚀</button>; */}
//         <div className={styles.or}>
//           <p>Or</p>
//         </div>
//         <div className={styles["register-link"]}>
//           <Link className={styles["register-link__text"]} to="/register">
//             Register
//           </Link>
//         </div>
//         <div className={styles["forgotpassword-link"]}>
//           <Link className={styles["forgotpassword-link__text"]} to="/forgot-password">
//             Forgot your password?
//           </Link>
//         </div>
//       </form>

//       <button onClick={handleGoogleLogin}>Login with Google</button>
//     </main>
//     // </GoogleOAuthProvider>
//   );
// };

export default Login;
