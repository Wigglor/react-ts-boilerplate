import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import styles from "./ReactFormTest2.module.scss";

const LOGIN_URL = "/signin";

type LoginFormValues = {
  username: string;
  password: string;
};

const ReactFormTest2 = (): ReactElement => {
  // const { setAuth, persist, setPersist } = useAuth();
  const { setAuth, auth } = useAuth();
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // useEffect(() => {
  //   // const isLoggedIn = localStorage.getItem("isLoggedIn");
  //   console.log(`checking auth: ${JSON.stringify(auth)}`);
  //   // console.log(`checking login: ${isLoggedIn}`);
  //   // if (isLoggedIn) {
  //   //   console.log("login status: SISISI!");
  //   //   // Redirect to the homepage
  //   //   navigate("/"); // Replace '/homepage' with the actual route of your homepage
  //   // } else {
  //   //   console.log("login status: NONONO!");
  //   // }
  //   // try {
  //   //   navigate("/");
  //   // } catch (error) {
  //   //   console.log("unable to login");
  //   // }
  //   if (auth.accessToken) {
  //     console.log("Can access auth context");
  //   }
  // }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data: LoginFormValues) => {
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
      // let accountComplete = true;
      // if (response?.data.hasAccount === false) {
      //   accountComplete = false;
      //   console.log(`has account: ${response?.data.hasAccount}`);
      // }
      setAuth({
        user: data.username,
        accessToken: accessToken,
        // accountComplete: accountComplete,
        // role: response?.data.user.roleAccess,
        role: response?.data.role,
        setup: response?.data.setup,
        currentPeriodEnds: response?.data.user.memberships[0].company.account.currentPeriodEnds,
      });
      console.log(`setAuth 1: ${data.username}`);
      console.log(`setAuth 2: ${accessToken}`);
      console.log(`setAuth 3: ${response?.data.role}`);
      console.log(`setAuth 4: ${response?.data.setup}`);
      // const isLoggedIn = true;
      // localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
      // localStorage.setItem("isLoggedIn", "true");
      // localStorage.setItem("persist", "true");
      // setPersist({"persist":true});
      console.log(`role: ${response?.data.role}`);
      console.log(`setup: ${response?.data.setup}`);
      // if (response?.data.role === "PENDING") {
      if (response?.data.setup === "PENDING") {
        navigate("/onboarding", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      // console.log(err);
      // console.log(err.response);
      // console.log(err.response.data.message);

      const errorMessage = err.response.data.message;
      setErrMsg(errorMessage);
    }
    reset();
  };

  // useEffect(() => {
  //   localStorage.setItem("persist", persist);
  // }, []);

  return (
    <main className={styles["login-container"]}>
      <form className={styles["login-form"]} onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        {errMsg && <div className={styles["login-error"]}>{errMsg}</div>}
        <div>
          <label htmlFor="username">username</label>

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
