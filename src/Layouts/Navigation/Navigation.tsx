import { ReactElement } from "react";
import NavBar from "../NavBar/NavBar";
import SideNav from "../SideNav/SideNav";

const Navigation = (): ReactElement => {
  return (
    <>
      <NavBar />
      <SideNav />
    </>
  );
};

export default Navigation;
