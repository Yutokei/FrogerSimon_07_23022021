import React, { useState, useEffect } from "react";
import { userValidation } from "../../Validations/UserValidations";
import SignInForm from "./SignInForm";
import Error from "../Error/Error";
import axios from "axios";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }, [error]);

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");

    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";
    if (!userValidation) {
      passwordConfirmError.innerHTML = "Vérifiez vos Champs";
    } else if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML = "Les mots de passe sont différents";

      if (!terms)
        termsError.innerHTML = "Veuillez accepter les conditions générales";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/signup`,
        data: {
          userName,
          email,
          password,
        },
      })
        .then((res) => {
          setFormSubmit(true);
        })
        .catch((error) => {
          setError(true)
          setErrorMessage(error.response.data.error.errors[0].message)
        });
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Vous êtes enregistré-e, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <>
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="userName">Nom d'utilisateur</label>
          <br />
          <input
            type="text"
            name="userName"
            id="pseudo"
            minLength="2"
            autoComplete="new-user"
            placeholder="2 charactères minimum"
            required
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          <div className="pseudo error"></div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="new-email"
            placeholder="Lorie@gropomania.com"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className="email error"></div>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            minLength="6"
            name="password"
            id="password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>
          <br />
          <label htmlFor="password-conf">Confirmer Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password-conf"
            autoComplete="off"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />
          <input type="checkbox" id="terms" />
          <label className="terms-label" htmlFor="terms">
            J'accepte les
            <span className="terms-link">conditions générales</span>
          </label>
          <div className="terms error"></div>
          <br />
          <input
            className="confirm-signup"
            type="submit"
            value="Valider inscription"
          />
        </form>
        <Error isError={error} text={errorMessage} />
        </>
      )}
    </>
  );
};

export default SignUpForm;
