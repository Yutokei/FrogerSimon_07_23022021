import React from 'react';
import axios from 'axios';

const UserProfile = () => {

    axios({
        method:'get',
        url:`${process.env.REACT_APP_API_URL}api/user/:id`,
        headers: {token: localStorage.getItem("token")},
    }   
    )
    .then((res)=>{
        console.log(res)

    })

    return (
        <div className="profil-container">
            
        </div>
    );
}

export default UserProfile;
