import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../../pages/Home'
import Profil from '../../pages/Profil'
import Login from '../../pages/Login'

const index = () => {
    return (
        <Router>
            <Switch>
                <Route path="/home" exact component={ Home } />
                <Route path="/profil" exact component={ Profil } />
                <Route path="/" exact component={ Login } />
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}

export default index;