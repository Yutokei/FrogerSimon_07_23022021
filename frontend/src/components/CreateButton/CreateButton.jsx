import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../auth/AuthContext";
import Error from "../Error/Error";
import "./style.scss";
import Valid from "../Valid/Valid";

const CreateButton = (props) => {
  const { authState, setAuthState } = useContext(AuthContext);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [valid, setValid] = useState(false);
  const [validMessage, setValidMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setError(false);
      setValid(false);
    }, 3000);
  }, [valid, error]);

  const handlePost = (e) => {
    e.preventDefault();
    if (!props.data.textContent) {
      setError(true);
      setErrorMessage("Votre message est vide");
    } else {
      axiosPost(props.url, props.data);
      setAuthState({ ...authState, update: authState.update + 1 });
    }
  };
  const axiosPost = (url, data) => {
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/${url}`,
      headers: {
        token: localStorage.getItem("token"),
        uuid: authState.uuid,
        admin: authState.admin,
      },
      data: data,
    })
      .then((response) => {
        props.clear();
        setValid(true);
        setValidMessage(response.data.message);
      })
      .catch((response) => {
        setError(true);
        setErrorMessage(response.data.message);
      });
  };
  return (
    <div className="button-container">
      <button className="create-button" onClick={handlePost}>
        {props.function}
      </button>
      <Valid isValid={valid} text={validMessage} />
      <Error isError={error} text={errorMessage} />
    </div>
  );
};

export default CreateButton;
