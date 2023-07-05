/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, ReactElement, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
// import { AuthContext } from "../../context/AuthProvider";
import useAuth from "../../hooks/useAuth";
import "./Login.module.scss";

const LOGIN_URL = "/cognito/signin";

const Login = (): ReactElement => {
  // const navigate = useNavigate();
  const { setAuth } = useAuth();
  const userRef = useRef(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  //   useEffect(() => {
  //     const userRef: RefObject<HTMLInputElement | null> = useRef(null);
  //     if (userRef.current) {
  //       userRef.current.focus();
  //     }
  //   }, []);

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
          //   withCredentials: true,
        },
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.result.AuthenticationResult.AccessToken;
      // const accessToken = response?.data.accessToken;
      console.log(accessToken);
      setAuth({
        user: user,
        // pwd: pwd,
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
      {/* {success ? (
        <Navigate to="/" />
      ) : ( */}
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
      {/* )} */}
    </>
  );
};

export default Login;
