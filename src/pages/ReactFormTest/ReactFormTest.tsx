import { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
// import styles from "./ReactFormTest.module.scss";

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

  const {
    handleSubmit,
    // control,
    register,
    formState: { errors },
  } = useForm<LoginFormValues>(); // Pass the LoginFormValues type as a generic parameter

  const onSubmit = async (data: LoginFormValues) => {
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
      setAuth({
        user: data.username,
        accessToken: accessToken,
        role: response?.data.user.roleAccess,
        setup: response?.data.user.setup,
        currentPeriodEnds: response?.data.user.memberships[0].company.account.currentPeriodEnds,
        plan: response?.data.user.memberships[0].company.account.plan.name,
      });

      navigate(from, { replace: true });
    } catch (err: any) {
      const errorMessage = err.response.data.message;
      setErrMsg(errorMessage);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <button type="submit">Login</button>
        <div>
          <p>Or</p>
        </div>
        <div>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
