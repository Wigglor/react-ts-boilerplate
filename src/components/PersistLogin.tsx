import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  // const { auth, persist } = useAuth();
  const { auth } = useAuth();
  // const { auth } = useAuth();
  // const { auth } = useAuth();

  useEffect(() => {
    // let isMounted = true;
    const abortController = new AbortController();

    const verifyRefreshToken = async () => {
      try {
        console.log(`verify refreshToken step 1: ${JSON.stringify(auth)}`);
        await refresh();
        console.log(`verify refreshToken step 2: ${JSON.stringify(auth)}`);
      } catch (err) {
        console.error(err);
      } finally {
        // isMounted && setIsLoading(false);
        setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken

    console.log(`is verifyRefreshToken needed: ${auth?.accessToken}`);
    // console.log(`persist value: ${persist}`);
    // if (persist) {
    //   console.log("Persist is Truthy");
    // } else {
    //   console.log("Persist is Falsy");
    // }
    // !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
    if (auth) {
      console.log("YES - has auth!");
    } else {
      console.log("YES - has auth!");
    }
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
