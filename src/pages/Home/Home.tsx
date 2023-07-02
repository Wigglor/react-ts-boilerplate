import { ReactElement, useEffect, useState } from "react";
import axiosProd from "../../api/axios";
// import axios from "axios";
import styles from "./Home.module.scss";

interface ApiResponse {
  message: string;
}

const Home = (): ReactElement => {
  const [data, setData] = useState<ApiResponse | null>(null);

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
  }, []);

  return (
    <main className={styles.Home}>
      <h1>Home Page </h1>
      {/* <p>message: {data[0]["message"]}</p> */}
      {/* {data.map((item) => (
        <div key={item.message}>{item.message}</div>
      ))} */}
      {/* {Array.isArray(data) ? (
        data.map((item) => <div key={item.message}>{item.message}</div>)
      ) : (
        <div>No data available</div>
      )} */}
      {/* {data.length > 0 ? (
        data.map((item) => <div key={item.message}>{item.message}</div>)
      ) : (
        <div>Loading...</div>
      )} */}
      {data ? <div>{data.message}</div> : <div>Loading...</div>}
    </main>
  );
};

export default Home;
