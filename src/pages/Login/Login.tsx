/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, ReactElement, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
// import useRefreshToken from "../../hooks/useRefreshToken";
import styles from "./Login.module.scss";
// import Cookies from 'js-cookie';

const LOGIN_URL = "/cognito/signin";

const Login = (): ReactElement => {
  // const { setAuth, persist, setPersist } = useAuth();
  const { setAuth } = useAuth();
  const userRef = useRef(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  // const history = useHistory();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  // const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // const refresh = useRefreshToken();
  const from = location.state?.from?.pathname || "/";

  // useEffect(() => {
  //   const userRef: RefObject<HTMLInputElement | null> = useRef(null);
  //   if (userRef.current) {
  //     userRef.current.focus();
  //   }
  // }, []);

  /*useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
        setIsAuthenticated(true);
        // setIsLoading(false);
        // navigate("/", { replace: true });
        console.log(`verify refreshToken step: ${JSON.stringify(auth)}`);
      } catch (err) {
        console.log("no refresh token available");
        console.error(err);
        // } finally {
        //   isMounted && setIsLoading(false);
      } finally {
        // isMounted && setIsLoading(false);
        setIsLoading(false);
      }
    };
    verifyRefreshToken();
  }, []);*/

  /*useEffect(() => {
    console.log(`persisting...${persist}`);
    console.log(localStorage.getItem("persist"));
  }, [persist]);*/

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      // Redirect to the homepage
      navigate("/"); // Replace '/homepage' with the actual route of your homepage
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    console.log(user, pwd);
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      const accessToken = response?.data.accessToken;
      console.log(accessToken);
      setAuth({
        user: user,
        accessToken: accessToken,
      });
      // setPersist(true);
      // const persistState = localStorage.setItem("persist", JSON.stringify(true));
      setUser("");
      setPwd("");
      const isLoggedIn = true;
      localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
      // setSuccess(true);
      // setPersist(true);
      navigate(from, { replace: true });
    } catch (err: any) {
      if (!err?.response) {
        console.log(err);
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
      //   errRef.current?.focus();
    }
  };

  return (
    <>
      {
        // isLoading ? (
        //   <p>Loading...</p>
        // ) :
        // isAuthenticated ? (
        //   <Navigate to="/" state={{ from: location }} replace />
        // ) : (
        <div className={styles.container}>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <form className={styles["login-form"]} onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Username"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <label htmlFor="username">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button className={styles["login-button"]} type="submit">
              Login
            </button>
          </form>
        </div>
      }
    </>
  );
};

export default Login;
