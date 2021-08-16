import React from 'react';
import { Route, Redirect} from 'react-router-dom'
import auth from '../auth'

const ProtectedLogin = ({component:Component, ...rest}) => {
    return (
        <Route 
        {...rest}
        render = {()=>auth.isAuthenticate() ? (
            <Component />
        ) : 
            (
                <Redirect to="/home" />
            )}

        />
    );
}

export default ProtectedLogin;
