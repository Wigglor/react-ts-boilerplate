import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { axiosPrivate } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

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
  posts: PostAttribute[];
}

const Premium = (): ReactElement => {
  const { setAuth, auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [posts, setPosts] = useState<Post | undefined>(undefined);
  const navigate = useNavigate();
  if (["PLAN2", "PLAN3"].includes(auth?.plan as string)) {
    return (
      <>
        <main>
          <h1>Premium</h1>
          <p>You have access to this functionality</p>
        </main>
      </>
      // <>
      //   <main className={styles.Premium}>
      //     <h1>Premium</h1>
      //     <p>You have access to this functionality</p>
      //   </main>
      // </>
    );
  } else {
    return (
      <>
        <main>
          <h1>Premium</h1>
        </main>
      </>
      // <>
      //   <main className={styles.Premium}>
      //     <h1>Premium</h1>
      //   </main>
      // </>
    );
  }
};

export default Premium;
