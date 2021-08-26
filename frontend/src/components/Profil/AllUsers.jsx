import React from 'react';
import DeleteButton from '../DeleteButton/DeleteButton'
import moment from 'moment';
import 'moment/locale/fr'


const AllUsers = (props) => {

  const user = props.element;


    return (
        <>
        <li className="user-container">
        <div>
          <h3>Nom d'utilisateur: {user.userName}</h3>
        </div>
        <div>
          <h3>Email: {user.email}</h3>
        </div>
        <div>
          <h3>Crée le: {moment(user.createdAt).format('l')}</h3>
        </div>
        <DeleteButton url={`user/${user.uuid}`} function= "Supprimer l'utilisateur-ice"/>
        </li>
      </>
    );
}

export default AllUsers;
