import { React, useState, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import CreateButton from "../CreateButton/CreateButton";
import moment from "moment";
import "moment/locale/fr";

import Comment from "./Comment";
import DeleteButton from "../DeleteButton/DeleteButton";

const Post = (props) => {
  const { authState } = useContext(AuthContext);

  const [textComment, setTextComment] = useState("");

  const post = props.element;

  let commentObject = {
    postId: post.postId,
    userName: authState.userName,
    userUuid: authState.uuid,
    textContent: textComment,
  };

  return (
    <>
      <li className="post-container">
        <div className="post-header">
          <h4 className="post-date">
            Posté {moment(post.createdAt).fromNow()}
          </h4>
          <h3 className="post-userName">{post.userName}</h3>
        </div>
        <div className="textContent-container">
          <h3 className="textContent">{post.textContent}</h3>
        </div>
        <div className="image-container">
          <img className="image" src={post.imageContent} alt="" />
        </div>
        {(authState.userName === post.userName || authState.admin) && (
          <DeleteButton
            url={`post/${post.postId}`}
            function="Supprimer le post"
          />
        )}
        <form className="comment-form">
          <div className="comment-container">
            <div>{authState.userName} :</div>
            <label className="coment-label" htmlFor="commentaire"></label>
            <input
              className="comment-text"
              type="text"
              name="textComment"
              placeholder="Votre commentaire"
              minLength="2"
              required
              autoComplete="off"
              onChange={(e) => setTextComment(e.target.value)}
              value={textComment}
            />
            <CreateButton
              url="comment"
              data={commentObject}
              function="Commenter"
            />
          </div>
        </form>
        {post.Comments.map((comment) => (
          <Comment element={comment} key={comment.commentId} />
        ))}
      </li>
    </>
  );
};

export default Post;
