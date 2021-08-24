import { React, useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import DeleteButton from "../DeleteButton/DeleteButton";

const Comment = (props) => {

  const {authState} = useContext(AuthContext);

//props.commentUpdate(commentUpdate)
    const comment = props.element

    return (
        <div>
            <div key={props.mappingKey} className="">
                <h4>{comment.userName}</h4>
                <h4>{comment.textContent}</h4>
            </div>

            {(authState.userName === comment.userName || authState.admin) && (
                <DeleteButton url={`comment/${comment.commentId}`} function=" X "/>
            )}
        </div>
    );
}

export default Comment;
