import React, { useContext } from 'react';
import Log from '../components/Log/index'
import { UidContext } from '../components/AppContext';

const Login = () => {
    const uid = useContext(UidContext);

    return (
        <div className="profil-page">
            {uid ? (
                <h1>PAGE update</h1>
            ) : (
            <div className="log-container">
                <Log />
                <div className="image-container">
                    <img src="../images/Groupomania_logos/icon-above-font.png" alt="img-log" />
                </div>
            </div>
            )}
        </div>
    )
}

export default Login;