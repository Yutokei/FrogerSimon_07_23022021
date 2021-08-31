import { React, useContext } from "react";
import Post from "./Post";
import useAxiosGet from "../../Hook/useAxiosGet";
import "./style.scss";
import { AuthContext } from "../../auth/AuthContext";

const Index = () => {
  const { authState } = useContext(AuthContext);
  const { data } = useAxiosGet("post/", authState);

  return (
    <>
      <ul className="post-list-container">
        {data.map((post) => (
          <Post element={post} key={post.postId} />
        ))}
      </ul>
    </>
  );
};

export default Index;
