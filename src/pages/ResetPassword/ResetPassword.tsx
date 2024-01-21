/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation /*useNavigate*/ } from "react-router-dom";
import axios from "../../api/axios";

const RESET_URL = "/resetpassword";

type FormData = {
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
};

const ResetPassword = (): ReactElement => {
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
      /*if (response.status === 200) {
        navigate("/login", { replace: true });
      } else {
        console.log(JSON.stringify(response));
      }*/
      setSuccessMsg("Successfully changed password!");
    } catch (err: any) {
      const errorMessage = err.response.data.message;
      setErrMsg(errorMessage);
    }
    // reset();
  };

  return (
    <main>
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
    </main>
  );
};

export default ResetPassword;
