import { ReactElement, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import styles from "./ReactFormTest2.module.scss";

const LOGIN_URL = "/cognito/signin";

type LoginFormValues = {
  username: string;
  password: string;
};

const ReactFormTest2 = (): ReactElement => {
  const { setAuth } = useAuth();
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      // Redirect to the homepage
      navigate("/"); // Replace '/homepage' with the actual route of your homepage
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data: LoginFormValues) => {
    console.log(data);
    console.log(data);
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: data.username, password: data.password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      const accessToken = response?.data.accessToken;
      console.log(accessToken);
      setAuth({
        user: data.username,
        accessToken: accessToken,
      });
      const isLoggedIn = true;
      localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));

      navigate(from, { replace: true });
    } catch (err: any) {
      console.log(err);
      console.log(err.response);
      console.log(err.response.data.message);

      const errorMessage = err.response.data.message;
      setErrMsg(errorMessage);
    }
    console.log(data);
    reset();
  };

  console.log(errors);

  return (
    <main className={styles["login-container"]}>
      <form className={styles["login-form"]} onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        {errMsg && <div className={styles["login-error"]}>{errMsg}</div>}
        {/* <div className={styles["login-error"]}>Incorrect username or password.</div> */}
        <div>
          <label htmlFor="username">username</label>
          {/* <span className={styles["error-username"]} role="alert">
            error
          </span> */}

          <input
            id="username"
            {...register("username", {
              required: "required",
              minLength: {
                value: 5,
                message: "min length is 5",
              },
            })}
            // onChange={handleInputChange}
            type="text"
          />
          {errors.username && (
            <span className={styles["error-validation"]} role="alert">
              *{errors.username.message}
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
          {/* <label>Email</label>
          <input
            type="text"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid.",
              },
            })}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              validate: {
                checkLength: (value: string) =>
                  value.length >= 6 || "Password should be at-least 6 characters.",
                matchPattern: (value: string) =>
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$*])/.test(value) ||
                  "Password should contain at least one uppercase letter, lowercase letter, digit, and special symbol.",
              },
            })}
          />
          {errors.password && <p className="errorMsg">{errors.password.message}</p>} */}
        </div>
        <button type="submit" className={styles["login-button"]}>
          Login
        </button>
        <div className={styles.or}>
          <p>Or</p>
        </div>
        <div className={styles["register-link"]}>
          <Link className={styles["register-link__text"]} to="/register">
            Register
          </Link>
        </div>
      </form>
    </main>
  );
};

export default ReactFormTest2;

// const LOGIN_URL = "/cognito/signin";

// type LoginFormValues = {
//   username: string;
//   password: string;
// };

// const ReactFormTest2 = (): ReactElement => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginFormValues>();

//   const onSubmit = (data: LoginFormValues) => {
//     console.log(data);
//   };

//   console.log(errors);

//   return (
//     <div className="App">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="form-control">
//           <label>Email</label>
//           <input
//             type="text"
//             {...register("email", {
//               required: "Email is required.",
//               pattern: {
//                 value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
//                 message: "Email is not valid.",
//               },
//             })}
//           />
//           {errors.email && <p className="errorMsg">{errors.email.message}</p>}
//         </div>
//         <div className="form-control">
//           <label>Password</label>
//           <input
//             type="password"
//             {...register("password", {
//               required: true,
//               validate: {
//                 checkLength: (value) => value.length >= 6,
//                 matchPattern: (value) =>
//                   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value),
//               },
//             })}
//           />
//           {errors.password?.type === "required" && (
//             <p className="errorMsg">Password is required.</p>
//           )}
//           {errors.password?.type === "checkLength" && (
//             <p className="errorMsg">Password should be at-least 6 characters.</p>
//           )}
//           {errors.password?.type === "matchPattern" && (
//             <p className="errorMsg">
//               Password should contain at least one uppercase letter, lowercase letter, digit, and
//               special symbol.
//             </p>
//           )}
//         </div>
//         <div className="form-control">
//           <label></label>
//           <button type="submit">Login</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ReactFormTest2;
