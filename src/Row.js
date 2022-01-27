import React, { useState, useEffect } from 'react';
import axios from './axios';

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState( [] );

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
    }, [fetchUrl]);
  return (
  <div>
      <h2>{title}</h2>

      {/* container -> posters */}
  </div>
  )
}

export default Row;
