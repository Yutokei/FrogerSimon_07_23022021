import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../auth/AuthContext";
import Error from "../Error/Error";
import "./style.scss";

const DeleteButton = (props) => {
  const { authState, setAuthState } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const axiosDelete = (url) => {
    setError(true);
    setErrorMessage("Suppression");
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API_URL}api/${url}`,
      headers: {
        token: localStorage.getItem("token"),
        uuid: authState.uuid,
        admin: authState.admin,
      },
    })
      .then(() => {
        setAuthState({ ...authState, update: authState.update + 1 });
      })
      .catch((error) => {
        setError(true);
        setErrorMessage(error);
      });
  };
  return (
    <>
      <button
        className="delete-button"
        onClick={() => {
          axiosDelete(props.url);
        }}
      >
        {props.function}
      </button>
      <Error isError={error} text={errorMessage} />
    </>
  );
};

export default DeleteButton;
