import { React, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import logoImg from "../../assets/Groupomania_logos/icon.png";
import Logout from "./Logout";

const Navbar = () => {

  const { authState } = useContext(AuthContext)

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
          <>
            <li></li>
            <li className="welcome">
              <NavLink exact to="/profil">
                <h5>Bienvenue {authState.username}</h5>
              </NavLink>
            </li>
            <Logout />
          </>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
