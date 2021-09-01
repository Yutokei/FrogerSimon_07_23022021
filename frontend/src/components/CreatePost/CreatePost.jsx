import React, { useState, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import Giphy from "./Giphy/Giphy";
import "./style.scss";
import CreateButton from "../CreateButton/CreateButton";

const CreatePost = () => {
  const { authState } = useContext(AuthContext);

  const [textContent, setTextContent] = useState("");
  const [imageContent, setImageContent] = useState(false);

  let postObject = {
    userName: authState.userName,
    userUuid: authState.uuid,
    textContent: textContent,
    imageContent: imageContent,
  };

  return (
    <form className="create-post-form-container">
      <div className="create-post-container">
        <div className="form-userName">
          <h3>{authState.userName}</h3>
        </div>
        <div className="form-textArea">
          <label className="form-label" htmlFor="texte">
            Le message
          </label>
          <input
            className="form-text"
            type="text"
            name="textContent"
            autoComplete="off"
            onChange={(e) => setTextContent(e.target.value)}
            value={textContent}
          />
        </div>
        <Giphy gifUrl={(url) => setImageContent(url)} />
        {imageContent && <img className="image" src={imageContent} alt="" />}
        <div className="button-container">
          <CreateButton
            url="post/"
            data={postObject}
            function="Envoyer le post"
            clear={() => {
              setTextContent("");
              setImageContent(false)
            }}
          />
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
