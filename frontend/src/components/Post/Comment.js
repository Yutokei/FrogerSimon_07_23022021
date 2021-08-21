import { React, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../auth/AuthContext";
import jwt_Decode from 'jwt-decode';

const Comment = (element, key) => {

  const { authState } = useContext(AuthContext);

    const comment = element.element

    const decodedToken = jwt_Decode(localStorage.getItem("token"))

    const deleteComment = (id) => {
        axios({
          method: "DELETE",
          headers: {
            token: localStorage.getItem("token"),
            uuid: decodedToken.uuid,
          },
            url: `${process.env.REACT_APP_API_URL}api/comment/${id}`,
        })
      };

    return (
        <div>
            <div key={key} className="">
                <h4>{comment.userName}</h4>
                <h4>{comment.textContent}</h4>
            </div>

            {authState.userName === comment.userName && (
              <button onClick={()=>{deleteComment(comment.id)}}> X </button>
            )}
        </div>
    );
}

export default Comment;
