import { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import ErrorMsg from "../../components/Error/ErrorMsg";
import styles from "./Register.module.scss";

const REGISTER_URL = "/signup2";

const Register = (): ReactElement => {
  const INITIAL_STATE = {
    name: "",
    accountEmail: "",
    username: "",
    email: "",
    password: "",
  };
  const [form, setForm] = useState(INITIAL_STATE);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(JSON.stringify(form));
    try {
      const response = await axios.post(REGISTER_URL, JSON.stringify(form), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response);
      setForm(INITIAL_STATE);
      navigate("/login", { replace: true });
    } catch (error: any) {
      console.log(error);
      console.log(error.message);
      // setError(error as Error);
      showError(error);
    }
  };

  const showError = (message: string) => {
    setError(() => new Error(message));

    // Clear the error message after 3 seconds (3000 milliseconds)
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  return (
    <main className={styles.register}>
      {error ? <ErrorMsg message={error} /> : null}
      <div className={styles.registerform}>
        <form onSubmit={handleSubmit}>
          <h2>Signup</h2>
          <div>
            <label htmlFor="name">Company Name</label>
            <input id="name" type="text" value={form.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="accountEmail">Account Email</label>
            <input
              id="accountEmail"
              type="text"
              value={form.accountEmail}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" value={form.username} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" value={form.email} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={form.password} onChange={handleChange} />
          </div>
          <button className={styles["signup-button"]} type="submit">
            Signup
          </button>
        </form>
        <div className={styles.or}>
          <p>Or</p>
        </div>
        <div className={styles["login-link"]}>
          <Link className={styles["login-link__text"]} to="/login">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Register;
