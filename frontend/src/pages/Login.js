import React from 'react';
import Log from '../components/Log/index'

const Login = () => {
    return (
        <div className="profil-page">
            <div className="log-container">
                <Log />
                <div className="image-container">
                    <img src='.\images\Groupomania_logos\icon-above-font.svg' alt="img-log" />
                </div>
            </div>
        </div>
    )
}

export default Login;