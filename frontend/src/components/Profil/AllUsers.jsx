import React from 'react';
import axios from "axios";
import DeleteButton from '../DeleteButton/DeleteButton'


const AllUsers = (props) => {

  const user = props.element;


    return (
        <>
        <li>
          <h3 id={props.mappingKey}>Nom d'utilisateur: {user.userName}</h3>
        </li>
        <li>
          <h3>Email: {user.userEmail}</h3>
        </li>
        <li>
          <h3>Role: {user.userRole}</h3>
        </li>
        <DeleteButton url={`user/${user.uuid}`} function= "Supprimer l'utilisateur-ice"/>
      </>
    );
}

export default AllUsers;
