import React, { useContext } from 'react';
import Log from '../components/Log/index'
import { AuthApi } from '../components/AuthApi';
import largeLogoImg from '../images/Groupomania_logos/icon-above-font.png'

const Login = () => {
    //const auth = useContext(AuthApi);

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