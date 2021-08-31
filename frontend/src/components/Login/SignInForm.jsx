import React, { useState, useContext } from "react";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";

const SignInForm = () => {
  const { setAuthState } = useContext(AuthContext);

  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Vous n'avez pas remplis tout les champs");
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
            admin: decodedToken.isAdmin,
            status: true,
          });
          history.push("/home");
        })
        .catch((err) => {
          alert(err);
          console.error(err);
        });
    }
  };

  return (
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
  );
};

export default SignInForm;
