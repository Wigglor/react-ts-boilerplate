import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// async function http(request: RequestInfo): Promise<any> {
//   const response = await fetch(request);
//   const body = await response.json();
//   return body;
// }

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const Call = (): ReactElement => {
  const [result, setResult] = useState<Todo[] | null>([]);

  useEffect(() => {
    const api = async () => {
      // const APICall = new AppService("https://jsonplaceholder.typicode.com/todos");
      // const data = await APICall.getItems();

      setResult(null);
      // setResult(data);
    };
    // const api = async () => {
    //   const data = await fetch("https://jsonplaceholder.typicode.com/todos");
    //   const jsonData = await data.json();
    //   console.log(jsonData);
    //   setResult(jsonData);
    // };

    api();
  }, []);
  return (
    <div>
      {result?.map((value) => {
        return (
          <div key={value.id}>
            <Link to={{ pathname: `/${value.id}` }}>
              <div>{value.title}</div>
            </Link>
            <div>{value.completed}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Call;
