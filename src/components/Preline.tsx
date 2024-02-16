import { useEffect } from "react";

import { useLocation } from "react-router-dom";

// import "preline/preline";
import { HSDropdown, IStaticMethods } from "preline/preline";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
    DDStaticMethods: HSDropdown;
  }
}

const Preline = () => {
  const location = useLocation();

  useEffect(() => {
    import("preline/preline");
  }, []);

  useEffect(() => {
    // @ts-ignore
    HSStaticMethods.autoInit();
  }, [location.pathname]);

  return <></>;
};

export default Preline;
