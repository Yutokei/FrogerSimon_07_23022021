import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthApi } from '../AuthApi';
import Logout from './Logout';
import logoImg from '../../assets/Groupomania_logos/icon.png'
import logoutImg from '../../assets/log-out.png'

const Navbar = () => {
    const auth = useContext(AuthApi);
    const storedData = JSON.parse(localStorage.getItem("user"))
    const welcomeMessage = storedData.message

    
    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink exact to="/home">
                        <div className="logo">
                            <img src={logoImg} alt="icon" />
                            <h3>Groupomania</h3>
                        </div>
                    </NavLink>
                </div>
                {auth ? (
                    <ul>
                        <li></li>
                        <li className="welcome">
                            <NavLink exact to="/profil">
                                <h5>{welcomeMessage}</h5>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <li>
                            <NavLink exact to="/">
                                <img src={logoutImg} alt="logout" />
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
