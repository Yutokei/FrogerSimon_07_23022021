import React, { useEffect,useState } from "react";
import { AuthApi } from "./components/AuthApi";
import Routes from './components/Routes';
import Cookies from "js-cookie";
import axios from "axios";
axios.defaults.withCredentials = true;

const App = () => {
  const [auth, setAuth] = useState(false);

  const readCookie = () => {
  const user = Cookies.get('jwt');
  if(user){
    setAuth(true);
  }
  }
  useEffect(() => {
    readCookie();

  }, [])


  return (    
    <AuthApi.Provider value={{auth, setAuth}}>
      <Routes />
    </AuthApi.Provider>
    );
};

export default App;
