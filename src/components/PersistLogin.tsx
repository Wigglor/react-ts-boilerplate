import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
// import { WorkSpacesProvider } from "../context/WorkSpacesProvider";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    // let isMounted = true;
    const abortController = new AbortController();

    const verifyRefreshToken = async () => {
      try {
        // console.log(`verify refreshToken step 1: ${JSON.stringify(auth)}`);

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

    // !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    // return () => (isMounted = false);
    return () => {
      abortController.abort();
      // isMounted = false;
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading..............</p>
      ) : (
        // <WorkSpacesProvider>
        <Outlet />
        // </WorkSpacesProvider>
      )}
    </>
  );
};

export default PersistLogin;
