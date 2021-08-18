import {React, useEffect, useState, useContext} from 'react';
import { AuthContext } from '../../auth/AuthContext'
import axios from 'axios';
import jwt_Decode from 'jwt-decode';


const UserProfile = () => {
    const [userName, setUsername] = useState("");
    const [userEmail, setUserEmail] = useState("")
    const [userRole, setUserRole] = useState("")
    const [listOfPosts, setListOfPosts] = useState([]);
    const { authState } = useContext(AuthContext);

    const decodedToken = jwt_Decode(localStorage.getItem("token"))

    useEffect(()=> {
    axios({
        method:'get',
        url:`${process.env.REACT_APP_API_URL}api/user/:id`,
        headers: {token: localStorage.getItem("token"), uuid: decodedToken.uuid},
    })
    .then((res)=> {
        setUsername(res.data.userName)
        setUserEmail(res.data.email)

        const isAdmin = () => {if(res.data.isAdmin === true){ return "Admin" }else{ return "Utilisateur" }}
        setUserRole(isAdmin)
    });

    axios({
        method:'get',
        url:`${process.env.REACT_APP_API_URL}api/post/user`,
        headers: {token: localStorage.getItem("token"), uuid: decodedToken.uuid},
    })
    .then((res)=> {
        setListOfPosts(res.data)
    })
}, [])

    return (
        <>
            <div className="update-container">
                <div>
                <ul className="right-part">
                    <li><h3>Nom d'utilisateur: {userName}</h3></li>
                    <li><h3>Email: {userEmail}</h3></li>
                    <li><h3>Role: {userRole}</h3></li>
                </ul>  
                </div>
            </div>
            <ul>
                {listOfPosts.map((post, key)=>{
                    return (
                        <li key={key} className="">
                            <div className="">
                                <h3>{post.userName}</h3>
                            </div>
                            <div className="">
                                <h3>{post.textcontent}</h3>
                            </div>  
                            <div className="">
                                <h3>{post.imageContent}</h3>
                            </div>
                            <button onClick="" className="danger">Supprimer le post</button>  
                        </li>
                    )
                })}
            </ul>
        </>
    );
}

export default UserProfile;
