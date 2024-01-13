import { ReactElement, useState } from "react";
// import axios from "axios";
// import styles from "./Home.module.scss";

interface ApiResponse {
  message: string;
}

const Home = (): ReactElement => {
  const [testData, setTestData] = useState<string>(() => {
    const testData = "test string";
    return testData;
  });
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
    <main>
      <h1>Home Page </h1>
      <p>test style test style test style test style test style test style</p>
    </main>
    // <main className={styles.Home}>
    // <main className="bg-red-600 ml-[12%] mt-20">
    //   <h1>Home Page </h1>
    //   <p className="bg-blue-500 text-white rounded">
    //     test style test style test style test style test style test style
    //   </p>

    //   {/* {data ? <div>{data.message}</div> : <div>Loading...</div>} */}
    // </main>
  );
};

export default Home;
