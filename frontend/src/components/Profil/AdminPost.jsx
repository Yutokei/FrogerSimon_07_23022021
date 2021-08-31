import { React } from "react";
import useAxiosGet from "../../Hook/useAxiosGet";
import Post from "../Post/Post";

const AdminPost = () => {
  const { data } = useAxiosGet("post");

  return (
    <div>
      <ul className="post-list-container">
        {data.map((post) => (
          <Post element={post} key={post.postId} />
        ))}
      </ul>
    </div>
  );
};

export default AdminPost;
