import React, { useEffect, useState } from 'react';
import axios from './axios';
import requests from './requests';
import "./Banner.css";
import "./Row.css";
import "./App.css";

function Banner() {
   /*every time we refresh a new movie is displayed in banner */
   const [movie, setMovie] = useState([]);  

   useEffect(() => {
     async function fetchData() {
       const request = await axios.get(requests.fetchNetflixOriginals);
       setMovie(
         request.data.results[
         Math.floor(Math.random() * request.data.results.length-1)
       ]); // [movie1,movie2,....]
      //  Math.floor(Math.random() * request.data.results.length-1) is grabbing random number from 0
      return request;
     }
     fetchData();
   },[])
   console.log(movie);

   function truncate(str, n) {
     return str?.length > n ? str.substr(0,n-1) + "..." : str;
   }

  return (
  <header className="banner"
     style={{
      backgroundSize: "cover",  //cover whole area
      backgroundImage: `url(
      "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}" 
      )`,  //base url with go and get backdrop image, ? (optional chaining) is for when the movie is undefined,it wont freak out and crash, it will handle elegantly
      backgroundPosition: "center center"
     }}
  > 
    <div className="banner__contents">
      {/* title */}
      <h1 className="banner__title">
        {/* /* if movie title isnt there look fo movie name or original_name */ }
        {movie?.title || movie?.name || movie?.original_name}    
      </h1>  
      <div className="banner__buttons">
        <button className="banner__button">Play</button>
        <button className="banner__button">My List</button>
      </div>
      
      <h1 className="banner__description">{movie?.overview}
      {truncate(movie?.overview,150)}
      </h1>
      {/* description */}
    </div>
    {/* empty div for fading the bottom of the banner */}
    <div className="banner--fadeBottom" />      
 </header>
  );
}

export default Banner;
