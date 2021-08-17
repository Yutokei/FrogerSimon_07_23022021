import {React, useContext} from 'react';
import { Route, Redirect} from 'react-router-dom'
import { AuthContext } from '../AuthContext';

const ProtectedLogin = ({component:Component, ...rest}) => {

    const { authState } = useContext(AuthContext)

    return (
        <Route 
        {...rest}
        render = {()=>authState() ? (
            <Component />
        ) : 
            (
                <Redirect to="/home" />
            )}

        />
    );
}

export default ProtectedLogin;
