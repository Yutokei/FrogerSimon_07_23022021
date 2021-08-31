import React from "react";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost/CreatePost";

const Home = () => {
  return (
    <div className="profil-page">
      <div>
        <CreatePost />
      </div>
      <>
        <Post />
      </>
    </div>
  );
};

export default Home;
