import { React, useEffect, useState, useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";
import useAxiosGet from "../../Hook/useAxiosGet";
import moment from 'moment';
import 'moment/locale/fr'

const UserProfile = () => {
  const { authState } = useContext(AuthContext);

  const { data, loading, error } = useAxiosGet(`user/${authState.uuid}`);
  let role = "";

  const isAdmin = () => {
    if (data.userRole === true) {
      role = "Admin";
    } else {
      role = "utilisateur";
    }
  };
  isAdmin();

  const removeUser = (e) => {
    e.preventDefault();
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}api/user/${authState.uuid}`,
      headers: { token: localStorage.getItem("token"), uuid: authState.uuid },
    }).then(() => {
      localStorage.removeItem("token");

      window.location = "/";
    });
  };

  return (
    <>
      <ul className="profil-container">
        <li>
          <h3>Nom d'utilisateur: {data.userName}</h3>
        </li>
        <li>
          <h3>Email: {data.userEmail}</h3>
        </li>
        <li>
          <h3>Role: {role}</h3>
        </li>
        <li>
          <h5>Crée le: {moment(data.createdAt).format('l')}</h5>
        </li>
        <button className="delete-button" onClick={removeUser}>Supprimer le profil</button>
      </ul>
    </>
  );
};

export default UserProfile;
