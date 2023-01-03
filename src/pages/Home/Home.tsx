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
  //   const [result, setResult] = useState<Todo[] | null>([]);

  //   useEffect(() => {
  //     const api = async () => {
  //       const APICall = new AppService("https://jsonplaceholder.typicode.com/todos");
  //       const data = await APICall.getItems();
  //       console.log(data);
  //       setResult(data);
  //     };

  //     api();
  //   }, []);
  return (
    <div>
      {/* {result?.map((value) => {
        return (
          <div key={value.id}>
            <Link to={{ pathname: `/${value.id}` }}>
              <div>{value.title}</div>
            </Link>
            <div>{value.completed}</div>
          </div>
        );
      })} */}
    </div>
  );
};

export default Home;
