import React, { useEffect,useState } from "react";
import { AuthApi } from "./components/AuthApi";
import Routes from './components/Routes';
import axios from "axios";
axios.defaults.withCredentials = true;

const App = () => {
  const [auth, setAuth] = useState(false);

  const readStorage = () => {
  const user = localStorage.getItem("user");
  if(user){
    setAuth(true);
  }
  }
  useEffect(() => {
    readStorage();

  }, [])


  return (    
    <AuthApi.Provider value={{auth, setAuth}}>
      <Routes />
    </AuthApi.Provider>
    );
};

export default App;
