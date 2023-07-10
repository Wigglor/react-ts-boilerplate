/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, ReactElement, useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";
import "./Login.module.scss";
// import Cookies from 'js-cookie';

const LOGIN_URL = "/cognito/signin";

const Login = (): ReactElement => {
  const { auth, setAuth } = useAuth();
  const userRef = useRef(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const refresh = useRefreshToken();
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
      setUser("");
      setPwd("");
      // setSuccess(true);
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
        isAuthenticated ? (
          <Navigate to="/" state={{ from: location }} replace />
        ) : (
          // )
          // <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          // navigate("/", { replace: true })
          <div className="container">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
              {errMsg}
            </p>
            <form className="login-form" onSubmit={handleSubmit}>
              <h2>Login</h2>
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
              <input
                type="password"
                placeholder="Password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
              <button type="submit">Log in</button>
            </form>
          </div>
        )
      }
    </>
  );
};

export default Login;
