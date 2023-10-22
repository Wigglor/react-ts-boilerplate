import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  console.log("Persist login");

  useEffect(() => {
    // let isMounted = true;
    const abortController = new AbortController();

    const verifyRefreshToken = async () => {
      try {
        // console.log(`verify refreshToken step 1: ${JSON.stringify(auth)}`);
        console.log(`refreshing token: ${auth.accessToken}`);
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        // isMounted && setIsLoading(false);
        setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken

    // console.log(`persist value: ${persist}`);
    // if (persist) {
    //   console.log("Persist is Truthy");
    // } else {
    //   console.log("Persist is Falsy");
    // }
    // !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    // return () => (isMounted = false);
    return () => {
      abortController.abort();
      // isMounted = false;
    };
  }, []);

  return <>{isLoading ? <p>Loading..............</p> : <Outlet />}</>;
};

export default PersistLogin;
