import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { axiosPrivate } from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

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

const Account = (): ReactElement => {
  const axiosPrivate = useAxiosPrivate();
  const [user, setUser] = useState<User | undefined>(undefined);
  const navigate = useNavigate();
  useEffect(() => {
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
  }

  return (
    <main>
      <h1>Account</h1>
      <div>
        <div>
          <div>
            <div>
              <p>
                <b>Account</b>
              </p>
            </div>
            <div>
              <p>
                <b>Username</b>
              </p>

              <p>{user?.result.Username}</p>
            </div>
            <div>
              <p>
                <b>email</b>
              </p>
            </div>
            <div>
              <p>
                <b>Role Access</b>
              </p>
            </div>
            <div>
              <p>
                <b>Data</b>
              </p>
              <div>{JSON.stringify(user)}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
    // <main className={styles.Account}>
    //   <h1>Account</h1>
    //   <div className={styles.info}>
    //     <div>
    //       <div>
    //         <div>
    //           <p>
    //             <b>Account</b>
    //           </p>
    //         </div>
    //         <div>
    //           <p>
    //             <b>Username</b>
    //           </p>

    //           <p>{user?.result.Username}</p>
    //         </div>
    //         <div>
    //           <p>
    //             <b>email</b>
    //           </p>
    //           {/* <p>{user?.result.UserAttributes[3].Value}</p> */}
    //         </div>
    //         <div>
    //           <p>
    //             <b>Role Access</b>
    //           </p>
    //         </div>
    //         <div>
    //           <p>
    //             <b>Data</b>
    //           </p>
    //           <div>{JSON.stringify(user)}</div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </main>
  );
};

export default Account;
