import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from './Logout';

const NavbarAuth = () => {

    return (
        <>
        <li></li>
        <li className="welcome">
          <NavLink exact to="/profil">
            <h5>{authState.username}</h5>
          </NavLink>
        </li>
        <Logout />
      </>
    );
}

export default NavbarAuth;
