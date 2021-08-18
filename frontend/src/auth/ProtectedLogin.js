import React from 'react';
import { Redirect, Route } from 'react-router';

const ProtectedLogin = ({ component: Component, ...restOfProps }) => {

    const isAuthenticated = localStorage.getItem("token");

    return (
        <Route
            {...restOfProps}
            render={(props) =>
                isAuthenticated ?  <Redirect to="/home" /> : <Component {...props} />
            }
            />
    );
}

export default ProtectedLogin;
