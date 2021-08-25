import Error from "./Error";
import { React, useState } from "react";
import "./style.scss";





function Giphy(props) {
  const giphyApi = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_KEY}&limit=20&offset=0&q=`;

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [gifsResults, setGifsResults] = useState([]);
  const [displayCloseButton, setDisplayCloseButton] = useState(false)
  
  const [err, setErr] = useState(false);


  const handleCloseList = (e) => {
    e.preventDefault()
    setGifsResults([])
    setSearch("");
    setDisplayCloseButton(false)
    props.gifUrl();
  }

  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
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
          setDisplayCloseButton(true)
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
    setDisplayCloseButton(false)
    setErr(false);
  };

  const handleGif = (url) => {
    setSearch("");
    setDisplayCloseButton(false)
    props.gifUrl(url);
    setGifsResults([]);
}

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
      <Error isError={err} text="Entrez au moins quelques lettres !" />
      <div className="gif-result">
        {loading ? (
          <div className="loading">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="gifs-list">
           {displayCloseButton && (
           <button className="close-gifList" onClick={handleCloseList}> FERMER LA LISTE </button>
           )} 
            {gifsResults.map((gif, key) => {
              return (
                <button className="gif-item" onClick={()=>{handleGif(gif)}}>
                  <img className="gif-image" id={key} src={gif} alt=""/>
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
