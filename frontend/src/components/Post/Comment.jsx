import { React, useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import DeleteButton from "../DeleteButton/DeleteButton";

const Comment = (props) => {

  const {authState} = useContext(AuthContext);

//props.commentUpdate(commentUpdate)
    const comment = props.element

    return (
        <div className="comment-container border">
            <div className="comment-text-content" key={props.mappingKey} >
                <h4 className="comment-userName">{comment.userName}: </h4>
                <h5>{comment.textContent}</h5>
            </div>

            {(authState.userName === comment.userName || authState.admin) && (
                <DeleteButton url={`comment/${comment.commentId}`} function=" X "/>
            )}
        </div>
    );
}

export default Comment;
