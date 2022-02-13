import React, { useState, useEffect } from 'react';
import axios from './axios';
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    //loads information 
    //if [], run once when the row loads and don't run again
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      //https://api.themoviedb.org/3//discover/tv?api_key=${API_KEY}&with_network=123
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);  //when you use useEffect() you have to use it here because its dependent on that variable so now everytime it changes it will load.used when combine with async, fetchUrl because its outside the block and we have to tell useEffect to fetch it from outside the block.
  //useEffect knows that somethings changing so i have to change
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.name || "")
      .then((url) => {
        // https://www.youtube.com/watch?v=XtMThy8QKqU&t=9945s;
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));

      }).catch((error) => console.log(error));
    }
  }

  //  console.table(movies)
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {/* several row_posters */}
        {movies.map((movie) => (
          <img
            key={movies.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} /> }
      {/* <YouTube videoId="2g811Eo7K8U" opts={opts} /> */}
      {/* container -> posters */}
    </div>
  );
}
export default Row;
