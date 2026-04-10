import React from "react";
import "./MovieCard.css";

function MovieCard({ movie }) {
  // OMDB fields TMDB se alag hoti hain
  const { Title, Poster, imdbRating, Year, Plot } = movie;

  const posterUrl =
    Poster && Poster !== "N/A"
      ? Poster
      : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="movie-card">
      <div className="poster-wrapper">
        <img src={posterUrl} alt={Title} className="poster" />
        <div className="overlay">
          <p className="overview">{Plot?.slice(0, 120)}...</p>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{Title}</h3>
        <div className="movie-meta">
          <span className="rating">⭐ {imdbRating}</span>
          <span className="year">{Year}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;