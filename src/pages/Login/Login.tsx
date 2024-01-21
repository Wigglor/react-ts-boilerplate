/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, ReactElement, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const LOGIN_URL = "/cognito/signin";

const Login = (): ReactElement => {
  const { setAuth } = useAuth();
  const userRef = useRef(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
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
      setAuth({
        user: user,
        accessToken: accessToken,
        role: response?.data.user.roleAccess,
        setup: response?.data.user.setup,
        currentPeriodEnds: response?.data.user.memberships[0].company.account.currentPeriodEnds,
        plan: response?.data.user.memberships[0].company.account.plan.name,
      });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err: any) {
      const errorMessage = err.response.data.message;
      setErrMsg(errorMessage);
    }
  };

  return (
    <>
      {
        <div>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Login</button>

            <div>
              <p>Or</p>
            </div>
            <div>
              <Link to="/register">Register</Link>
            </div>
          </form>
        </div>
      }
    </>
    // <>
    //   {
    //     <div className={styles.container}>
    //       <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
    //         {errMsg}
    //       </p>
    //       <form className={styles["login-form"]} onSubmit={handleSubmit}>
    //         <h2>Login</h2>
    //         <label htmlFor="username">Username</label>
    //         <input
    //           type="text"
    //           placeholder="Username"
    //           id="username"
    //           ref={userRef}
    //           autoComplete="off"
    //           onChange={(e) => setUser(e.target.value)}
    //           value={user}
    //           required
    //         />
    //         <label htmlFor="username">Password</label>
    //         <input
    //           type="password"
    //           placeholder="Password"
    //           id="password"
    //           onChange={(e) => setPwd(e.target.value)}
    //           value={pwd}
    //           required
    //         />
    //         <button className={styles["login-button"]} type="submit">
    //           Login
    //         </button>

    //         <div className={styles.or}>
    //           <p>Or</p>
    //         </div>
    //         <div className={styles["register-link"]}>
    //           <Link className={styles["register-link__text"]} to="/register">
    //             Register
    //           </Link>
    //         </div>
    //       </form>
    //     </div>
    //   }
    // </>
  );
};

export default Login;
