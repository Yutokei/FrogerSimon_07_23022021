import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';

const DeleteButton = (props) => {
    const {authState, setAuthState} = useContext(AuthContext)
    const [displayError, setDisplayErrror] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const axiosDelete = (url) =>{
        axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_API_URL}api/${url}`,
        headers: {
          token: localStorage.getItem("token"),
          uuid: authState.uuid,
          admin: authState.admin,
        },
      })
      .then(()=>{
        setAuthState({...authState, update: authState.update + 1 })
      })
      .catch((res)=>{
        setDisplayErrror(true)
        console.log(res)
        setErrorMessage("Refusé")
      })
}
    return (
    <>
        <button onClick={()=>{axiosDelete(props.url)}}>
           {props.function} 
        </button>
        
        <div>
        { displayError && (
          <div>{errorMessage}</div>
        )}
        </div>
    </>
    );
}

export default DeleteButton;


