import React from "react";
import logoutImg from "../../assets/log-out.png";
import "./style.scss";

const Logout = () => {
  const logout = () => {
    localStorage.removeItem("token");

    window.location = "/";
  };

  return (
    <li className="logout-link" onClick={logout}>
      <img className="logout-image" src={logoutImg} alt="logout" />
    </li>
  );
};

export default Logout;
