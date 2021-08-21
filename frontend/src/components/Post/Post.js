import { React, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";
import jwt_Decode from "jwt-decode";
import Comment from "./Comment";

const Post = (element, key) => {

  const [textComment, setTextComment] = useState("");

  const { authState } = useContext(AuthContext);

  const decodedToken = jwt_Decode(localStorage.getItem("token"));

  const post = element.element;

  const deletePost = (id) => {
    axios({
      method: "DELETE",
      headers: {
        token: localStorage.getItem("token"),
        uuid: decodedToken.uuid,
      },
      url: `${process.env.REACT_APP_API_URL}api/post/${id}`,
    })
  };

  let commentObject = {
    postId: post.postId,
    userName: decodedToken.userName,
    userUuid: decodedToken.uuid,
    textContent: textComment,
  }

  const postComment = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/comment`,
      headers: {
        token: localStorage.getItem("token"),
        uuid: decodedToken.uuid,
      },
      data: {
          commentObject
      },
    });
  };

  return (
    <div>
      <ul>
        <li key={key} className="">
          <div className="">
            <h3>{post.userName}</h3>
            <h4>Posté le {post.createdAt}</h4>
          </div>
          <div className="">
            <h3>{post.textContent}</h3>
          </div>
          <div className="">
            <img className="post-gif" src={post.imageContent} alt=""/>
          </div>
          {authState.userName === post.userName && (
            <button
              onClick={() => {
                deletePost(post.postId);
              }}
              className="danger post-id"
            >
              Supprimer le post
            </button>
          )}
          <form
            key={key}
            className="comment-form"
            onSubmit={postComment}
          >
            <div className="comment-container">
              <div>{authState.userName} :</div>
              <label className="coment-label" htmlFor="commentaire"></label>
              <input
                className="comment-text"
                type="text"
                name="textComment"
                placeholder="Votre commentaire"
                minLength="1"
                required
                autoComplete="off"
                onChange={(e) => setTextComment(e.target.value)}
                value={textComment}
              />
              <input
                className="comment-input"
                type="submit"
                value="Commenter"
              />
            </div>
          </form>
        </li>
      </ul>
      <div>
        {post.Comments.map((element, key) =>(
          <Comment element={element} key={key} />
          ))
        }
      </div>
    </div>
  );
};

export default Post;
