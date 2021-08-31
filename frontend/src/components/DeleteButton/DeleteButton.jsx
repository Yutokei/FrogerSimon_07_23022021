import React, { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../auth/AuthContext";
import "./style.scss";

const DeleteButton = (props) => {
  const { authState, setAuthState } = useContext(AuthContext);

  const axiosDelete = (url) => {
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
        alert("Échec de la suppression " + error);
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
    </>
  );
};

export default DeleteButton;
