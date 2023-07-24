import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styles from "./ReactFormTest.module.scss";

type LoginFormValues = {
  username: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormValues>(); // Pass the LoginFormValues type as a generic parameter

  const onSubmit = (data: LoginFormValues) => {
    // Replace this with your login logic
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles["login-form"]}>
        <label>Username:</label>
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
            render={({ field }) => <input {...field} />}
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
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            }}
            render={({ field }) => <input type="password" {...field} />}
          />
          {errors.password && <p>{errors.password.message}</p>}
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
