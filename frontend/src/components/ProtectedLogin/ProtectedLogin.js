import React from 'react';
import { Route, Redirect} from 'react-router-dom'

const ProtectedLogin = ({auth,Component, ...rest}) => {
    return (
        <Route 
        {...rest}
        render = {()=>!auth ? (
            <Component />
        ) : 
            (
                <Redirect to="/home" />
            )}

        />
    );
}

export default ProtectedLogin;
