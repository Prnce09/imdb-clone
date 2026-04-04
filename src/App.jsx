import React from "react";
import MovieCard from "./components/MovieCard";
import { movies } from "./data/movies";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>🎬 Movie Gallery</h1>

      <div className="movie-container">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default App;