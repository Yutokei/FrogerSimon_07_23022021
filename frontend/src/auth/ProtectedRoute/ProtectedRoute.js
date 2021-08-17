import { React, useContext} from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from '../AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {

  const { authState } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={(props) => {
        if (authState()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
