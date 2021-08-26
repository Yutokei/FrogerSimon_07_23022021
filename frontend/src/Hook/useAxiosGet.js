import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../auth/AuthContext";

 function useAxiosGet(url){
    const {authState} = useContext(AuthContext)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


useEffect(()=>{
    setLoading(true)
    if(authState.uuid !== 0){
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}api/${url}`,
            headers: {
              token: localStorage.getItem("token"),
              uuid: authState.uuid,
              admin: authState.admin,
            },
          })
        .then((response)=>{
            setData(response.data)
        })
        .catch((error)=>{
            alert("Échec de la connection " + error)
            setError(error)
        })
        .finally(()=>{
            setLoading(false)
        })
    }

},[authState, url])
    

    return { data, loading, error};
}

export default useAxiosGet