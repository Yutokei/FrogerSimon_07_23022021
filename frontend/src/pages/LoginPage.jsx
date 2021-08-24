import React from 'react';
import Login from '../components/Login'
import largeLogoImg from '../assets/Groupomania_logos/icon-above-font.png'

const LoginPage = () => {

    return (
        <div className="profil-page">           
            <div className="log-container">
                <Login />
                <div className="image-container">
                    <img src={largeLogoImg} alt="img-log" />
                </div>
            </div>
        </div>
    )
}

export default LoginPage;