import React, { useState, useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router";
import { AuthContext } from "../../auth/AuthContext";
import Error from "../Error/Error";
import axios from "axios";

const SignInForm = () => {
  const { setAuthState } = useContext(AuthContext);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }, [error]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError(true);
      setErrorMessage("Vous n'avez pas remplis tout les champs");
    } else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/login`,
        withCredentials: false,
        data: {
          email,
          password,
        },
      })
        .then((res) => {
          localStorage.setItem("token", res.data.token);

          const decodedToken = jwt_decode(res.data.token);

          setAuthState({
            userName: decodedToken.userName,
            uuid: decodedToken.uuid,
            admin: decodedToken.admin,
            status: true,
          });
          history.push("/home");
        })
        .catch((error) => {
          setError(true);
          setErrorMessage(error.response.data.error);
        });
    }
  };

  return (
    <>
      <form action="" onSubmit={handleLogin} id="sign-up-form">
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="text"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <div className="email error"></div>
        <br />
        <label htmlFor="password">Mot de passe</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="email error"></div>
        <br />
        <input className="confirm-signin" type="submit" value="Se connecter" />
      </form>
      <Error isError={error} text={errorMessage} />
    </>
  );
};

export default SignInForm;
