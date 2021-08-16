import React from "react";
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import Home from './pages/Home'
import Profil from './pages/Profil'
import Login from './pages/Login'
import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './auth/ProtectedRoute/ProtectedRoute';
import ProtectedLogin from './auth/ProtectedLogin/ProtectedLogin';
import axios from "axios";
axios.defaults.withCredentials = true;

const App = () => {

  return (    
        <Router>
            <Navbar />
            <Switch>
                <ProtectedRoute path="/home"  exact component={ Home } />
                <ProtectedRoute path="/profil"  exact component={ Profil } />
                <ProtectedLogin path="/" exact component={ Login }  />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
};

export default App;
