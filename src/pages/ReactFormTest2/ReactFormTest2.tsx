import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useWorkSpaces from "../../hooks/useWorkSpaces";
import styles from "./ReactFormTest2.module.scss";

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

const ReactFormTest2 = (): ReactElement => {
  // const { setAuth, persist, setPersist } = useAuth();
  const { setAuth, auth } = useAuth();
  const { setWorkSpaces } = useWorkSpaces();
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  console.log("hitting login route after signing out.....");

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
        // JSON.stringify({ username: data.username, password: data.password }),
        JSON.stringify({ email: data.email, password: data.password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      const accessToken = response?.data.accessToken;
      console.log(JSON.stringify(response));
      console.log(JSON.stringify(response.data));
      setAuth({
        user: data.email,
        accessToken: accessToken,
        role: response?.data.role,
        setup: response?.data.setup,
        // currentPeriodEnds: response?.data.user.memberships[0].company.account.currentPeriodEnds,
        currentPeriodEnds: response?.data.user.memberships[0]?.company?.account.currentPeriodEnds,
        // plan: response?.data.user.memberships[0].company.account.plan.name,
        plan: response?.data.user.memberships[0]?.company?.account.plan?.name,
      });

      const workSpaces = response?.data.user.memberships.map((item: Item) => {
        return { name: item.company.name, id: item.company.id };
      }); // extend this and return obj with company id etc as well
      // localStorage.setItem("workSpaces", JSON.stringify(workSpaces));

      setWorkSpaces({
        availableWorkSpaces: workSpaces,
        selectedWorkSpace: {
          name: response?.data.user.memberships[0].company.name,
          id: response?.data.user.memberships[0].company.id,
        },
      });

      // localStorage.setItem("workSpaces", response?.data.user.memberships[0].company.name);
      // console.log(
      //   JSON.stringify(response?.data.user.memberships[0].company?.account.currentPeriodEnds),
      // );
      if (response?.data.setup === "PENDING") {
        navigate("/onboarding", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err: any) {
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
              *{errors.email.message}
            </span>
          )}
          {/* <input
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
        <div className={styles["forgotpassword-link"]}>
          <Link className={styles["forgotpassword-link__text"]} to="/forgot-password">
            Forgot your password?
          </Link>
        </div>
      </form>
    </main>
  );
};

export default ReactFormTest2;
