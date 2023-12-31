import { ReactElement, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useWorkSpaces from "../../hooks/useWorkSpaces";
import styles from "./ReactFormTest2.module.scss";

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

const ReactFormTest2 = (): ReactElement => {
  // const { setAuth, persist, setPersist } = useAuth();
  const { setAuth } = useAuth();
  const { setWorkSpaces } = useWorkSpaces();
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
      console.log("setting auth.....................................................");
      const workSpaces = response?.data.user.memberships.map((item: Item) => {
        return { name: item.company.name, id: item.company.id };
      }); // extend this and return obj with company id etc as well

      setWorkSpaces({
        availableWorkSpaces: workSpaces,
        selectedWorkSpace: {
          name: response?.data.user.memberships[0].company.name,
          id: response?.data.user.memberships[0].company.id,
        },
      });

      console.log("setting workspace.....................................................");

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
        {/* <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
            console.log(credentialResponse);

            // setGoogleUser(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
        />
        ; */}
        {/* <button onClick={handleGoogleLogin}>Login with Google</button> */}
        {/* <button onClick={() => login()}>Sign in with Google 🚀</button>; */}
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

      <button onClick={handleGoogleLogin}>Login with Google</button>
    </main>
    // </GoogleOAuthProvider>
  );
};

export default ReactFormTest2;
