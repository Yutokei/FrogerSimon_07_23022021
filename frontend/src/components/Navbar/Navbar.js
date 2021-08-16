import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from './Logout';
import logoImg from '../../assets/Groupomania_logos/icon.png'
import auth from '../../auth/auth';

const Navbar = () => {

    const storedData = ()=>{if(localStorage.getItem("token")){
                          return  JSON.parse(localStorage.getItem("token").message)
                        }else {
                            return "Bienvenue"
                        }}
    const welcomeMessage = storedData;

    
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
                    <ul>
                        {auth.isAuthenticate ? (
                            <>
                        <li></li>
                        <li className="welcome">
                            <NavLink exact to="/profil">
                                <h5>{/*welcomeMessage*/} WELCOME</h5>
                            </NavLink>
                        </li>
                        <Logout />
                        </>
                        ) : (
                            <li></li>
                        )
                        }
                    </ul>
            </div>
        </nav>
    );
}

export default Navbar;
