import {React, useEffect, useState, useContext} from 'react';
import { AuthContext } from '../../auth/AuthContext'
import axios from 'axios';
import jwt_Decode from 'jwt-decode';

const UserProfile = () => {

    const [userName, setUsername] = useState("");
    const [userEmail, setUserEmail] = useState("")
    const [userRole, setUserRole] = useState("")
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
}, [])

    const removeUser = () => {
        axios({
            method:'DELETE',
            url:`${process.env.REACT_APP_API_URL}api/user/${decodedToken.uuid}`,
            headers: {token: localStorage.getItem("token"), uuid: decodedToken.uuid},
        })
        .then(()=>{
            localStorage.removeItem("token");

            window.location = "/"
        })
    }


    return (
        <>
            <div className="update-container">
                <div>
                <ul className="right-part">
                        <li><h3>Nom d'utilisateur: {userName}</h3></li>
                        <li><h3>Email: {userEmail}</h3></li>
                        <li><h3>Role: {userRole}</h3></li>
                    </ul>
                    <button onClick={()=> {removeUser()}}>Supprimer le profil</button>  
                </div>
            </div>  
        </>
    );
}

export default UserProfile;
