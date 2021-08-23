import React,  { useState, useContext } from 'react';
import jwt_Decode from 'jwt-decode';
import { AuthContext } from '../../auth/AuthContext';
import axios from 'axios';
import Giphy from './Giphy/Giphy'
import './style.scss'


const CreatePost = () => {

    const { AuthState } = useContext(AuthContext)

    const [textContent, setTextContent] = useState("");
    const [imageContent, setImageContent] = useState("");

    const decodedToken = jwt_Decode(localStorage.getItem("token"))
    const tokenUuid = decodedToken.uuid
    const tokenUserName = decodedToken.userName


    let postObject = {
        userName: tokenUserName,
        userUuid: tokenUuid,
        textContent: textContent,
        imageContent: imageContent
    }

    const handleCreatePost = (e) => {
        e.preventDefault();
        axios({
            method:'POST',
            url:`${process.env.REACT_APP_API_URL}api/post/`,
            headers: {
                token: localStorage.getItem("token"),
                uuid: tokenUuid
              },
            data:
            {
                postObject
            }
        })
        .then(()=>{
            setImageContent("")
            setTextContent("")
        })
    }

    return (
        <form className="create-post-form-container" >
            <div className="post-container">
                <div className="form-userName"><h3>{tokenUserName}</h3></div>
                <div className="form-textArea">
                    <label className="form-label" htmlFor="texte">Le message</label>
                    <input className="form-text" type="text" name="textContent" autoComplete="off" onChange={(e) => setTextContent(e.target.value)} value={textContent}/>
                </div>
                <Giphy gifUrl={url => setImageContent(url)}/>
                <input className="form-input" type="submit" value="Valider le post" onClick={handleCreatePost} />
            </div>
        </form>
    );
}

export default CreatePost;
