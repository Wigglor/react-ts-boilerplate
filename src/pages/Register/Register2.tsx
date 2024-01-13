/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
// import styles from "./Register.module.scss";

const SIGNUP_URL = "/signup";

type FormData = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const Register2 = (): ReactElement => {
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
    <main>
      <form>
        <h2>Register</h2>
        {errMsg && <div>{errMsg}</div>}
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
    // <main className={styles["login-container"]}>
    //   <form className={styles["login-form"]} onSubmit={handleSubmit(onSubmit)}>
    //     <h2>Register</h2>
    //     {errMsg && <div className={styles["login-error"]}>{errMsg}</div>}
    //     <div>
    //       {/* <label htmlFor="username">username</label>

    //       <input
    //         id="username"
    //         {...register("username", {
    //           required: "required",
    //           minLength: {
    //             value: 5,
    //             message: "min length is 5",
    //           },
    //         })}
    //         type="text"
    //       />
    //       {errors.username && (
    //         <span className={styles["error-validation"]} role="alert">
    //           *{errors.username.message}
    //         </span>
    //       )} */}

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
    //       <label htmlFor="password">password</label>
    //       <input
    //         id="password"
    //         {...register("password", {
    //           required: "required",
    //           minLength: {
    //             value: 5,
    //             message: "min length is 5",
    //           },
    //         })}
    //         type="password"
    //       />
    //       {errors.password && (
    //         <span className={styles["error-validation"]} role="alert">
    //           {errors.password.message}
    //         </span>
    //       )}
    //       <label htmlFor="firstName">First Name</label>
    //       <input
    //         id="firstName"
    //         {...register("firstName", {
    //           required: "required",
    //           minLength: {
    //             value: 5,
    //             message: "min length is 5",
    //           },
    //         })}
    //         type="text"
    //       />
    //       {errors.firstName && (
    //         <span className={styles["error-validation"]} role="alert">
    //           {errors.firstName.message}
    //         </span>
    //       )}
    //       <label htmlFor="lastName">Last Name</label>
    //       <input
    //         id="lastName"
    //         {...register("lastName", {
    //           required: "required",
    //           minLength: {
    //             value: 5,
    //             message: "min length is 5",
    //           },
    //         })}
    //         type="text"
    //       />
    //       {errors.lastName && (
    //         <span className={styles["error-validation"]} role="alert">
    //           {errors.lastName.message}
    //         </span>
    //       )}
    //     </div>
    //     <button type="submit" className={styles["login-button"]}>
    //       Register
    //     </button>
    //     <div className={styles.or}>
    //       <p>Or</p>
    //     </div>
    //     <div className={styles["login-link"]}>
    //       <Link className={styles["login-link__text"]} to="/login">
    //         Login
    //       </Link>
    //     </div>
    //   </form>
    //   <button onClick={handleGoogleLogin}>Login with Google</button>
    // </main>
  );
};

export default Register2;
