import TextList from "./Textlist";
import Error from "./Error";
import { React, useState } from "react";
import "./style.scss";

function Giphy(props) {
  const giphyApi = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_KEY}&limit=20&offset=0&q=`;

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [gifsResults, setGifsResults] = useState([]);
  const [err, setErr] = useState(false);

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    if (search.length === 0) {
      //set error state to true
      setErr(true);
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
          setGifsResults(
            result.data.map((gif, key) => {
              return gif.images.fixed_height.url;
            })
          );
        })
        .catch((err) => {
          alert("On ne trouve pas de gifs " + err);
        });
    };

    apiCall();
    //change error state back to false
    setSearch("");
    setErr(false);
  };

  const handleGif = (url) => {
    setSearch(url);
    props.gifUrl(url);
    setGifsResults([]);
    console.log("url "+ props.gifUrl);
}

  return (
    <div className="gif-container">
      <h4>Le Gif</h4>
      <input
        className="input-field"
        placeholder="Votre mot-clé"
        value={search}
        onChange={handleInput}
      />
      <button className="submit-btn" onClick={()=>{handleSubmit()}}>
        Giphy
      </button>
      <Error isError={err} text="Entrez au moins quelques lettres !" />
      <div className="gif-result">
        {loading ? (
          <div className="loading">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="gifs-list">
            {gifsResults.map((gif, key) => {
              return (
                <button className="gif-item" onClick={()=>{handleGif(gif)}}>
                  <img className="gif-image" id={key} src={gif} />
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
