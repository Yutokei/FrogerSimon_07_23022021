import React from 'react';
import Log from '../components/Log/index'
import largeLogoImg from '../assets/Groupomania_logos/icon-above-font.png'

const Login = () => {

    return (
        <div className="profil-page">           
            <div className="log-container">
                <Log />
                <div className="image-container">
                    <img src={largeLogoImg} alt="img-log" />
                </div>
            </div>
        </div>
    )
}

export default Login;