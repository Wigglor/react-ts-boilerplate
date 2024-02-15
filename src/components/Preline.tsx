import { HSDropdown, IStaticMethods } from "preline/preline";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
    window.HSStaticMethods.autoInit();
    // HSStaticMethods.autoInit();
  }, [location.pathname]);

  return <></>;
};

export default Preline;
