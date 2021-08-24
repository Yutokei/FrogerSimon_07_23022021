import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';

const CreateButton = (props) => {
    const {authState, setAuthState} = useContext(AuthContext)

    const handlePost = (e) => {
        e.preventDefault()
        if(!props.data.textContent){
            alert("Votre message est vide")
        }
        else{
            axiosPost(props.url, props.data)
           setAuthState({...authState, update: authState.update + 1 })
        }

    }
    const axiosPost = (url, data) =>{
        axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}api/${url}`,
        headers: {
          token: localStorage.getItem("token"),
          uuid: authState.uuid,
          admin: authState.admin,
        },
        data: 
            data
        
      })
      .then((response)=>{
            alert(response.data.message)
      })
      .catch((response)=>{
            alert("Échec de l'envoi")
            console.log(response)
      })
}
    return (
    <>
        <button onClick={handlePost}>
           {props.function} 
        </button>
    </>
    );
}

export default CreateButton;