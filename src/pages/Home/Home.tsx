import { ReactElement } from "react";
// import axios from "axios";
import styles from "./Home.module.scss";

interface ApiResponse {
  message: string;
}

const Home = (): ReactElement => {
  /*const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosProd.get("index");
        // const response = await axios.get("http://16.170.240.223:3000/index");
        setData(response.data);

        console.log(response.data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPost();
  }, []);*/

  return (
    <main className={styles.Home}>
      <h1>Home Page </h1>
      {/* {data ? <div>{data.message}</div> : <div>Loading...</div>} */}
    </main>
  );
};

export default Home;
