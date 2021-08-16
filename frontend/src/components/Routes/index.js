import React from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import Home from '../../pages/Home'
import Profil from '../../pages/Profil'
import Login from '../../pages/Login'
import Navbar from '../Navbar';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { AuthApi } from '../AuthApi';
import ProtectedLogin from '../ProtectedLogin/ProtectedLogin';

const index = () => {
    return (
        <Router>
            <Navbar />
            <Switch>
                <ProtectedRoute path="/home" auth={AuthApi.auth} exact component={ Home } />
                <ProtectedRoute path="/profil" auth={AuthApi.auth} exact component={ Profil } />
                <ProtectedLogin path="/" exact component={ Login } auth={AuthApi.auth} />
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}

export default index;