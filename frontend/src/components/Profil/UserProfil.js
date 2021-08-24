import {React, useEffect, useState, useContext} from 'react';
import { AuthContext } from '../../auth/AuthContext'
import axios from 'axios';
import useAxiosGet from '../../Hook/useAxiosGet';

const UserProfile = () => {

    const  {authState}  = useContext(AuthContext);

    const  {data, loading, error} = useAxiosGet(`user/${authState.uuid}`)
        console.log("data "+data)


    const removeUser = (e) => {
        e.preventDefault()
        axios({
            method:'DELETE',
            url:`${process.env.REACT_APP_API_URL}api/user/${authState.uuid}`,
            headers: {token: localStorage.getItem("token"), uuid: authState.uuid},
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
                        <li><h3>Nom d'utilisateur: {data.userName}</h3></li>
                        <li><h3>Email: {data.userEmail}</h3></li>
                        <li><h3>Role: {data.userRole}</h3></li>
                    </ul>
                    <button onClick={removeUser}>Supprimer le profil</button>  
                </div>
            </div>  
        </>
    );
}

export default UserProfile;
