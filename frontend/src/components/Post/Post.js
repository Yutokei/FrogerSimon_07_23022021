import { React, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";
import jwt_Decode from "jwt-decode";
import Comment from "./Comment";

const Post = (element, key) => {

  const [textComment, setTextComment] = useState("");

  const [allComments, setAllComments] = useState([])

  const { authState } = useContext(AuthContext);

  const decodedToken = jwt_Decode(localStorage.getItem("token"));

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

  const postComment = (id) => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/comment`,
      headers: {
        token: localStorage.getItem("token"),
        uuid: decodedToken.uuid,
      },
      data: {
        postId: id,
        userName: decodedToken.userName,
        userUuid: decodedToken.uuid,
        textContent: textComment,
      },
    });
  };

  const getComments = () => {
    axios({
      method:'GET',
      url:`${process.env.REACT_APP_API_URL}api/comment/${element.id}`,
      headers: {token: localStorage.getItem("token"), uuid: decodedToken.uuid},
  })
  .then((res)=> {
      setAllComments(res.data)
  })
  }

    useEffect(()=> {
      getComments();
  },[])

  return (
    <div>
      <ul>
        <li key={key} className="">
          <div className="">
            <h3>{element.userName}</h3>
            <h4>Posté le{element.createdAt}</h4>
          </div>
          <div className="">
            <h3>{element.textContent}</h3>
          </div>
          <div className="">
            <h3>{element.imageContent}</h3>
          </div>
          {authState.userName === element.userName && (
            <button
              onClick={() => {
                deletePost(element.postId);
              }}
              className="danger post-id"
            >
              Supprimer le post
            </button>
          )}
          <form
            key={key}
            className="comment-form"
            onSubmit={() => {
              postComment(element.id);
            }}
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
        {allComments.map((element, key) =>(
          <Comment element={element} key={key} />
          ))
        }
      </div>
    </div>
  );
};

export default Post;
