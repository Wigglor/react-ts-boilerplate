import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

const Dashboard = (): ReactElement => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Dashboard;
