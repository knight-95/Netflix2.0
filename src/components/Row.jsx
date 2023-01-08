import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.css";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  console.log(movies);

  return (
    <div className="row">
      <h2>{title}</h2>
      {movies.map((movie) => (
        <img
          className={`row__poster ${isLargeRow && "row__posterLarge"}`}
          key={movie.id}
          src={`${base_url}${
            isLargeRow ? movie.poster_path : movie.backdrop_path
          }`}
          alt="movie.name"
        />
      ))}
    </div>
  );
};

export default Row;
