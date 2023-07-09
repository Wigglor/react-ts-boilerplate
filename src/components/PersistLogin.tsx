import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  //   const { auth, persist } = useAuth();
  const { auth } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
        console.log(`verify refreshToken step: ${JSON.stringify(auth)}`);
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    // !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    /*const tokenLength = auth?.accessToken.length as number;

    tokenLength < 1 ? verifyRefreshToken() : setIsLoading(false);*/

    // return () => (isMounted = false);
    return () => {
      isMounted = false;
    };
  }, []);

  /*useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);*/

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
  //   return <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
// export {};
