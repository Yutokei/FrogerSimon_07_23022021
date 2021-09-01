import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./auth/ProtectedRoute";
import ProtectedLogin from "./auth/ProtectedLogin";
import { AuthContext } from "./auth/AuthContext";
import axios from "axios";
axios.defaults.withCredentials = true;

const App = () => {
  const [authState, setAuthState] = useState({
    userName: "",
    uuid: 0,
    admin: false,
    status: false,
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}api/user/auth`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            userName: res.data.userName,
            uuid: res.data.uuid,
            admin: res.data.admin,
            status: true,
            update: 0,
          });
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <Navbar userName={authState.userName} />
        <Switch>
          <ProtectedRoute path="/home" exact component={Home} />
          <ProtectedRoute path="/profil" exact component={Profil} />
          <ProtectedLogin path="/" exact component={LoginPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
