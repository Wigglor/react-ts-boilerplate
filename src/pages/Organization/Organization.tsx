import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { axiosPrivate } from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styles from "./Organization.module.scss";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface UserAttribute {
  Name: string;
  Value: string;
}

interface User {
  result: {
    Username: string;
    UserAttributes: UserAttribute[];
  };
}

const Organization = (): ReactElement => {
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState<User | undefined>(undefined);
  const navigate = useNavigate();
  /* useEffect(() => {
    // let isMounted = true;
    const controller = new AbortController();
    const getUser = async () => {
      try {
        const response: ApiResponse<User> = await axiosPrivate.post("/cognito/getuser", {
          signal: controller.signal,
          withCredentials: true,
        });
        // setUser(response.data.Username);
        setUser(response.data);
        // isMounted && setUser(response.data.result);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUser();

    return () => {
      // isMounted = false;
      controller.abort();
    };
  }, []);

  if (!user) {
    return (
      <div>
        <p> loading account data....................................................</p>
      </div>
    );
  }*/

  return (
    <main className={styles.Account}>
      {/* <form onSubmit={(e) => handleSubmit(e, selectedPrice.id)}> */}
      <div className={styles.info}>
        <form>
          <button type="submit">Submit</button>
        </form>
        <button>Close</button>
      </div>
    </main>
  );
};

export default Organization;
