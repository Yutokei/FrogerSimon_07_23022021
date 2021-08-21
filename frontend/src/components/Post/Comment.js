import { React } from "react";
import axios from "axios";
import jwt_Decode from 'jwt-decode';

const Comment = (element, key) => {

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
                <h4>{element.userName}</h4>
                <h4>{element.textContent}</h4>
            </div>
            <button onClick={()=>{deleteComment(element.id)}}> X </button>
        </div>
    );
}

export default Comment;
