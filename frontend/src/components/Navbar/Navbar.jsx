import { React, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import logoImg from "../../assets/Groupomania_logos/icon.png";
import Logout from "./Logout";
import './style.scss'

const Navbar = ({userName}) => {

const  {authState}  = useContext(AuthContext)

  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact to="/home">
            <div className="logo">
              <img className="logo-image" src={logoImg} alt="icon" />
              <h3>Groupomania</h3>
            </div>
          </NavLink>
        </div>
        <ul className="nav-link">
          <>
            <li className="welcome">
              {authState.status &&(
              <NavLink exact to="/profil">
                <h5>Le profil de {userName}</h5>
              </NavLink>)}
            </li>
            <Logout />
          </>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
