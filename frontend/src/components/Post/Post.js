import { React, useState, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import CreateButton from "../CreateButton/CreateButton";

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
  }

  return (
    <div>
      <ul>
        <li key={props.mappingKey} className="">
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
          {(authState.userName === post.userName || authState.admin) && (
              <DeleteButton url={`post/${post.postId}`} function= "Supprimer le post"/>
          )}
          <form
            className="comment-form"
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
              <CreateButton url="comment" data={commentObject} function="Commenter"/>
            </div>
          </form>
        </li>
      </ul>
      <div>
        {post.Comments.map((comment, key) =>(
          <Comment element={comment} mappingKey={key} />
          ))
        }
      </div>
    </div>
  );
};

export default Post;
