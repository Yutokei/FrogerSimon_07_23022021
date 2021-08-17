import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";
import { AuthContext } from "./auth/AuthContext";
import axios from "axios";
axios.defaults.withCredentials = true;

const App = () => {
    const [authState, setAuthState] = useState({
      username: "",
      uuid: 0,
      admin: false,
      status: false,
    });

    useEffect(() => {
      axios.get(`${process.env.REACT_APP_API_URL}api/user/auth`,
      { headers: {
        token: localStorage.getItem("token"),
      }
    })
    .then((res) => {
        if(res.data.error) {
          setAuthState({...authState, status: false});
        }else{
          setAuthState({
            username: res.data.userName,
            uuid: res.data.uuid,
            admin: res.data.isAdmin,
            status: true,
          });
          console.log(authState)
        }
      })
    })

  return (
    <AuthContext.Provider value={{ authState, setAuthState}}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/profil" exact component={Profil} />
          <Login path="/" exact component={Login} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
