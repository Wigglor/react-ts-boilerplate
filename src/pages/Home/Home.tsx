import { ReactElement } from "react";
import "./Home.module.scss";

// async function http(request: RequestInfo): Promise<any> {
//   const response = await fetch(request);
//   const body = await response.json();
//   return body;
// }

// interface Todo {
//   userId: number;
//   id: number;
//   title: string;
//   completed: boolean;
// }

const Home = (): ReactElement => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
