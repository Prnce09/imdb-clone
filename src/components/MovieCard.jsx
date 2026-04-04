import React from "react";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  return (
    <div className="card">
      <img src={movie.poster} alt={movie.title} className="poster" />

      <div className="card-body">
        <h2>{movie.title}</h2>
        <p>📅 {movie.year}</p>
        <p>⭐ {movie.rating}</p>
      </div>
    </div>
  );
};

export default MovieCard;