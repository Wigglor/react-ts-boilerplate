import { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import styles from "./ReactFormTest.module.scss";

// tutorial: https://www.freecodecamp.org/news/how-to-create-forms-in-react-using-react-hook-form/

const LOGIN_URL = "/cognito/signin";

type LoginFormValues = {
  username: string;
  password: string;
};

const LoginForm = (): ReactElement => {
  const { setAuth } = useAuth();
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  /* useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      // Redirect to the homepage
      navigate("/"); // Replace '/homepage' with the actual route of your homepage
    }
  }, []);*/

  const {
    handleSubmit,
    // control,
    register,
    formState: { errors },
  } = useForm<LoginFormValues>(); // Pass the LoginFormValues type as a generic parameter

  const onSubmit = async (data: LoginFormValues) => {
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
        // accountComplete: false,
        role: response?.data.user.roleAccess,
        setup: response?.data.user.setup,
      });
      // const isLoggedIn = true;
      // localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));

      navigate(from, { replace: true });
    } catch (err: any) {
      console.log(err);
      console.log(err.response);
      console.log(err.response.data.message);

      const errorMessage = err.response.data.message;
      setErrMsg(errorMessage);
    }
    console.log(data);
  };

  return (
    <div className={styles.container}>
      {/* <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </p> */}
      <form onSubmit={handleSubmit(onSubmit)} className={styles["login-form"]}>
        <h2>Login</h2>
        <div className="form-control">
          <label>Email</label>
          <input
            type="text"
            {...register("username", {
              required: "Username is required.",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters long",
              },
              //   pattern: {
              //     value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              //     message: "Email is not valid.",
              //   },
            })}
          />
          {errors.username && <p className="errorMsg">{errors.username.message}</p>}
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
          {errors.password && <p className="errorMsg">{errors.password.message}</p>}
        </div>
        {/* <label>Username:</label>
        <div>
        <Controller
          name="username"
          control={control}
          rules={{
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters long",
            },
          }}
          render={({ field }) => <input type="text" placeholder="Username" {...field} />}
        />
        {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
        <label>Password:</label>
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            minLength: {
              value: 4,
              message: "Password must be at least 6 characters long",
            },
          }}
          render={({ field }) => <input type="password" placeholder="password" {...field} />}
        />
        {errors.password && <p>{errors.password.message}</p>}
        </div> */}
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
    </div>
  );
};

export default LoginForm;

// import React from "react";
// import { Controller, useForm } from "react-hook-form";

// interface FormData {
//   company: string;
//   username: string;
//   email: string;
//   password: string;
// }

// const ReactFormTest: React.FC = () => {
//   const {
//     handleSubmit,
//     control,
//     formState: { isDirty, errors },
//   } = useForm<FormData>();

//   const onSubmit = (data: FormData) => {
//     // Handle form submission here
//     console.log(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div>
//         <label>Company</label>
//         <Controller
//           name="company"
//           control={control}
//           rules={{ required: "Company is required" }}
//           render={({ field }) => <input {...field} />}
//         />
//         {errors.company && <p>{errors.company.message}</p>}
//       </div>

//       <div>
//         <label>Username</label>
//         <Controller
//           name="username"
//           control={control}
//           rules={{ required: "Username is required" }}
//           render={({ field }) => <input {...field} />}
//         />
//         {errors.username && <p>{errors.username.message}</p>}
//       </div>

//       <div>
//         <label>Email</label>
//         <Controller
//           name="email"
//           control={control}
//           rules={{
//             required: "Email is required",
//             pattern: {
//               value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//               message: "Invalid email address",
//             },
//           }}
//           render={({ field }) => <input {...field} />}
//         />
//         {errors.email && <p>{errors.email.message}</p>}
//       </div>

//       <div>
//         <label>Password</label>
//         <Controller
//           name="password"
//           control={control}
//           rules={{ required: "Password is required", minLength: 6 }}
//           render={({ field }) => <input type="password" {...field} />}
//         />
//         {errors.password && <p>{errors.password.message}</p>}
//       </div>

//       <button type="submit" disabled={!isDirty}>
//         Sign Up
//       </button>
//     </form>
//   );
// };

// export default ReactFormTest;

// import { joiResolver } from "@hookform/resolvers/joi";
// import Joi from "joi";
// import { useForm } from "react-hook-form";

// interface IFormInput {
//   name: string;
//   age: number;
// }

// const schema = Joi.object({
//   name: Joi.string().required(),
//   age: Joi.number().required(),
// });

// const ReactFormTest = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<IFormInput>({
//     resolver: joiResolver(schema),
//   });
//   const onSubmit = (data: IFormInput) => {
//     console.log(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input {...register("name")} />
//       <input type="number" {...register("age")} />
//       <input type="submit" />
//     </form>
//   );
// };

// export default ReactFormTest;
