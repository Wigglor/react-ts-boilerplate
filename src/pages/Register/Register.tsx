import { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import styles from "./Register.module.scss";
// import axios from "axios";

const Register = (): ReactElement => {
  const INITIAL_STATE = {
    name: "",
    accountEmail: "",
    username: "",
    email: "",
    password: "",
  };
  const [form, setForm] = useState(INITIAL_STATE);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setForm(INITIAL_STATE);
  };

  return (
    <main>
      <div className={styles.registerform}>
        <form onSubmit={handleSubmit}>
          <h2>Signup</h2>
          <div>
            <label htmlFor="name">Company Name</label>
            <input id="name" type="text" value={form.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="accountEmail">Account Email</label>
            <input id="accountEmail" type="text" value={form.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" value={form.name} onChange={handleChange} />
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
      </div>
    </main>
  );
};

export default Register;
