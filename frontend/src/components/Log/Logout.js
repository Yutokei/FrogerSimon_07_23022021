import React from 'react';
import logoutImg from '../../images/log-out.png'

const Logout = () => {

    const logout = () => {

        localStorage.removeItem("user")

        window.location = "/"
    }

    return (
        <li onClick={logout}>
            <img src={logoutImg} alt="logout" />
        </li>
    );
}

export default Logout;
