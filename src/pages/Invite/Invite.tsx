/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
// import useAuth from "../../hooks/useAuth";

const COMPLETE_INVITE_URL = "/complete-invite";

type FormData = {
  username: string;
  email: string;
  tempPassword: string;
  newPassword: string;
  firstName: string;
  lastName: string;
};

const Invite = (): ReactElement => {
  const {
    setValue,
    register,
    handleSubmit,
    // control,
    // reset,
    formState: { errors },
  } = useForm<FormData>();
  // const { setAuth, auth } = useAuth();
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  // const from = location.state?.from?.pathname || "/";

  // const code = searchParams.get("code");
  const email = searchParams.get("email") as string;
  const password = searchParams.get("code") as string;

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const response = await axios.post(
        COMPLETE_INVITE_URL,
        JSON.stringify({
          // tempPassword: data.tempPassword,
          tempPassword: password,
          newPassword: data.newPassword,
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
        navigate("/login", { replace: true });
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Complete Signup!</h2>
        {errMsg && <div>{errMsg}</div>}
        <div>
          <label htmlFor="email">email</label>
          <input
            id="email"
            value={email}
            {...register("email", {
              disabled: true,
              required: "required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format",
              },
            })}
            type="email"
          />
          {/* {errors.email && <span role="alert">{errors.email.message}</span>}
          <label htmlFor="tempPassword">Temporary Password</label>
          <input
            id="tempPassword"
            {...register("tempPassword", {
              required: "required",
              minLength: {
                value: 5,
                message: "min length is 5",
              },
            })}
            type="password"
          /> */}
          {errors.tempPassword && <span role="alert">{errors.tempPassword.message}</span>}
          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            {...register("newPassword", {
              required: "required",
              minLength: {
                value: 5,
                message: "min length is 5",
              },
            })}
            type="password"
          />
          {errors.newPassword && <span role="alert">{errors.newPassword.message}</span>}
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            {...register("firstName", {
              required: "required",
              minLength: {
                value: 1,
                message: "min length is 1",
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
                value: 1,
                message: "min length is 1",
              },
            })}
            type="text"
          />
          {errors.lastName && <span role="alert">{errors.lastName.message}</span>}
        </div>
        <button type="submit" onClick={() => setValue("email", email)}>
          Signup
        </button>
      </form>
    </main>
  );
};

export default Invite;
