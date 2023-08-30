import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { axiosPrivate } from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import styles from "./Posts.module.scss";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface PostAttribute {
  id: number;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

interface Post {
  //   result: {
  //     Username: string;
  //     UserAttributes: UserAttribute[];
  //   };

  posts: PostAttribute[];
}

const Posts = (): ReactElement => {
  const axiosPrivate = useAxiosPrivate();
  const [posts, setPosts] = useState<Post | undefined>(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const controller = new AbortController();
    const getPosts = async () => {
      try {
        const response: ApiResponse<Post> = await axiosPrivate.get("/posts?page=1&perpage=2", {
          signal: controller.signal,
          withCredentials: true,
        });
        console.log(response.data);

        setPosts(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getPosts();

    return () => {
      controller.abort();
    };
  }, []);

  //   if (!user) {
  //     return (
  //       <div>

  //       </div>
  //     );
  //   }

  return (
    <main className={styles.Posts}>
      <h1>Posts</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Author ID</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts?.posts.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.content}</td>
              <td>{item.authorId}</td>
              <td>{item.createdAt}</td>
              <td>{item.updatedAt}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Posts;
