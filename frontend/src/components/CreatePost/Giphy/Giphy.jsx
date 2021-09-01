import Error from "../../Error/Error";
import { React, useState } from "react";
import closeIcon from "../../../assets/close-circle-outline_1.svg"
import "./style.scss";

function Giphy(props) {
  const giphyApi = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_KEY}&limit=20&offset=0&q=`;

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [gifsResults, setGifsResults] = useState([]);
  const [displayCloseButton, setDisplayCloseButton] = useState(false);

  const [err, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")

  const handleCloseList = (e) => {
    e.preventDefault();
    setGifsResults([]);
    setSearch("");
    setDisplayCloseButton(false);
    props.gifUrl();
  };

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.length === 0) {
      setErr(true);
      setErrorMessage("Entrez au moins quelques lettres !")
      return;
    }

    const apiCall = async () => {
      setLoading(true);
      fetch(giphyApi + search)
        .then((res) => {
          setLoading(false);
          return res.json();
        })
        .then((result) => {
          setDisplayCloseButton(true);
          setGifsResults(
            result.data.map((gif, key) => {
              return gif.images.fixed_height.url;
            })
          );
        })
        .catch((err) => {
          setErr(true)
          setErrorMessage("Pas de connection à giphy "+ err)
        });
    };

    apiCall();
    setSearch("");
    setDisplayCloseButton(false);
    setErr(false);
  };

  const handleGif = (url) => {
    setSearch("");
    setDisplayCloseButton(false);
    props.gifUrl(url);
    setGifsResults([]);
  };

  return (
    <div className="gif-container">
      <h5>Le Gif</h5>
      <input
        className="input-field"
        placeholder="Votre mot-clé"
        value={search}
        onChange={handleInput}
      />
      <button className="submit-btn" onClick={handleSubmit}>
        Giphy
      </button>
      <Error isError={err} text={errorMessage} />
      <div className="gif-result">
        {loading ? (
          <div className="loading">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="gifs-list">
            {displayCloseButton && (
              <button className="close-gifList" onClick={handleCloseList}>
                <img className="close-gifList-img" src={closeIcon} alt="Fermer la liste de gifs"/>
              </button>
            )}
            {gifsResults.map((gif) => {
              return (
                <button
                  className="gif-item"
                  key={gif}
                  onClick={() => {
                    handleGif(gif);
                  }}
                >
                  <img className="gif-image" key={gif} src={gif} alt="" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
export default Giphy;
