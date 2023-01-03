import axios from "axios";
import { FormEvent, ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginCredentials = {
  //   credentials: { username: string; password: string };
  username: string | undefined;
  password: string | undefined;
};

type Credential = string | undefined;
type Token = string | null;

const loginUser = async (username: Credential, password: Credential): Promise<Token> => {
  const credentials = { username: username, password: password };
  return fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
};

const Login = (): ReactElement => {
  const navigate = useNavigate();
  const [username, setUserName] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const credentials = { username: username, password: password };
    // const token = await loginUser(username, password);
    const token = await signIn(username, password);
    navigate("/dashboard");
    // setToken(token);
  };

  const signIn = async (username: Credential, password: Credential): Promise<Token | undefined> => {
    try {
      setIsLoading(true);
      const response = await axios({
        method: "post",
        url: "http://localhost:3000/login",
        data: {
          username,
          password,
        },
      });
      if (!response?.data?.token) {
        console.log("Something went wrong during signing in: ", response);
        return;
      }
      //   storeTokenInLocalStorage(response.data.token);
      //   navigate("dashboard");
      return response.data;
    } catch (err) {
      console.log("Some error occured during signing in: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <p>Username</p>
        <input type="text" onChange={(e) => setUserName(e.target.value)} />
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Login;
